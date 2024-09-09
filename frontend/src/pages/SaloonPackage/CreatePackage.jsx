import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from "../../components/Spinner";

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

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
 
    const handleSavePackage = () => {
      
        const data = {
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
        };
        setLoading(true);
  
        axios
        .post('http://localhost:5000/packages', data)
        .then(()=> {
          setLoading(false);
        navigate('/packages/allPackage');
        })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Package</h1>
      {loading ? <Spinner /> : ''}
      
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
            
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <button  className='p-2 bg-sky-300 m-8' onClick={handleSavePackage}>
          Create Package
        </button>
     
    </div>
  );
};

export default CreatePackage;
