import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReadFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    if (loading) {
        return <div>Loading feedback...</div>;
    }

    if (error) {
        return <div className="text-red-600">{error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
                <h1 className="text-center text-3xl font-extrabold text-gray-900">Feedback List</h1>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {feedbacks.length === 0 ? (
                        <p className="text-center text-gray-600">No feedback available yet.</p>
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
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReadFeedback;
