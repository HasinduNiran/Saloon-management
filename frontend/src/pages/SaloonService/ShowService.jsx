import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus} from "react-icons/fa"; 
import { BsInfoCircle } from 'react-icons/bs';

const ShowService = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();


// Function to handle the icon click
const handleAddClick = () => {
  navigate('/services/create');
};
  
  // Fetch services data from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8076/services');
        setServices(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to load services. Please try again later.');
      }
    };

    fetchServices();
  }, []);

  // Handle view details action
  const handleViewDetails = (serviceId) => {
    navigate(`/services/${serviceId}`); // Navigate to service details page
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
      <h1 className="text-3xl my-4">Services List</h1>
      <FaPlus 
          className="text-2xl cursor-pointer text-blue-500 hover:text-blue-700"
          onClick={handleAddClick} // Handle icon click
        />
         </div>
      {error && <p className="text-red-600">{error}</p>}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
          <th className="border-2 border-sky-400 px-4 py-2">Service ID</th>
            <th className="border-2 border-sky-400 px-4 py-2">Category</th>
            <th className="border-2 border-sky-400 px-4 py-2">Description</th>
            <th className="border-2 border-sky-400 px-4 py-2">Duration (min)</th>
            <th className="border-2 border-sky-400 px-4 py-2">Price (Rs)</th>
            <th className="border-2 border-sky-400 px-4 py-2">Available</th>
            <th className="border-2 border-sky-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
               <td className="border-2 border-sky-400 px-4 py-2">{service.service_ID}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{service.category}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{service.description}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{service.duration}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{service.price}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{service.available}</td>
              <td className="border-2 border-sky-400 px-4 py-2 flex">
              <Link
                  to={`/services/details/${service._id}`}
                  className="text-green-600 mr-4"
                  title="View Service"
                >
                  <BsInfoCircle size={20} /> 
                </Link>
                <Link
                  to={`/services/edit/${service._id}`}
                  className="text-blue-600 mr-4"
                  title="Edit Service"
                >
                  <FaEdit size={20} /> 
                </Link>
                <Link
                   to={`/services/delete/${service._id}`}
                   className="text-red-600"
                   title="Delete Service" 
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

export default ShowService;
