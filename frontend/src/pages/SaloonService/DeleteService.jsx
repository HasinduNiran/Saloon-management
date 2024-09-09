import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from "../../components/Spinner";

import axios from 'axios';

const DeleteService = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to handle the Service deletion
  const handleDeleteService = () => {
    setLoading(true);
    // Sending a DELETE request to the server to delete the Service by ID
    axios
      .delete(`http://localhost:8076/services/${id}`)
      .then(() => {
        // If the deletion is successful, update the state and navigate to the home page
        setLoading(false);
        navigate('/services/allService');
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

      <h1 className='text-3xl my-4'>Delete Service</h1>
      {/* Display a spinner while the delete operation is in progress */}
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to Delete your Service?</h3>

        {/* Button to initiate the Employee deletion */}
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteService}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteService;
