import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

const CreatePkg = () => {
    const [description, setDescription] = useState('');
    const [base_price, setBasePrice] = useState('');
    const [discount_rate, setDiscount] = useState('');
    const [final_price, setFinalPrice] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [conditions, setCondition] = useState('');
    const [package_type, setType] = useState('');
    const [p_name, setPName] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [categoryOptions, setCategoryOptions] = useState([]); // Categories for dropdown
    const [subCategoryOptions, setSubCategoryOptions] = useState([]); // Subcategories for dropdown
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Calculate final price based on base price and discount rate
    useEffect(() => {
        if (base_price && discount_rate) {
            const discount = parseFloat(discount_rate) / 100;
            const final = parseFloat(base_price) * (1 - discount);
            setFinalPrice(final.toFixed(2));
        }
    }, [base_price, discount_rate]);

    // Fetch all services and populate categories and subcategories
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8076/services');
                const services = response.data;

                // Extract unique categories
                const uniqueCategories = [...new Set(services.map(service => service.category))];
                setCategoryOptions(uniqueCategories);
            } catch (error) {
                console.error("Error fetching services:", error);
                setError('Unable to fetch services.');
            }
        };

        fetchServices();
    }, []);

    // Handle category change and load relevant subcategories
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);

        // Fetch subcategories related to the selected category
        axios.get('http://localhost:8076/services').then((response) => {
            const services = response.data;
            const filteredServices = services.filter(service => service.category === selectedCategory);

            const uniqueSubCategories = [...new Set(filteredServices.map(service => service.subCategory))];
            setSubCategoryOptions(uniqueSubCategories);
        }).catch(error => {
            console.error("Error fetching subcategories:", error);
            setError('Unable to fetch subcategories.');
        });
    };

    const handleSavePackage = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8076/pkg', {
                description,
                base_price,
                discount_rate,
                final_price,
                start_date,
                end_date,
                conditions,
                package_type,
                p_name,
                category,
                subCategory,
            });
            navigate('/pkg/allPkg');
        } catch (error) {
            console.error(error);
            setError('An error happened. Please check the console.');
        }
    };

    return (
        <div className="container mx-auto p-6" style={{ maxWidth: '600px' }}>
            <h1 className="text-3xl font-bold mb-6">Create New Package</h1>
            {error && <p className='text-red-600'>{error}</p>}
            <form
                onSubmit={handleSavePackage}
                className='space-y-4 border border-gray-300 p-4 rounded shadow-md'
            >
                {/* Category */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Service Category
                    </label>
                    <select
                        value={category}
                        onChange={handleCategoryChange}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                        required
                    >
                        <option value="" disabled>Select Service Category</option>
                        {categoryOptions.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Subcategory */}
                {category && subCategoryOptions.length > 0 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Service Subcategory
                        </label>
                        <select
                            value={subCategory}
                            onChange={(e) => setSubCategory(e.target.value)}
                            className="border rounded w-full py-2 px-3 text-gray-700"
                            required
                        >
                            <option value="" disabled>Select Subcategory</option>
                            {subCategoryOptions.map((sub, index) => (
                                <option key={index} value={sub}>
                                    {sub}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {/* Package Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Package Name
                    </label>
                    <input
                        type="text"
                        name="p_name"
                        value={p_name}
                        onChange={(e) => setPName(e.target.value)}
                        required
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>

                {/* Package Type */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Package Type
                    </label>
                    <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={package_type === 'Standard'}
                onChange={() => setType('Standard')}
                className="mr-2"
              />
              Standard
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={package_type === 'Promotional'}
                onChange={() => setType('Promotional')}
                className="mr-2"
              />
              Promotional
            </label>
          </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>

                {/* Base Price */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Base Price
                    </label>
                    <input
                        type="number"
                        name="base_price"
                        value={base_price}
                        onChange={(e) => setBasePrice(e.target.value)}
                        required
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>

                {/* Discount Rate */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Discount Rate (%)
                    </label>
                    <input
                        type="number"
                        name="discount_rate"
                        value={discount_rate}
                        onChange={(e) => setDiscount(e.target.value)}
                        required
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>

                {/* Final Price (Auto-calculated) */}
                <div className="mb-4">
                    <label className="block text-gray-700">Final Price (Rs):</label>
                    <input
                        type="number"
                        name="final_price"
                        value={final_price}
                        required
                        readOnly
                        className="border rounded w-full py-2 px-3 bg-gray-200"
                    />
                </div>

                {/* Start Date */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Start Date
                    </label>
                    <DatePicker
                        selected={start_date}
                        onChange={(date) => setStartDate(date)}
                        required
                        dateFormat="yyyy-MM-dd"
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>

                {/* End Date */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        End Date
                    </label>
                    <DatePicker
                        selected={end_date}
                        onChange={(date) => setEndDate(date)}
                        required
                        dateFormat="yyyy-MM-dd"
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>

                {/* Conditions */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Conditions
                    </label>
                    <textarea
                        name="conditions"
                        value={conditions}
                        onChange={(e) => setCondition(e.target.value)}
                        required
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>

                <button
                    type='submit'
                    className='p-2 bg-violet-300 rounded text-white'
                >
                    Create Package
                </button>
            </form>
        </div>
    );
};

export default CreatePkg;