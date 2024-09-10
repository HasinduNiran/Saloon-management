import { useState, useEffect } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

// Functional component for EditInventory
const EditInventory = () => {
  const [ItemNo, setItemNo] = useState('');
  const [ItemName, setItemName] = useState('');
  const [Category, setCategory] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Price, setPrice] = useState('');
  const [SupplierName, setSupplierName] = useState('');
  const [SupplierEmail, setSupplierEmail] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    // Fetching inventory details
    axios.get(`http://localhost:8076/inventories/${id}`)
      .then(response => {
        const data = response.data;
        setItemNo(data.ItemNo);
        setItemName(data.ItemName);
        setCategory(data.Category);
        setQuantity(data.Quantity);
        setPrice(data.Price);
        setSupplierName(data.SupplierName);
        setSupplierEmail(data.SupplierEmail);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while fetching inventory details. Please check the console.',
        });
        console.error(error);
      });

    // Fetching suppliers data
    axios.get('http://localhost:8076/suppliers')
      .then(response => {
        const suppliersData = response.data.data; 
        if (Array.isArray(suppliersData)) {
          setSuppliers(suppliersData);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching suppliers:', error);
      });
  }, [id]);

  const handleEditInventory = () => {
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

    axios.put(`http://localhost:8076/inventories/${id}`, data)
      .then(() => {
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Inventory updated successfully.',
        }).then(() => {
          navigate('/inventories/allInventory');
        });
      })
      .catch(error => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while saving inventory. Please check the console.',
        });
        console.error(error);
      });
  };

  const handleSupplierChange = (e) => {
    const selectedSupplierName = e.target.value;
    setSupplierName(selectedSupplierName);

    const selectedSupplier = suppliers.find(supplier => supplier.SupplierName === selectedSupplierName);
    setSupplierEmail(selectedSupplier ? selectedSupplier.Email : '');
  };

  return (
    <div className="p-4">
      <BackButton destination='/inventories/allInventory'/>
      <h1 className="text-3xl my-4">Edit Inventory</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>ItemNo</label>
          <input
            type="text"
            value={ItemNo}
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
        <div className='my-4'>
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
            {suppliers.map(supplier => (
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

export default EditInventory;
