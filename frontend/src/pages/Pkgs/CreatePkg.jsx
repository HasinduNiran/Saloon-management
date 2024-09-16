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
    const [start_date, setStartDate] = useState(null);
    const [end_date, setEndDate] = useState(null);
    const [conditions, setCondition] = useState('');
    const [package_type, setType] = useState('');
    const [p_name, setPName] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const [image, setImage] = useState(null); // Ensure image is handled as a file
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

    // Fetch categories and subcategories
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8076/services');
                const services = response.data;

                const uniqueCategories = [...new Set(services.map(service => service.category))];
                setCategoryOptions(uniqueCategories);
            } catch (error) {
                console.error("Error fetching services:", error);
                setError('Unable to fetch services.');
            }
        };

        fetchServices();
    }, []);

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);

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
        setError('');

        const formData = new FormData();
        formData.append('description', description);
        formData.append('base_price', base_price);
        formData.append('discount_rate', discount_rate);
        formData.append('final_price', final_price);
        formData.append('start_date', start_date ? start_date.toISOString().split('T')[0] : null); // Convert to ISO
        formData.append('end_date', end_date ? end_date.toISOString().split('T')[0] : null); // Convert to ISO
        formData.append('conditions', conditions);
        formData.append('package_type', package_type);
        formData.append('p_name', p_name);
        formData.append('category', category);
        formData.append('subCategory', subCategory);
        formData.append('image', image); // Attach the file

        try {
            await axios.post('http://localhost:8076/pkg', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/pkg/allPkg'); // Redirect on success
        } catch (error) {
            console.error(error);
            setError('Failed to create the package. Please try again.');
        }
    };

    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <div style={containerStyle} className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
                <img
                    className="mx-auto h-10 w-auto"
                    src={Logo}
                    alt="logo"
                    style={{ width: '50px', height: '50px' }}
                />
                <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create New Package</h1>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {error && <p className='text-red-600'>{error}</p>}
                    <form onSubmit={handleSavePackage} className='space-y-4'>
                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium leading-5 text-gray-700">Service Category</label>
                            <select
                                id="category"
                                value={category}
                                onChange={handleCategoryChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
                                required
                            >
                                <option value="" disabled>Select Service Category</option>
                                {categoryOptions.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        {/* Subcategory */}
                        {category && subCategoryOptions.length > 0 && (
                            <div>
                                <label htmlFor="subCategory" className="block text-sm font-medium leading-5 text-gray-700">Service Subcategory</label>
                                <select
                                    id="subCategory"
                                    value={subCategory}
                                    onChange={(e) => setSubCategory(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
                                    required
                                >
                                    <option value="" disabled>Select Subcategory</option>
                                    {subCategoryOptions.map((sub, index) => (
                                        <option key={index} value={sub}>{sub}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Package Name */}
                        <div>
                            <label htmlFor="p_name" className="block text-sm font-medium leading-5 text-gray-700">Package Name</label>
                            <input
                                id="p_name"
                                type="text"
                                value={p_name}
                                onChange={(e) => setPName(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
                            />
                        </div>

                        {/* Package Type */}
                        <div>
                            <label className="block text-sm font-medium leading-5 text-gray-700">Package Type</label>
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="Standard"
                                        checked={package_type === 'Standard'}
                                        onChange={() => setType('Standard')}
                                        className="mr-2"
                                    />
                                    Standard
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="Promotional"
                                        checked={package_type === 'Promotional'}
                                        onChange={() => setType('Promotional')}
                                        className="mr-2"
                                    />
                                    Promotional
                                </label>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium leading-5 text-gray-700">Description</label>
                            <input
                                id="description"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
                            />
                        </div>

                        {/* Base Price */}
                        <div>
                            <label htmlFor="base_price" className="block text-sm font-medium leading-5 text-gray-700">Base Price</label>
                            <input
                                id="base_price"
                                type="number"
                                value={base_price}
                                onChange={(e) => setBasePrice(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
                            />
                        </div>

                        {/* Discount Rate */}
                        <div>
                            <label htmlFor="discount_rate" className="block text-sm font-medium leading-5 text-gray-700">Discount Rate (%)</label>
                            <input
                                id="discount_rate"
                                type="number"
                                value={discount_rate}
                                onChange={(e) => setDiscount(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
                            />
                        </div>

                        {/* Final Price */}
                        <div>
                            <label className="block text-sm font-medium leading-5 text-gray-700">Final Price (Rs):</label>
                            <input
                                type="number"
                                value={final_price}
                                readOnly
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-200"
                            />
                        </div>

                        {/* Start Date */}
                        <div>
                            <label htmlFor="start_date" className="block text-sm font-medium leading-5 text-gray-700">Start Date</label>
                            <DatePicker
                                selected={start_date}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label htmlFor="end_date" className="block text-sm font-medium leading-5 text-gray-700">End Date</label>
                            <DatePicker
                                selected={end_date}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
                            />
                        </div>

                        {/* Conditions */}
                        <div>
                            <label htmlFor="conditions" className="block text-sm font-medium leading-5 text-gray-700">Conditions</label>
                            <textarea
                                id="conditions"
                                value={conditions}
                                onChange={(e) => setCondition(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium leading-5 text-gray-700">Select Image</label>
                            <input
                                id="image"
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-violet-600 text-white font-bold rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out"
                        >
                            Create Package
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePkg;
