import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import Spinner from "../../components/Spinner";
import CustomerReport from './CustomerReport';

const ShowAllCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

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

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    // Filter customers based on search query and selected category
    const filteredCustomers = customers.filter((customer) => {
        const searchMatch = customer.CusID.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.LastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.Age.toString().includes(searchQuery); // Age search

        // Match gender category (Male/Female)
        const categoryMatch = selectedCategory === '' || customer.Gender === selectedCategory;

        return searchMatch && categoryMatch;
    });

    return (
        <div className="container">
            <style>{`
                /* Your existing styles here */
            `}</style>

            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Customer List</h1>

                <div className="flex justify-center items-center mt-8">
                    <button
                        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => (window.location.href = "/customers/create")}
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Search and Category Filters */}
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search Customers"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border p-2 rounded"
                />

                {/* Category selection for Male/Female */}
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="border p-2 rounded"
                >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>

            <div className='mb-4'>
                <CustomerReport filteredCustomers={filteredCustomers} />
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <table className="w-full border-separate border-spacing-2">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2 text-left">Customer ID</th>
                            <th className="border px-4 py-2 text-left">Profile Picture</th>
                            <th className="border px-4 py-2 text-left">First Name</th>
                            <th className="border px-4 py-2 text-left">Last Name</th>
                            <th className="border px-4 py-2 text-left">Age</th>
                            <th className="border px-4 py-2 text-left">Gender</th>
                            <th className="border px-4 py-2 text-left">Contact No</th>
                            <th className="border px-4 py-2 text-left">Email</th>
                            <th className="border px-4 py-2 text-left">Password</th>
                            <th className="border px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((customer, index) => (
                                <tr key={customer._id} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td className="border px-4 py-2">{customer.CusID}</td>
                                    <td className="border px-4 py-2">
                                        <img src={customer.image} alt="Profile Pic" width={'100'} />
                                    </td>
                                    <td className="border px-4 py-2">{customer.FirstName}</td>
                                    <td className="border px-4 py-2">{customer.LastName}</td>
                                    <td className="border px-4 py-2">{customer.Age}</td>
                                    <td className="border px-4 py-2">{customer.Gender}</td>
                                    <td className="border px-4 py-2">{customer.ContactNo}</td>
                                    <td className="border px-4 py-2">{customer.Email}</td>
                                    <td className="border px-4 py-2">{customer.Password}</td>
                                    <td className="border px-4 py-2">
                                        <div className="flex justify-center gap-x-4">
                                            <Link to={`/customers/${customer._id}`}>
                                                <BsInfoCircle className="text-2x1 text-green-800" />
                                            </Link>
                                            <Link to={`/customers/edit/${customer._id}`}>
                                                <AiOutlineEdit className="text-2x1 text-yellow-600" />
                                            </Link>
                                            <Link to={`/customers/delete/${customer._id}`}>
                                                <MdOutlineDelete className="text-2x1 text-red-600" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="9">No customers found</td></tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ShowAllCustomers;
