import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePackage = () => {
    const [description, setDescription] = useState('');
    const [base_price, setBasePrice] = useState('');
    const [discount_rate,setDiscount]=useState('');
    const [final_price,setFinalPrice] = useState('');
    const [start_date,setStartDate] = useState('');
    const [end_date,setEndDate] = useState('');
    const [conditions,setCondition] = useState('');
    const [image_url,setImage]=useState('');
    const [package_type,setType]=useState('');
    const [p_name,setPName]=useState('');
    const [service_ID,setServiceID]=useState('');
    const [error,setError]=useState('');
    const navigate = useNavigate();
 
    const handleSavePackage = async(e) => {
        e.preventDefault();
        try{
        await axios
        .post('http://localhost:5000/s_packages',{
          description,
          base_price,
          discount_rate,
          final_price,
          start_date,
          end_date,
          conditions,
          image_url,
          package_type,
          p_name,
          service_ID,
        });
        navigate('/s_packages/allPackage');
        }catch(error){
        console.error(error)
        setError('An error happened. Please check console');
        } 
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Package</h1>
      {error && <p className='text-red-600'>{error}</p>}
      <form
        onSubmit={handleSavePackage}
        className='space-y-4 border border-gray-300 p-4 rounded shadow-md' 
        > 
            {/* Service ID */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Service ID
          </label>
          <input
            type="text"
            name="service_ID"
            value={service_ID}
            onChange={(e) => setServiceID(e.target.value)}
            required
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

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
              <input
                type="text"
                name="package_type"
                 value={package_type}              
                onChange={(e) => setType(e.target.value)}
                required
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
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
            onChange={(e) => setFinalPrice(e.target.value)}
            className="border rounded w-full py-2 px-3 bg-gray-200"
          />
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Start Date
          </label>
          <input
            type="date"
            name="start_date"
            value={start_date}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        {/* End Date */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            End Date
          </label>
          <input
            type="date"
            name="end_date"
            value={end_date}
            onChange={(e) => setEndDate(e.target.value)}
            required
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

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image URL
          </label>
          <input
            type="text"
            name="image_url"
            value={image_url}
            onChange={(e) => setImage(e.target.value)}
            required
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <button  
        type='submit'
        className='p-2 bg-sky-300 m-8' 
        >
          Create Package
        </button>
     </form>
    </div>
  );
};

export default CreatePackage;
