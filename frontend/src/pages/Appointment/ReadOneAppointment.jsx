import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const DetailsAppointment = () => {
  const { id } = useParams(); // Get the appointment ID from the URL parameters
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for handling errors
  const navigate = useNavigate(); // For navigating to the previous page

  // Fetch appointment details on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:8076/appointments/${id}`)
      .then((response) => {
        setAppointment(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to fetch appointment details');
        setLoading(false);
      });
  }, [id]);

  // Handle going back to the previous page
  const handleBack = () => {
    navigate('/appointments/allAppointment'); // Navigate to appointments list
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!appointment) {
    return <div>Appointment not found</div>;
  }

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6" style={{ boxShadow: '0 4px 8px rgba(100, 100, 255, 0.8)' }}>
        <h1 className="text-4xl font-bold mb-6">Appointment Details</h1>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Appointment ID</h2>
            <p className="text-lg">{appointment.appoi_ID}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Name with initials</h2>
            <p className="text-lg">{appointment.client_name}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">E-mail</h2>
            <p className="text-lg">{appointment.client_email}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Contact Number</h2>
            <p className="text-lg">{appointment.client_phone}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Preferred Stylist</h2>
            <p className="text-lg">{appointment.stylist}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Service Category</h2>
            <p className="text-lg">{appointment.service}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Customized Package Details</h2>
            <p className="text-lg">{appointment.customize_package || 'N/A'}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Appointment Date</h2>
            <p className="text-lg">{appointment.appoi_date}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Appointment Time</h2>
            <p className="text-lg">{appointment.appoi_time}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center">
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={handleBack}
          >
            Back to Appointments
          </button>
          <Link
            to={`/appointments/edit/${appointment.appoi_ID}`} // Ensure the correct ID is used
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
          >
            Edit Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailsAppointment;
