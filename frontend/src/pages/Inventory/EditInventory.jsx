import React, { useState, useEffect } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const EditInventory = () => {
  const [ItemNo, setItemNo] = useState('');
  const [ItemName, setItemName] = useState('');
  const [Category, setCategory] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Price, setPrice] = useState('');
  const [SupplierName, setSupplierName] = useState('');
  const [SupplierEmail, setSupplierEmail] = useState('');
  const [suppliers, setSuppliers] = useState([]); // State for supplier list
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch supplier data and inventory details when component mounts
  useEffect(() => {
    setLoading(true);
    
    // Fetch suppliers
    axios.get('http://localhost:8076/suppliers')
      .then((response) => {
        const suppliersData = response.data.data;
        if (Array.isArray(suppliersData)) {
          setSuppliers(suppliersData);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching suppliers:', error);
      });

    // Fetch inventory details
    axios.get(`http://localhost:8076/inventories/${id}`)
      .then((response) => {
        setItemNo(response.data.ItemNo);
        setItemName(response.data.ItemName);
        setCategory(response.data.Category);
        setQuantity(response.data.Quantity);
        setPrice(response.data.Price);
        setSupplierName(response.data.SupplierName);
        setSupplierEmail(response.data.SupplierEmail);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while fetching inventory details.',
        });
        console.error('Error fetching inventory details:', error);
      });
  }, [id]);

  // Event handler for editing the Inventory
  const handleEditInventory = () => {
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
      .put(`http://localhost:8076/inventories/${id}`, data)
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
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while updating the inventory.',
        });
        console.error('Error updating inventory:', error);
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
          <label className='text-xl mr-4 text-gray-500'>SupplierName</label>
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
          <label className='text-xl mr-4 text-gray-500'>SupplierEmail</label>
          <input
            type="text"
            value={SupplierEmail}
            readOnly
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
