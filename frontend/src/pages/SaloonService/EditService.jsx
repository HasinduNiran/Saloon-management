import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditService = () => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(''); // Use a string to represent 'Yes' or 'No'
  const [error, setError] = useState('');
  const [priceError, setPriceError] = useState(''); // New state for price errors
  const [durationError, setDurationError] = useState(''); // New state for duration errors
  const navigate = useNavigate(); // For programmatic navigation
  const { id } = useParams(); // Extract the service ID from the route parameters

  // Fetch the existing service details when the component mounts
  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8076/services/${id}`);
        setCategory(data.category);
        setSubCategory(data.subCategory);
        setDescription(data.description);
        setDuration(data.duration);
        setPrice(data.price);
        setAvailable(data.available);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch the service details.');
      }
    };

    fetchService();
  }, [id]);

  // Handle form submission for editing
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPriceError('');
    setDurationError('');

    // Validate price input
    if (!price || isNaN(price)) {
      setPriceError('Please enter a valid number for price.');
      return;
    }

    // Validate duration input
    if (!duration || isNaN(duration) || !Number.isInteger(parseFloat(duration))) {
      setDurationError('Please enter a valid whole number for duration.');
      return;
    }

    try {
      await axios.put(`http://localhost:8076/services/${id}`, {
        category,
        subCategory,
        description,
        duration,
        price,
        available,
      });
      navigate('/services/allService'); // Redirect to services list on success
    } catch (error) {
      console.error(error);
      setError('Failed to update the service. Please try again.');
    }
  };

  // Handle price input change
  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) { // Allow only numbers and optional decimal point
      setPrice(value);
      setPriceError(''); // Clear error message if valid
    } else {
      setPriceError('Please enter a valid number.');
    }
  };

  // Handle duration input change
  const handleDurationChange = (e) => {
    const value = e.target.value;
    if (/^\d+$/.test(value)) { // Allow only whole numbers
      setDuration(value);
      setDurationError(''); // Clear error message if valid
    } else {
      setDurationError('Please enter a valid whole number.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Edit Service</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form 
        onSubmit={handleSubmit} 
        className="space-y-4 border border-gray-300 p-4 rounded shadow-md"
      >
        <div>
          <label className="block text-gray-700">Category:</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubCategory(''); // Reset subcategory when category changes
            }}
            required
            className="border px-2 py-1 w-full max-w-xs"
          >
            <option value="">Select Category</option>
            <option value="Hair">Hair</option>
            <option value="Skin Care">Skin Care</option>
            <option value="Nail">Nail</option>
          </select>
        </div>

        {category && (
          <div>
            <label className="block text-gray-700">Sub Category:</label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              required
              className="border px-2 py-1 w-full max-w-xs"
            >
              <option value="">Select Sub Category</option>
              {subCategories[category].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border px-2 py-1 w-full"
            rows="3"
          />
        </div>
        <div>
          <label className="block text-gray-700">Duration: (min)</label>
          <input
            type="text"
            value={duration}
            onChange={handleDurationChange}
            placeholder="e.g. 60min"
            required
            className="border px-2 py-1 w-full max-w-xs"
          />
          {durationError && <p className="text-red-600">{durationError}</p>} {/* Display duration error */}
        </div>
        <div>
          <label className="block text-gray-700">Price: (Rs)</label>
          <input
            type="text"
            value={price}
            onChange={handlePriceChange}
            required
            className="border px-2 py-1 w-full max-w-xs"
          />
          {priceError && <p className="text-red-600">{priceError}</p>} {/* Display price error */}
        </div>
        <div>
          <label className="block text-gray-700">Available:</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={available === 'Yes'}
                onChange={() => setAvailable('Yes')}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={available === 'No'}
                onChange={() => setAvailable('No')}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Service
        </button>
      </form>
    </div>
  );
};

export default EditService;
