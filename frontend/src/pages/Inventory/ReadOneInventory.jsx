import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

const ShowInventory = () => {
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newQuantity, setNewQuantity] = useState('');
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/inventories/${id}`)
      .then((response) => {
        setInventory(response.data);
        setNewQuantity(response.data.Quantity); // Initialize newQuantity with current quantity
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleQuantityUpdate = () => {
    console.log('Updating inventory with ID:', id);
    console.log('New Quantity:', newQuantity);

    // Ensure newQuantity is a valid number
    const quantityToUpdate = parseFloat(newQuantity);
    if (isNaN(quantityToUpdate) || quantityToUpdate < 0) {
      alert('Please enter a valid quantity.');
      return;
    }

    axios
      .patch(`http://localhost:8076/inventories/updateQuantity/${id}`, { quantity: quantityToUpdate })
      .then((response) => {
        console.log('Update successful:', response.data);
        setInventory(response.data); // Update inventory with new quantity
        setShowModal(false); // Close the modal
      })
      .catch((error) => {
        console.error('Error updating quantity:', error);
        alert('An error occurred while updating quantity. Please check the console.');
      });
  };

  const incrementQuantity = () => {
    setNewQuantity(prevQuantity => Math.max(parseFloat(prevQuantity) + 1, 0));
  };

  const decrementQuantity = () => {
    setNewQuantity(prevQuantity => Math.max(parseFloat(prevQuantity) - 1, 0));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    try {
      // Ensure the input value is a valid number
      const result = parseFloat(value);
      if (!isNaN(result) && result >= 0) {
        setNewQuantity(result);
      }
    } catch (error) {
      console.error('Invalid input:', error);
    }
  };

  return (
    <div className="show-Inventory-container p-4">
      <BackButton destination='/inventories/allInventory'/>
      <h1 className="show-Inventory-title text-3xl my-4">Show Inventory</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="inventory-details-container border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">ItemNo</label>
            <span>{inventory.ItemNo}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">ItemName</label>
            <span>{inventory.ItemName}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Category</label>
            <span>{inventory.Category}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Quantity</label>
            <span>{inventory.Quantity}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Price</label>
            <span>{inventory.Price}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">SupplierName</label>
            <span>{inventory.SupplierName}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">SupplierEmail</label>
            <span>{inventory.SupplierEmail}</span>
          </div>
          <button 
            onClick={() => setShowModal(true)} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update Quantity
          </button>
        </div>
      )}

      {/* Modal for updating quantity */}
      {showModal && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="modal-container bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Update Quantity</h2>
            <div className="flex items-center mb-4">
              <button 
                onClick={decrementQuantity}
                className="border-2 border-gray-500 px-2 py-1 mr-2 bg-gray-200 rounded"
              >
                -
              </button>
              <input
                type="text"
                value={newQuantity}
                onChange={handleInputChange}
                className='border-2 border-gray-500 px-4 py-2 w-full text-center'
                placeholder="Enter new quantity"
              />
              <button 
                onClick={incrementQuantity}
                className="border-2 border-gray-500 px-2 py-1 ml-2 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
            <button 
              onClick={handleQuantityUpdate} 
              className="px-4 py-2 bg-green-500 text-white rounded mr-2"
            >
              Update
            </button>
            <button 
              onClick={() => setShowModal(false)} 
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowInventory;
