import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editFeedback, setEditFeedback] = useState({});
    const [success, setSuccess] = useState('');
    const [updateError, setUpdateError] = useState('');

    // Fetch feedback data on component load
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:8076/feedback'); // Replace with your API endpoint
                setFeedbacks(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load feedback. Please try again later.');
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    // Handle edit click
    const handleEditClick = (feedback) => {
        setEditMode(true);
        setEditFeedback(feedback);
        setSuccess('');
        setUpdateError('');
    };

    // Handle update feedback
    const handleUpdateFeedback = async (e) => {
        e.preventDefault();
        setUpdateError('');
        setSuccess('');

        try {
            await axios.put(`http://localhost:8076/feedback/${editFeedback.id}`, editFeedback); // Replace with your API endpoint
            setFeedbacks(feedbacks.map((fb) => (fb.id === editFeedback.id ? editFeedback : fb)));
            setSuccess('Feedback updated successfully!');
            setEditMode(false);
        } catch (err) {
            console.error(err);
            setUpdateError('Failed to update feedback. Please try again.');
        }
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditFeedback({ ...editFeedback, [name]: value });
    };

    if (loading) {
        return <div>Loading feedback...</div>;
    }

    if (error) {
        return <div className="text-red-600">{error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
                <h1 className="text-center text-3xl font-extrabold text-gray-900">Update Feedback</h1>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {updateError && <p className="text-red-600">{updateError}</p>}
                    {success && <p className="text-green-600">{success}</p>}

                    {editMode ? (
                        <form onSubmit={handleUpdateFeedback} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={editFeedback.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={editFeedback.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={editFeedback.message}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (out of 5)</label>
                                <input
                                    id="rating"
                                    name="rating"
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={editFeedback.rating}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none transition duration-150 ease-in-out"
                                >
                                    Update Feedback
                                </button>
                                <button
                                    onClick={() => setEditMode(false)}
                                    className="w-full flex justify-center py-2 px-4 mt-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none transition duration-150 ease-in-out"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <ul className="space-y-4">
                            {feedbacks.map((feedback, index) => (
                                <li
                                    key={index}
                                    className="p-4 border border-gray-300 rounded-lg shadow-sm"
                                >
                                    <h2 className="text-xl font-semibold text-gray-800">{feedback.name}</h2>
                                    <p className="text-sm text-gray-500">{feedback.email}</p>
                                    <p className="mt-2 text-gray-700">{feedback.message}</p>
                                    <p className="mt-2 text-yellow-500">Rating: {feedback.rating}/5</p>
                                    <button
                                        onClick={() => handleEditClick(feedback)}
                                        className="mt-4 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-500 transition duration-150 ease-in-out"
                                    >
                                        Edit Feedback
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdateFeedback;
