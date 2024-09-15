import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const subCategories = {
  Hair: ['Cut', 'Color', 'Style', 'Blow Dry', 'Perm', 'Extensions', 'Highlights', 'Straightening'],
  'Skin Care': ['Facial', 'Exfoliation', 'Moisturizing', 'Acne Treatment', 'Anti-Aging', 'Skin Brightening', 'Microdermabrasion'],
  Nail: ['Manicure', 'Pedicure', 'Nail Art', 'Gel Nails', 'Acrylic Nails', 'Nail Repair', 'Nail Polish', 'Cuticle Care'],
};

const CreateService = () => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // Initialize image as null
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState('Yes'); // Default to "Yes"
  const [error, setError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [durationError, setDurationError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPriceError('');
    setDurationError('');
    setLoading(true); // Set loading state

    // Validate price input
    if (!price || isNaN(price)) {
      setPriceError('Please enter a valid number for price.');
      setLoading(false);
      return;
    }

    // Validate duration input (only whole numbers)
    if (!duration || isNaN(duration) || !Number.isInteger(parseFloat(duration))) {
      setDurationError('Please enter a valid whole number for duration.');
      setLoading(false);
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('description', description);
    formData.append('duration', duration);
    formData.append('price', price);
    formData.append('available', available);
    formData.append('image', image); // Send image as file

    // Send POST request to backend
    try {
      await axios.post('http://localhost:8076/services', formData);
      setLoading(false);
      navigate('/services/allService'); // Redirect to services list on success
    } catch (error) {
      console.error(error);
      setError('Failed to create the service. Please try again.');
      setLoading(false); // Stop loading state on error
    }
  };

  // Handle price input change
  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
      setPriceError(''); // Clear error message if valid
    } else {
      setPriceError('Please enter a valid number.');
    }
  };

  // Handle duration input change
  const handleDurationChange = (e) => {
    const value = e.target.value;
    if (/^\d+$/.test(value)) {
      setDuration(value);
      setDurationError(''); // Clear error message if valid
    } else {
      setDurationError('Please enter a valid whole number.');
    }
  };

  return (
    <div className="container mx-auto p-6" style={{ maxWidth: '600px' }}>
      <h1 className="text-3xl font-bold mb-6">Create New Service</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form 
        onSubmit={handleSubmit} 
        className='space-y-4 border border-gray-300 p-4 rounded shadow-md'
      >
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2">Sub Category:</label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border px-2 py-1 w-full"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Duration: (min)</label>
          <input
            type="text"
            value={duration}
            onChange={handleDurationChange}
            placeholder="e.g. 60min"
            required
            className="border px-2 py-1 w-full max-w-xs"
          />
          {durationError && <p className="text-red-600">{durationError}</p>}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Price: (Rs)</label>
          <input
            type="text"
            value={price}
            onChange={handlePriceChange}
            required
            className="border px-2 py-1 w-full max-w-xs"
          />
          {priceError && <p className="text-red-600">{priceError}</p>}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Available:</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={available === 'Yes'}
                onChange={() => setAvailable('Yes')}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={available === 'No'}
                onChange={() => setAvailable('No')}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border px-2 py-1"
          />
        </div>

        <button
          type="submit"
          className="p-2 bg-violet-500 rounded text-white"
          disabled={loading}
        >
          {loading ? 'Creating Service...' : 'Create Service'}
        </button>
      </form>
    </div>
  );
};

export default CreateService;
