import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from "../../components/Spinner";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const ShowInventory = () => {
    const [inventories, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8076/inventories')
            .then((response) => {
                setInventory(response.data.data);
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
                <h1 className='text-3xl my-8'>Inventory List</h1>
                <Link to='/inventories/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
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
                            <th className='border border-slate-600 rounded-md max-md:hidden'>SupplierName No</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>SupplierEmail</th>
                            <th className='border border-slate-600 rounded-md'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventories.map((Inventory, index) => (
                            <tr key={Inventory._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {Inventory.ItemNo}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {Inventory.ItemName}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {Inventory.Category}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {Inventory.Quantity}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {Inventory.Price}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {Inventory.SupplierName}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {Inventory.SupplierEmail}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/inventories/details/${Inventory._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800' />
                                        </Link>
                                        <Link to={`/inventories/edit/${Inventory._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600' />
                                        </Link>
                                        <Link to={`/inventories/delete/${Inventory._id}`}>
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
