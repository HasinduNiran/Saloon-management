// Importing necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailsAppointment = () => {
  const { id } = useParams(); // Get the appointment ID from the URL parameters
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!appointment) {
    return <div>Appointment not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Appointment Details</h1>
      <div className="border-2 border-sky-400 p-4">
      <p><strong>Appointment ID:</strong> {appointment.appoi_ID}</p>
        <p><strong>Name:</strong> {appointment.client_name}</p>
        <p><strong>Email:</strong> {appointment.client_email}</p>
        <p><strong>Phone:</strong> {appointment.client_phone}</p>
        <p><strong>Stylist:</strong> {appointment.stylist}</p>
        <p><strong>Service:</strong> {appointment.service}</p>
        <p><strong>Package:</strong> {appointment.customize_package || 'N/A'}</p>
        <p><strong>Date:</strong> {appointment.appoi_date}</p>
        <p><strong>Time:</strong> {appointment.appoi_time}</p>
      </div>
    </div>
  );
};

export default DetailsAppointment;
