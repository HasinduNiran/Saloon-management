import React, { useState, useEffect } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

// Functional component for creating inventories
const CreateInventories = () => {
  // State variables for managing form data and loading state
  const [ItemName, setItemName] = useState('');
  const [Category, setCategory] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Price, setPrice] = useState('');
  const [SupplierName, setSupplierName] = useState('');
  const [SupplierEmail, setSupplierEmail] = useState('');
  const [suppliers, setSuppliers] = useState([]); // State for supplier list
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetching suppliers data from the server
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8076/suppliers')
      .then((response) => {
        const suppliersData = response.data.data; 
        if (Array.isArray(suppliersData)) {
          setSuppliers(suppliersData); // Update state with the suppliers data
        } else {
          console.error('Unexpected response format:', response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching suppliers:', error);
        setLoading(false);
      });
  }, []);
  

  // Event handler for saving the Inventory
  const handleSaveInventory = () => {
    if (!ItemName || !Category || !Quantity || !Price || !SupplierName || !SupplierEmail) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      });
      return;
    }

    const data = {
      ItemName,
      Category,
      Quantity,
      Price,
      SupplierName,
      SupplierEmail,
    };

    setLoading(true);
    axios
      .post('http://localhost:8076/inventories', data)
      .then(() => {
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Inventory saved successfully.',
        }).then(() => {
          navigate('/inventories/allInventory');
        });
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred. Please check the console for details.',
        });
        console.error('Error saving inventory:', error);
      });
  };

  // Event handler for selecting supplier and setting email automatically
  const handleSupplierChange = (e) => {
    const selectedSupplierName = e.target.value;
    setSupplierName(selectedSupplierName);
    
    const selectedSupplier = suppliers.find(supplier => supplier.SupplierName === selectedSupplierName);
    setSupplierEmail(selectedSupplier ? selectedSupplier.Email : '');
  };

  return (
    <div className="p-4">
      <BackButton destination='/inventories/allInventory'/>
      <h1 className="text-3xl my-4">Create Inventory</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Item Name</label>
          <input
            type="text"
            value={ItemName}
            onChange={(e) => setItemName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Category</label>
          <select
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select Category</option>
            <option value="Hair">Hair</option>
            <option value="Nails">Nails</option>
            <option value="Makeup">Makeup</option>
          </select>
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
          <label className='text-xl mr-4 text-gray-500'>Supplier Name</label>
          <select
            value={SupplierName}
            onChange={handleSupplierChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.SupplierID} value={supplier.SupplierName}>
                {supplier.SupplierName}
              </option>
            ))}
          </select>
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Supplier Email</label>
          <input
            type="text"
            value={SupplierEmail}
            readOnly
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

export default CreateInventories;
