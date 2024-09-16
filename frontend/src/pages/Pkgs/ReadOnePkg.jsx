import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ReadOnePkg = () => {
  const { id } = useParams(); 
  const [pkg, setPkg] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPkg = async () => {
      try {
        const response = await axios.get(`http://localhost:8076/pkg/${id}`);
        setPkg(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to load package details. Please try again later.');
      }
    };

    fetchPkg();
  }, [id]);

  
  const handleBack = () => {
    navigate('/pkg/allPkg'); 
  };

  return (
    <div className="p-6">
      {error && <p className="text-red-600">{error}</p>}
      {pkg ? (
       <div className="bg-white shadow-md rounded-lg p-6" style={{ boxShadow: '0 4px 8px rgba(100, 100, 255, 0.8)' }}>
          <h1 className="text-4xl font-bold mb-6">Package Details</h1>

          <div className="grid grid-cols-2 gap-6">

          <div>
              <h2 className="text-2xl font-semibold mb-2">Package ID</h2>
              <p className="text-lg">{pkg.ID}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Service Category</h2>
              <p className="text-lg">{pkg.category}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Service Type</h2>
              <p className="text-lg">{pkg.subCategory}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Package Name</h2>
              <p className="text-lg">{pkg.p_name}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Package Type</h2>
              <p className="text-lg">{pkg.package_type ? 'Standard' : 'Promotional'}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Description</h2>
              <p className="text-lg">{pkg.description} </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Base Price (Rs)</h2>
              <p className="text-lg">Rs. {pkg.base_price}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Discount Rate (%)</h2>
              <p className="text-lg">{pkg.base_price}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Final Price (Rs)</h2>
              <p className="text-lg">Rs. {pkg.final_price}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Start Date</h2>
              <p className="text-lg">{pkg.start_date}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">End Date</h2>
              <p className="text-lg">{pkg.end_date}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Conditions</h2>
              <p className="text-lg">{pkg.conditions}</p>
            </div>
            <div>
            <h2 className="text-2xl font-semibold mb-2"> Image </h2>
            <img src={`http://localhost:8076/${pkg.image}`} alt="Package Image" style={{ width: '200px', height: '200px' }} />
            </div>
        
          </div>


          <div className="mt-6 flex items-center">
            <button
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={handleBack}
            >
              Back to Packages
            </button>
            <Link
              to={`/pkg/edit/${pkg._id}`}
              className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
            >
              Edit Package
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
};

export default ReadOnePkg;
