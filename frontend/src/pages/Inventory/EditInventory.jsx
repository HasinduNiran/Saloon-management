// Importing necessary dependencies
import { useState, useEffect } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Functional component for EditInventory
const EditInventory = () => {
  // State variables for managing form data and loading state
  const [ItemNo, setItemNo] = useState('');
  const [ItemName, setItemName] = useState('');
  const [Category, setCategory] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Price, setPrice] = useState('');
  const [SupplierName, setEmail] = useState('');
  const [SupplierEmail, setSupplierEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:8076/inventories/${id}`)
    .then((Response) => {
      setItemNo(Response.data.ItemNo);
      setItemName(Response.data.ItemName);
      setCategory(Response.data.Category);
      setQuantity(Response.data.Quantity);
      setPrice(Response.data.Price);
      setEmail(Response.data.SupplierName);
      setSupplierEmail(Response.data.SupplierEmail);

      setLoading(false);
    }).catch((error) =>{
      setLoading(false);
      alert(`An error happned. Please Check console`);
      console.log(error);
    });
  }, [])

  // Event handler for edit the Inventory
  const handleEditInventory = () => {
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

    // Making a PUT request to Edit the Inventory data
    axios
      .put(`http://localhost:8076/inventories/${id}`, data)
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
      <h1 className="text-3xl my-4">Edit Inventory</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
      <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>ItemNo</label>
          <input
            type="text"
            value={ItemNo}
            onChange={(e) => setItemNo(e.target.value)}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
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
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Quantity</label>
          <input
            type='number'
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
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
            onChange={(e) => setEmail(e.target.value)}
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
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditInventory}>
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the EditInventory component
export default EditInventory;
