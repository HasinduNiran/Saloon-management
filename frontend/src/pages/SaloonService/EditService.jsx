import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const subCategories = {
  Hair: ['Cut', 'Color', 'Style', 'Blow Dry', 'Perm', 'Extensions', 'Highlights', 'Straightening'],
  'Skin Care': ['Facial', 'Exfoliation', 'Moisturizing', 'Acne Treatment', 'Anti-Aging', 'Skin Brightening', 'Microdermabrasion'],
  Nail: ['Manicure', 'Pedicure', 'Nail Art', 'Gel Nails', 'Acrylic Nails', 'Nail Repair', 'Nail Polish', 'Cuticle Care'],
};

const EditService = () => {
  const { id } = useParams(); // Get serviceId from the URL
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // For uploading a new image
  const [existingImage, setExistingImage] = useState(''); // For displaying the existing image
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState('');
  const [error, setError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [durationError, setDurationError] = useState('');
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the service details using the serviceId
    axios.get(`http://localhost:8076/services/${id}`)
      .then((response) => {
        const service = response.data;
        setCategory(service.category);
        setSubCategory(service.subCategory);
        setDescription(service.description);
        setDuration(service.duration);
        setPrice(service.price);
        setAvailable(service.available);
        setExistingImage(service.image); // Set the existing image URL
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to load the service. Please try again.');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setPriceError('');
    setDurationError('');

    // Validate price and duration
    if (!price || isNaN(price)) {
      setPriceError('Please enter a valid number for price.');
      return;
    }

    if (!duration || isNaN(duration) || !Number.isInteger(parseFloat(duration))) {
      setDurationError('Please enter a valid whole number for duration.');
      return;
    }

    const formData = new FormData();
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('description', description);
    formData.append('duration', duration);
    formData.append('price', price);
    formData.append('available', available);

    // Append the new image if a new one is selected
    if (image) {
      formData.append('image', image);
    }

    axios.put(`http://localhost:8076/services/${id}`, formData)
      .then(() => {
        navigate('/services/allService'); // Redirect to the list after successful update
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to update the service. Please try again.');
      });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
      setPriceError('');
    } else {
      setPriceError('Please enter a valid number.');
    }
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    if (/^\d+$/.test(value)) {
      setDuration(value);
      setDurationError('');
    } else {
      setDurationError('Please enter a valid whole number.');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  if (loading) {
    return <p>Loading service details...</p>;
  }

  return (
    <div className="container mx-auto p-6" style={{ maxWidth: '600px' }}>
      <h1 className="text-3xl font-bold mb-6">Edit Service</h1>
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
          {durationError && <p className="text-red-600">{durationError}</p>} {/* Display duration error */}
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
          {priceError && <p className="text-red-600">{priceError}</p>} {/* Display price error */}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Available:</label>
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

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Current Image:</label>
          {existingImage ? (
            <img 
              src={`http://localhost:8076/${existingImage}`} 
              alt="Service Image" 
              className="w-32 h-32 object-cover mb-4"
            />
          ) : (
            <p>No image available.</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Select New Image (optional)</label>
          <input 
            type="file" 
            onChange={handleImageChange}
          />
          {image && <p>New image selected: {image.name}</p>}
        </div>

        <button
          type="submit"
          className="p-2 bg-violet-300 rounded text-white"
        >
          Update Service
        </button>
      </form>
    </div>
  );
};

export default EditService;
