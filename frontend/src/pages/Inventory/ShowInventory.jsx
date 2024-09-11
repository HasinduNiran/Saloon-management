// ShowInventory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from "../../components/Spinner";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import InventoryReport from './InventoryReport'; // Import the new component

const ShowInventory = () => {
    const [inventories, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8076/inventories')
            .then((response) => {
                const data = response.data.data;
                setInventory(data);
                setLoading(false);

                data.forEach(item => {
                    if (item.Quantity < 5) {
                        Swal.fire({
                            title: 'Low Inventory!',
                            text: `Item "${item.ItemName}" has a low quantity: ${item.Quantity}`,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'OK',
                            cancelButtonText: 'Email Supplier',
                        }).then((result) => {
                            if (result.isDismissed) {
                                const emailSubject = encodeURIComponent('Low Inventory Alert');
                                const emailBody = encodeURIComponent(`Dear Supplier,\n\nThe inventory item "${item.ItemName}" is running low with only ${item.Quantity} units remaining.\n\nBest regards,\nYour Company`);
                                const emailRecipient = encodeURIComponent(item.SupplierEmail);
                                const mailtoLink = `mailto:${emailRecipient}?subject=${emailSubject}&body=${emailBody}`;
                                
                                window.location.href = mailtoLink;
                            }
                        });
                    }
                });
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredInventories = inventories.filter((inventory) =>
        (inventory.ItemNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inventory.ItemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inventory.Category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inventory.SupplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inventory.SupplierEmail.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedCategory === '' || inventory.Category === selectedCategory)
    );

    return (
        <div className='p-4'>
            <li><Link to="/">Home</Link></li>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Inventory List</h1>
                <Link to='/inventories/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            <div className='mb-4'>
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className='p-2 border border-slate-300 rounded mb-2'
                />

                <select 
                    className='text-lg p-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-250'
                    onChange={handleCategoryChange}
                    value={selectedCategory}
                >
                    <option value="">All Products</option>
                    <option value="Hair">All Hair Products</option>
                    <option value="Nails">All Nails Products</option>
                    <option value="Makeup">All Makeup Products</option>
                </select>
            </div>

            {/* Use InventoryReport component */}
            <div className='mb-4'>
                <InventoryReport filteredInventories={filteredInventories} />
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>ItemNo</th>
                            <th className='border border-slate-600 rounded-md'>ItemName</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Category</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Quantity</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Price</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Supplier Name</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Supplier Email</th>
                            <th className='border border-slate-600 rounded-md'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInventories.map((inventory) => (
                            <tr key={inventory._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {inventory.ItemNo}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {inventory.ItemName}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {inventory.Category}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {inventory.Quantity}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {inventory.Price}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {inventory.SupplierName}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {inventory.SupplierEmail}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/inventories/details/${inventory._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800' />
                                        </Link>
                                        <Link to={`/inventories/edit/${inventory._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600' />
                                        </Link>
                                        <Link to={`/inventories/delete/${inventory._id}`}>
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

export default ShowInventory;
