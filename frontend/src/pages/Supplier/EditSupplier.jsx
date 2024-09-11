import { useState, useEffect } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'; // Import SweetAlert2

// Functional component for EditSupplier
const EditSupplier = () => {
  const [SupplierID, setSupplierID] = useState('');
  const [SupplierName, setSupplierName] = useState('');
  const [ItemNo, setItemNo] = useState('');
  const [ItemName, setItemName] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [Email, setEmail] = useState('');
  const [Address, setAddress] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8076/suppliers/${id}`)
      .then((response) => {
        const data = response.data;
        setSupplierID(data.SupplierID);
        setSupplierName(data.SupplierName);
        setItemNo(data.ItemNo);
        setItemName(data.ItemName);
        setContactNo(data.ContactNo);
        setEmail(data.Email);
        setAddress(data.Address);
      })
      .catch((error) => {
        console.error("Error fetching supplier:", error);
      });

    axios.get("http://localhost:8076/inventories")
      .then((response) => {
        const itemsData = response.data.data;
        setItems(itemsData);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching items:", error);
      });
  }, [id]);

  const handleItemNoChange = (e) => {
    const selectedItemNo = e.target.value;
    setItemNo(selectedItemNo);

    const selectedItem = items.find(item => item.ItemNo === selectedItemNo);
    if (selectedItem) {
      setItemName(selectedItem.ItemName);
    } else {
      setItemName('');
    }
  };

  const handleEditSupplier = () => {
    // Validation checks
    if (!SupplierName || !ItemNo || !ItemName || !ContactNo || !Email || !Address) {
      Swal.fire({
        icon: 'error',
        title: 'All fields are required',
        text: 'Please fill in all the fields before submitting the form.',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return;
    }

    // Contact number validation (example: check if it's numeric and 10 digits long)
    if (!/^\d{10}$/.test(ContactNo)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Contact No',
        text: 'Contact number should be 10 digits.',
      });
      return;
    }

    // Prepare data for submission
    const data = {
      SupplierName,
      ItemNo,
      ItemName,
      ContactNo,
      Email,
      Address,
    };
    
    setLoading(true);
    axios.put(`http://localhost:8076/suppliers/${id}`, data)
      .then(() => {
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Supplier updated',
          text: 'Supplier details have been successfully updated.',
        });
        navigate('/suppliers/allSupplier');
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error updating the supplier. Please try again.',
        });
        console.error('Error editing supplier:', error);
      });
  };

  return (
    <div className="p-4">
      <BackButton destination='/suppliers/allSupplier' />
      <h1 className="text-3xl my-4">Edit Supplier</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>SupplierID</label>
          <input
            type="text"
            value={SupplierID}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Supplier Name</label>
          <input
            type="text"
            value={SupplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Item No</label>
          <select
            value={ItemNo}
            onChange={handleItemNoChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select Item No</option>
            {items.map((item) => (
              <option key={item.ItemNo} value={item.ItemNo}>
                {item.ItemNo}
              </option>
            ))}
          </select>
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Item Name</label>
          <input
            type="text"
            value={ItemName}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Contact No</label>
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

export default EditSupplier;
