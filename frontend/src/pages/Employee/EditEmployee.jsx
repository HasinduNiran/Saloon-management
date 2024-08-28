// Importing necessary dependencies
import { useState, useEffect } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Functional component for EditEmployee
const EditEmployee = () => {
  // State variables for managing form data and loading state
  const [EmpID, setEmpID] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Age, setAge] = useState('');
  const [Gender, setGender] = useState('');
  //const [BasicSalary, setBasicSalary] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [Email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:8076/employees/${id}`)
    .then((Response) => {
      setEmpID(Response.data.EmpID);
      setFirstName(Response.data.FirstName);
      setLastName(Response.data.LastName);
      setAge(Response.data.Age);
      setGender(Response.data.Gender);
      setContactNo(Response.data.ContactNo);
      setEmail(Response.data.Email);

      setLoading(false);
    }).catch((error) =>{
      setLoading(false);
      alert(`An error happned. Please Check console`);
      console.log(error);
    });
  }, [])

  // Event handler for edit the Employee
  const handleEditEmployee = () => {
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

    // Making a PUT request to Edit the Employee data
    axios
      .put(`http://localhost:8076/employees/${id}`, data)
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
      <BackButton />
      <h1 className="text-3xl my-4">Edit Employee</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
      <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>EmpID</label>
          <input
            type="text"
            value={EmpID}
            onChange={(e) => setEmpID(e.target.value)}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
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
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Age</label>
          <input
            type='number'
            value={Age}
            onChange={(e) => setAge(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
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
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditEmployee}>
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the EditEmployee component
export default EditEmployee;
