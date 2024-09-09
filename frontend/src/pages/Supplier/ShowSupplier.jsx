import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from "../../components/Spinner";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const ShowSupplier = () => {
    const [suppliers, setSupplier] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8076/suppliers')
            .then((response) => {
                setSupplier(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);
    

    return (
        <div className='p-4'>
            <li><Link to="/">Home</Link></li>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Supplier List</h1>
                <Link to='/suppliers/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
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
                        {suppliers.map((supplier, index) => (
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
