import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from "../../components/Spinner";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete, MdEmail } from 'react-icons/md';
import SupplierReport from './SupplierReport';

const ShowSupplier = () => {
    const [suppliers, setSupplier] = useState([]);
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8076/suppliers')
            .then((response) => {
                setSupplier(response.data.data);
                setFilteredSuppliers(response.data.data); // Initialize filteredSuppliers
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredSuppliers(suppliers);
        } else {
            const query = searchQuery.toLowerCase();
            setFilteredSuppliers(
                suppliers.filter(supplier =>
                    Object.values(supplier).some(
                        value => value && value.toString().toLowerCase().includes(query)
                    )
                )
            );
        }
    }, [searchQuery, suppliers]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleEmailClick = (email) => {
        const emailSubject = encodeURIComponent('Urgent: Low Item Quantity Alert');
        const emailBody = encodeURIComponent(`Dear Supplier Manager,\n\nWe have identified that the quantity of one or more items is running low. We kindly request that you arrange for new supplies at your earliest convenience.\n\nBest regards,\nYour Company`);
        const mailtoLink = `mailto:${email}?subject=${emailSubject}&body=${emailBody}`;
        
        window.location.href = mailtoLink;
    };

    return (
        <div className='p-4'>
            <li><Link to="/">Home</Link></li>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Supplier List</h1>
                <Link to='/suppliers/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            <div className='mb-4'>
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className='p-2 border border-slate-300 rounded-md'
                />
            </div>

            {/* Use SupplierReport component */}
            <div className='mb-4'>
                <SupplierReport filteredSuppliers={filteredSuppliers} />
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>SupplierID</th>
                            <th className='border border-slate-600 rounded-md'>SupplierName</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>ItemNo</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>ItemName</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>ContactNo</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Email No</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Address</th>
                            <th className='border border-slate-600 rounded-md'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSuppliers.map((supplier) => (
                            <tr key={supplier._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {supplier.SupplierID}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {supplier.SupplierName}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {supplier.ItemNo}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {supplier.ItemName}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {supplier.ContactNo}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {supplier.Email}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {supplier.Address}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/suppliers/details/${supplier._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800' />
                                        </Link>
                                        <Link to={`/suppliers/edit/${supplier._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600' />
                                        </Link>
                                        <Link to={`/suppliers/delete/${supplier._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-600' />
                                        </Link>
                                        <button 
                                            onClick={() => handleEmailClick(supplier.Email)}
                                            className='text-blue-600'
                                        >
                                            <MdEmail className='text-2xl' />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ShowSupplier;
