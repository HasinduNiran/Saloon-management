import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

const ShowAllCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8076/customers')
            .then((response) => {
                console.log('API Response:', response.data);
                const data = response.data;
                if (Array.isArray(data)) {
                    setCustomers(data);
                } else {
                    console.warn('Data is not an array:', data);
                    setCustomers([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching customer data:', error);
                setCustomers([]);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container">
            <style>{`
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }

                h2 {
                    color: #333;
                    text-align: center;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }

                table, th, td {
                    border: 1px solid #ddd;
                }

                th, td {
                    padding: 12px;
                    text-align: left;
                }

                th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }

                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }

                button {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    margin: 10px 0;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                button:hover {
                    background-color: #45a049;
                }

                .text-center {
                    text-align: center;
                }

                .flex {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .gap-x-4 {
                    gap: 16px;
                }

                @media screen and (max-width: 768px) {
                    table {
                        font-size: 14px;
                    }

                    th, td {
                        padding: 8px;
                    }

                    button {
                        padding: 8px 16px;
                    }
                }
            `}</style>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Customer List</h1>

                <div className="flex justify-center items-center mt-8">
                    <button
                        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => (window.location.href = "/customers/create")}
                    >
                        Add
                    </button>
                </div>
            </div>

            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border px-4 py-2 text-left'>Customer ID</th>
                        <th className='border px-4 py-2 text-left'>Profile Picture</th>
                        <th className='border px-4 py-2 text-left'>First Name</th>
                        <th className='border px-4 py-2 text-left'>Last Name</th>
                        <th className='border px-4 py-2 text-left'>Age</th>
                        <th className='border px-4 py-2 text-left'>Gender</th>
                        <th className='border px-4 py-2 text-left'>ContactNo</th>
                        <th className='border px-4 py-2 text-left'>Email</th>
                        <th className='border px-4 py-2 text-left'>Password</th>
                        <th className='border px-4 py-2 text-left'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan='8'>Loading...</td></tr>
                    ) : (
                        customers.length > 0 ? (
                            customers.map((customer, index) => (
                                <tr key={customer._id} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td className='border px-4 py-2'>{customer.CusID}</td>
                                    <td className='border px-4 py-2'>
                                        <img src= {customer.image} alt="Profile Pic" width={'100'} />
                                    </td>
                                    <td className='border px-4 py-2'>{customer.FirstName}</td>
                                    <td className='border px-4 py-2'>{customer.LastName}</td>
                                    <td className='border px-4 py-2'>{customer.Age}</td>
                                    <td className='border px-4 py-2'>{customer.Gender}</td>
                                    <td className='border px-4 py-2'>{customer.ContactNo}</td>
                                    <td className='border px-4 py-2'>{customer.Email}</td>
                                    <td className='border px-4 py-2'>{customer.Password}</td>
                                    <td className='border px-4 py-2'>
                                        <div className='flex justify-center gap-x-4'>
                                            <Link to={`/customers/${customer._id}`}>
                                                <BsInfoCircle className='text-2x1 text-green-800' />
                                            </Link>
                                            <Link to={`/customers/edit/${customer._id}`}>
                                                <AiOutlineEdit className='text-2x1 text-yellow-600' />
                                            </Link>
                                            <Link to={`/customers/delete/${customer._id}`}>
                                                <MdOutlineDelete className='text-2x1 text-red-600' />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan='8'>No customers found</td></tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ShowAllCustomers;