// Importing necessary dependencies
import { useState } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

import axios from "axios";
import { useNavigate } from "react-router-dom";

// Functional component for creating employees
const CreateEmployees = () => {
  // State variables for managing form data and loading state
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Age, setAge] = useState('');
  const [Gender, setGender] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [Email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Event handler for saving the Employee
  const handleSaveEmployee = () => {
    // Creating data object from form inputs
    const data = {
      FirstName,
      LastName,
      Age,
      Gender,
      ContactNo,
      Email,
    };
    setLoading(true);

    // Making a POST request to save the Employee data
    axios
      .post('http://localhost:8076/employees', data)
      .then(() => {
        // Resetting loading state and navigating to the home page
        setLoading(false);
        navigate('/employees/allEmployee');
      })
      .catch((error) => {
        // Handling errors by resetting loading state, showing an alert, and logging the error
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  // JSX for rendering the create Employee form
  return (
    <div className="p-4">
      <BackButton destination='/employees/allEmployee'/>
      <h1 className="text-3xl my-4">Create Employee</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>FirstName</label>
          <input
            type="text"
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>LastName</label>
          <input
            type="text"
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Age</label>
          <input
            type='number'
            value={Age}
            onChange={(e) => setAge(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Gender</label>
          <input
            type="text"
            value={Gender}
            onChange={(e) => setGender(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
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
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveEmployee}>
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the CreateEmployees component
export default CreateEmployees;
