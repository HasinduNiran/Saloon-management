import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus} from "react-icons/fa"; 
import { BsInfoCircle } from 'react-icons/bs';

const ShowPkg = () => {
  const [pkg, setPkg] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();


// Function to handle the icon click
const handleAddClick = () => {
  navigate('/pkg/create');
};
  
  // Fetch services data from API
  useEffect(() => {
    const fetchPkg = async () => {
      try {
        const response = await axios.get('http://localhost:8076/pkg');
        setPkg(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to load packages. Please try again later.');
      }
    };

    fetchPkg();
  }, []);

  // Handle view details action
  const handleViewDetails = (ID) => {
    navigate(`/pkg/${ID}`); // Navigate to service details page
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 my-4">
  <h1 className="text-3xl">Packages List</h1>
  <FaPlus 
    className="text-2xl cursor-pointer text-blue-500 hover:text-blue-700"
    onClick={handleAddClick}
    title='Add New Service' // Handle icon click
  />
</div>
      {error && <p className="text-red-600">{error}</p>}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
          <th className="border-2 border-sky-400 px-4 py-2">Package ID</th>
            <th className="border-2 border-sky-400 px-4 py-2">Service ID</th>
            <th className="border-2 border-sky-400 px-4 py-2">Package Name</th>
            <th className="border-2 border-sky-400 px-4 py-2">Package Type</th>
            <th className="border-2 border-sky-400 px-4 py-2">Description</th>
            <th className="border-2 border-sky-400 px-4 py-2">Base Price (Rs)</th>
            <th className="border-2 border-sky-400 px-4 py-2">Discount Rate (%)</th>
            <th className="border-2 border-sky-400 px-4 py-2">Final Price (Rs)</th>
            <th className="border-2 border-sky-400 px-4 py-2">Start Date</th>
            <th className="border-2 border-sky-400 px-4 py-2">End Date</th>
            <th className="border-2 border-sky-400 px-4 py-2">Conditions</th>
            <th className="border-2 border-sky-400 px-4 py-2">Image URL</th>
          </tr>
        </thead>
        <tbody>
          {pkg.map((pkg) => (
            <tr key={pkg._id}>
               <td className="border-2 border-sky-400 px-4 py-2">{pkg.ID}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{pkg.service_ID}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{pkg.p_name}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{pkg.package_type}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{pkg.description}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{pkg.base_price}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{pkg.discount_rate}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{pkg.final_price}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{pkg.start_date}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{pkg.end_date}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{pkg.conditions}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{pkg.image_url}</td>
              <td className="border-2 border-sky-400 px-4 py-2 flex">
              <Link
                  to={`/pkg/details/${pkg._id}`}
                  className="text-green-600 mr-4"
                  title="View Package Details"
                >
                  <BsInfoCircle size={20} /> 
                </Link>
                <Link
                  to={`/pkg/edit/${pkg._id}`}
                  className="text-blue-600 mr-4"
                  title="Edit Package"
                >
                  <FaEdit size={20} /> 
                </Link>
                <Link
                   to={`/pkg/delete/${pkg._id}`}
                   className="text-red-600"
                   title="Delete Package" 
                >
                  <FaTrash size={20} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowPkg;
