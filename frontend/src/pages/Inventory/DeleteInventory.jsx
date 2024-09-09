import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

import axios from 'axios';

const DeleteInventory = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to handle the Inventory deletion
  const handleDeleteInventory = () => {
    setLoading(true);
    // Sending a DELETE request to the server to delete the Inventory by ID
    axios
      .delete(`http://localhost:8076/inventories/${id}`)
      .then(() => {
        // If the deletion is successful, update the state and navigate to the home page
        setLoading(false);
        navigate('/inventories/allInventory');
      })
      .catch((error) => {
        // If an error occurs, update the state, show an alert, and log the error to the console
        setLoading(false);
        alert(`An error happened: ${error.response ? error.response.data : error.message}`);
        console.error(error);
      });
  };

  return (
    <div className='p-4'>
      {/* Back button to navigate back */}
      <BackButton destination='/inventories/allInventory'/>
      <h1 className='text-3xl my-4'>Delete Inventory</h1>
      {/* Display a spinner while the delete operation is in progress */}
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this Inventory?</h3>

        {/* Button to initiate the Inventory deletion */}
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteInventory}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteInventory;
