import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import Spinner from "../../components/Spinner";
import StoreReport from './StoreReport';

const ShowStore = () => {
    const [store, setStore] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    // const [selectedCategory, setSelectedCategory] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8076/store')
            .then((response) => {
                console.log('API Response:', response.data);
                const data = response.data;
                if (Array.isArray(data)) {
                    setStore(data);
                } else {
                    console.warn('Data is not an array:', data);
                    setStore([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching customer data:', error);
                setStore([]);
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // const handleCategoryChange = (event) => {
    //     setSelectedCategory(event.target.value);
    // };

    // Check if store is defined and is an array
    const filteredStores = Array.isArray(store) ? store.filter((store) => {
        const searchMatch = store.ItemNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            store.ItemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            store.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            store.Quantity.toString().includes(searchQuery) ||  // Quantity search
            store.cost.toString().includes(searchQuery) ||  // Cost search
            store.SPrice.toString().includes(searchQuery); // Selling Price search

        // Match category if it is being used (assuming `selectedCategory` is relevant in this context)
        // Here, since no category is specified in the storeSchema, this can be omitted or adjusted according to your use case
        // const categoryMatch = selectedCategory === '' || store.Category === selectedCategory;

        return searchMatch 
        // && categoryMatch;
    }) : [];

    return (
        <div className="container">
            <style>{`
                /* Your existing styles here */
            `}</style>

            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Item List</h1>

                <div className="flex justify-center items-center mt-8">
                    <button
                        className="absolute top-4 right-25 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => (window.location.href = "/store/create")}
                    >
                        Add Item
                    </button>
                </div>
                <div className="flex justify-center items-center mt-8">
                    <button
                        className="absolute top-4 right-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => (window.location.href = "/allorders")}
                    >
                        Orders
                    </button>
                </div>
            </div>

            {/* Search and Category Filters */}
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search Item"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border p-2 rounded"
                />

                {/* <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="border p-2 rounded"
                >
                    <option value="">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select> */}
            </div>

            <div className='mb-4'>
                <StoreReport filteredStores={filteredStores} />
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <table className="w-full border-separate border-spacing-2">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2 text-left">Picture</th>
                            <th className="border px-4 py-2 text-left">Item No</th>
                            <th className="border px-4 py-2 text-left">Item Name</th>
                            <th className="border px-4 py-2 text-left">Description</th>
                            <th className="border px-4 py-2 text-left">Quantity</th>
                            <th className="border px-4 py-2 text-left">cost</th>
                            <th className="border px-4 py-2 text-left">Selling Price</th>
                            <th className="border px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStores.length > 0 ? (
                            filteredStores.map((store, index) => (
                                <tr key={store._id} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td className="border px-4 py-2">{store.ItemNo}</td>
                                    <td className="border px-4 py-2">
                                        <img src={store.image} alt="Profile Pic" width={'100'} />
                                    </td>
                                    <td className="border px-4 py-2">{store.ItemName}</td>
                                    <td className="border px-4 py-2">{store.Description}</td>
                                    <td className="border px-4 py-2">{store.Quantity}</td>
                                    <td className="border px-4 py-2">{store.cost}</td>
                                    <td className="border px-4 py-2">{store.SPrice}</td>
                                    <td className="border px-4 py-2">
                                        <div className="flex justify-center gap-x-4">
                                            <Link to={`/store/edit/${store._id}`}>
                                                <AiOutlineEdit className="text-2x1 text-yellow-600" />
                                            </Link>
                                            <Link to={`/store/delete/${store._id}`}>
                                                <MdOutlineDelete className="text-2x1 text-red-600" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="9">No items found</td></tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ShowStore;
