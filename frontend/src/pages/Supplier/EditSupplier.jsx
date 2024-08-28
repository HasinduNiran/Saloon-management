// Importing necessary dependencies
import { useState, useEffect } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Functional component for EditSupplier
const EditSupplier = () => {
  // State variables for managing form data and loading state
  const [SupplierID, setSupplierID] = useState('');
  const [SupplierName, setSupplierName] = useState('');
  const [ItemNo, setItemNo] = useState('');
  const [ItemName, setItemName] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [Email, setEmail] = useState('');
  const [Address, setAddress] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:8076/suppliers/${id}`)
    .then((Response) => {
      setSupplierID(Response.data.SupplierID);
      setSupplierName(Response.data.SupplierName);
      setItemNo(Response.data.ItemNo);
      setItemName(Response.data.ItemName);
      setContactNo(Response.data.ContactNo);
      setEmail(Response.data.Email);
      setAddress(Response.data.Address);

      setLoading(false);
    }).catch((error) =>{
      setLoading(false);
      alert(`An error happned. Please Check console`);
      console.log(error);
    });
  }, [])

  // Event handler for edit the Supplier
  const handleEditSupplier = () => {
    // Creating data object from form inputs
    const data = {
      SupplierName,
      ItemNo,
      ItemName,
      ContactNo,
      Email,
      Address,
    };
    setLoading(true);

    // Making a PUT request to Edit the Supplier data
    axios
      .put(`http://localhost:8076/suppliers/${id}`, data)
      .then(() => {
        // Resetting loading state and navigating to the home pItemName
        setLoading(false);
        navigate('/suppliers/allSupplier');
      })
      .catch((error) => {
        // Handling errors by resetting loading state, showing an alert, and logging the error
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  // JSX for rendering the create Supplier form
  return (
    <div className="p-4">
      <BackButton destination='/suppliers/allSupplier'/>
      <h1 className="text-3xl my-4">Edit Supplier</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
      <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>SupplierID</label>
          <input
            type="text"
            value={SupplierID}
            onChange={(e) => setSupplierID(e.target.value)}
            readOnly
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
          <label className='text-xl mr-4 text-gray-500'>ItemNo</label>
          <input
            type="text"
            value={ItemNo}
            onChange={(e) => setItemNo(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>ItemName</label>
          <input
            type='text'
            value={ItemName}
            onChange={(e) => setItemName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>ContactNo</label>
          <input
            type="text"
            value={ContactNo}
            onChange={(e) => setContactNo(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Email</label>
          <input
            type="text"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Address</label>
          <input
            type="text"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditSupplier}>
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the EditSupplier component
export default EditSupplier;
