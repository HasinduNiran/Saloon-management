import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

const ShowInventory = () => {
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/inventories/${id}`)
      .then((response) => {
        setInventory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="show-Inventory-container p-4">
      <BackButton destination='/inventories/allInventory'/>
      <h1 className="show-Inventory-title text-3xl my-4">Show inventory</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="inventory-details-container border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">ItemNo</label>
            <span>{inventory.ItemNo}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">ItemName </label>
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
        </div>
      )}
    </div>
  );
};

export default ShowInventory;
