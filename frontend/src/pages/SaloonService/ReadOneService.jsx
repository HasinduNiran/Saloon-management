import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ReadOneService = () => {
  const { id } = useParams(); // Get the service ID from the URL params
  const [service, setService] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch the service data by ID
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:8076/services/${id}`);
        setService(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to load service details. Please try again later.');
      }
    };

    fetchService();
  }, [id]);

  // Handle navigation back to the services list
  const handleBack = () => {
    navigate('/services/allService'); // Navigate back to services list
  };

  return (
    <div className="p-6">
      {error && <p className="text-red-600">{error}</p>}
      {service ? (
       <div className="bg-white shadow-md rounded-lg p-6" style={{ boxShadow: '0 4px 8px rgba(100, 100, 255, 0.8)' }}>
          <h1 className="text-4xl font-bold mb-6">Service Details</h1>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Service ID</h2>
              <p className="text-lg">{service.service_ID}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Category</h2>
              <p className="text-lg">{service.category}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Service Type</h2>
              <p className="text-lg">{service.subCategory}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Description</h2>
              <p className="text-lg">{service.description}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Duration (min)</h2>
              <p className="text-lg">{service.duration} minutes</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Price (Rs)</h2>
              <p className="text-lg">Rs. {service.price}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Available</h2>
              <p className="text-lg">{service.available ? 'Yes' : 'No'}</p>
            </div>
          </div>

          <div className="mt-6 flex items-center">
            <button
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={handleBack}
            >
              Back to Services
            </button>
            <Link
              to={`/services/edit/${service._id}`}
              className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
            >
              Edit Service
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
};

export default ReadOneService;
