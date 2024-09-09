import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

const ShowSuppliers = () => {
  const [supplier, setSupplier] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/suppliers/${id}`)
      .then((response) => {
        setSupplier(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="show-Suppliers-container p-4">
      <BackButton destination='/suppliers/allSupplier'/>
      <h1 className="show-Suppliers-title text-3xl my-4">Show supplier</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="supplier-details-container border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">SupplierID</label>
            <span>{supplier.SupplierID}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Supplier Name</label>
            <span>{supplier.SupplierName}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Item No</label>
            <span>{supplier.ItemNo}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Item Name</label>
            <span>{supplier.ItemName}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">ContactNo</label>
            <span>{supplier.ContactNo}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Email</label>
            <span>{supplier.Email}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Address</label>
            <span>{supplier.Address}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowSuppliers;
