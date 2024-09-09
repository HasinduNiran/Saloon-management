import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; 
import { BsInfoCircle } from 'react-icons/bs';

const ShowAppointment = () => {
  // State to store fetched appointment data
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments from the backend on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8076/appointments")
      .then((response) => {
        setAppointments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Appointments</h1>
      <table className="border-2 border-sky-400 w-full table-auto">
        <thead>
          <tr>
          <th className="border-2 border-sky-400 px-4 py-2">Appointment ID</th>
            <th className="border-2 border-sky-400 px-4 py-2">Name</th>
            <th className="border-2 border-sky-400 px-4 py-2">Email</th>
            <th className="border-2 border-sky-400 px-4 py-2">Phone</th>
            <th className="border-2 border-sky-400 px-4 py-2">Stylist</th>
            <th className="border-2 border-sky-400 px-4 py-2">Service</th>
            <th className="border-2 border-sky-400 px-4 py-2">Package</th>
            <th className="border-2 border-sky-400 px-4 py-2">Date</th>
            <th className="border-2 border-sky-400 px-4 py-2">Time</th>
            <th className="border-2 border-sky-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.appoi_ID}>
              <td className="border-2 border-sky-400 px-4 py-2">{appointment.appoi_ID}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{appointment.client_name}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{appointment.client_email}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{appointment.client_phone}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{appointment.stylist}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{appointment.service}</td>
              <td className="border-2 border-sky-400 px-4 py-2">
                {appointment.customize_package || "N/A"}
              </td>
              <td className="border-2 border-sky-400 px-4 py-2">{appointment.appoi_date}</td>
              <td className="border-2 border-sky-400 px-4 py-2">{appointment.appoi_time}</td>
              <td className="border-2 border-sky-400 px-4 py-2 flex justify-center">
              <Link
                  to={`/appointments/details/${appointment._id}`}
                  className="text-green-600 mr-4"
                  title="View Appointment"
                >
                  <BsInfoCircle size={20} /> 
                </Link>
                <Link
                  to={`/appointments/edit/${appointment._id}`}
                  className="text-blue-600 mr-4"
                  title="Edit Appointment"
                >
                  <FaEdit size={20} /> 
                </Link>
                <Link
                   to={`/appointments/delete/${appointment._id}`}
                   className="text-red-600"
                   title="Delete Appointment" 
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

export default ShowAppointment;
