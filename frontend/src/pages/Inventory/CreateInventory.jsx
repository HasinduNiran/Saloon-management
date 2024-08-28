// Importing necessary dependencies
import { useState } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

import axios from "axios";
import { useNavigate } from "react-router-dom";

// Functional component for creating inventories
const CreateInventories = () => {
  // State variables for managing form data and loading state
  const [ItemName, setItemName] = useState('');
  const [Category, setCategory] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Price, setPrice] = useState('');
  const [SupplierName, setSupplierName] = useState('');
  const [SupplierEmail, setSupplierEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Event handler for saving the Inventory
  const handleSaveInventory = () => {
    // Creating data object from form inputs
    const data = {
      ItemName,
      Category,
      Quantity,
      Price,
      SupplierName,
      SupplierEmail,
    };
    setLoading(true);

    // Making a POST request to save the Inventory data
    axios
      .post('http://localhost:8076/inventories', data)
      .then(() => {
        // Resetting loading state and navigating to the home pQuantity
        setLoading(false);
        navigate('/inventories/allInventory');
      })
      .catch((error) => {
        // Handling errors by resetting loading state, showing an alert, and logging the error
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  // JSX for rendering the create Inventory form
  return (
    <div className="p-4">
      <BackButton destination='/inventories/allInventory'/>
      <h1 className="text-3xl my-4">Create Inventory</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>ItemName</label>
          <input
            type="text"
            value={ItemName}
            onChange={(e) => setItemName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Category</label>
          <input
            type="text"
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Quantity</label>
          <input
            type='number'
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Price</label>
          <input
            type="number"
            value={Price}
            onChange={(e) => setPrice(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>SupplierName</label>
          <input
            type="text"
            value={SupplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>SupplierEmail</label>
          <input
            type="text"
            value={SupplierEmail}
            onChange={(e) => setSupplierEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveInventory}>
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the I component
export default CreateInventories;
