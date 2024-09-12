// Importing necessary dependencies
import { useState, useEffect } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

// Functional component for EditEmployee
const EditEmployee = () => {
  // State variables for managing form data and loading state
  const [EmpID, setEmpID] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Age, setAge] = useState('');
  const [Gender, setGender] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [Email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
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
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching employee data. Please check console.',
        });
        console.log(error);
      });
  }, [id]);

  // Event handler for editing the Employee
  const handleEditEmployee = () => {
    // Validate form fields
    if (!FirstName || !LastName || !Age || !Gender || !ContactNo || !Email) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      });
      return;
    }

    if (isNaN(Age) || Age <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Age',
        text: 'Please enter a valid age.',
      });
      return;
    }

    if (!/^\d{10}$/.test(ContactNo)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Contact Number',
        text: 'Please enter a valid 10-digit contact number.',
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(Email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return;
    }

    setLoading(true);

    const data = {
      FirstName,
      LastName,
      Age,
      Gender,
      ContactNo,
      Email,
    };

    axios
      .put(`http://localhost:8076/employees/${id}`, data)
      .then(() => {
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Employee updated successfully!',
        });
        navigate('/employees/allEmployee');
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating the employee. Please check console.',
        });
        console.log(error);
      });
  };

  // JSX for rendering the edit Employee form
  return (
    <div className="p-4">
      <BackButton destination='/employees/allEmployee'/>
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
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Gender</label>
          <select
            value={Gender}
            onChange={(e) => setGender(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>ContactNo</label>
          <input
            type="tel"
            value={ContactNo}
            onChange={(e) => setContactNo(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            pattern="[0-9]{10}"
            placeholder="10-digit contact number"
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Email</label>
          <input
            type="email"
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
