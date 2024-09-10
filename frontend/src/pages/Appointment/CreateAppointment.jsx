import { useState } from "react";
import React from "react";
import Spinner from "../../components/Spinner";
import DatePicker from "react-datepicker"; // Importing DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Importing DatePicker styles

import axios from "axios";
import { useNavigate } from "react-router-dom";

// Functional component for creating appointment
const CreateAppointment = () => {
  // State variables for managing form data and loading state
  const [client_name, setName] = useState("");
  const [client_email, setEmail] = useState("");
  const [client_phone, setPhone] = useState("");
  const [stylist, setStylist] = useState("");
  const [service, setService] = useState("");
  const [customize_package, setPackage] = useState("");
  const [appoi_date, setDate] = useState(null);
  const [appoi_time, setTime] = useState(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Dummy data for dropdown options
  const stylists = ["Stylist 1", "Stylist 2", "Stylist 3"];
  const services = ["Haircut", "Nail", "Skin Care"];
  const timeIntervals = [
    "08:00 AM", "08:15 AM", "08:30 AM", "08:45 AM",
    "09:00 AM", "09:15 AM", "09:30 AM", "09:45 AM",
    "10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM",
    "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
    "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
    "01:00 PM", "01:15 PM", "01:30 PM", "01:45 PM",
    "02:00 PM", "02:15 PM", "02:30 PM", "02:45 PM",
    "03:00 PM", "03:15 PM", "03:30 PM", "03:45 PM",
    "04:00 PM", "04:15 PM", "04:30 PM", "04:45 PM",
    "05:00 PM", "05:15 PM", "05:30 PM", "05:45 PM",
    "06:00 PM", "06:15 PM", "06:30 PM", "06:45 PM",
    "07:00 PM", "07:15 PM", "07:30 PM", "07:45 PM",
  ];

  // Event handler for saving the Appointment
  const handleSaveAppointment = () => {
    // Creating data object from form inputs
    const data = {
      client_name,
      client_email,
      client_phone,
      stylist,
      service,
      customize_package,
      appoi_date: appoi_date ? appoi_date.toISOString().split("T")[0] : "",
      appoi_time,
    };
    setLoading(true);

    // Making a POST request to save the Appointment data
    axios
      .post("http://localhost:8076/appointments", data)
      .then(() => {
        // Resetting loading state and navigating to the home page
        setLoading(false);
        navigate("/appointments/allAppointment");
      })
      .catch((error) => {
        // Handling errors by resetting loading state, showing an alert, and logging the error
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  };

  // JSX for rendering the create appointments form
  return (
    <div className="p-4">
     
      <h1 className="text-3xl my-4">Create Appointments</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name with initials</label>
          <input
            type="text"
            value={client_name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Email</label>
          <input
            type="text"
            value={client_email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Contact Number</label>
          <input
            type="number"
            value={client_phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Preferred Stylist</label>
          <select
            value={stylist}
            onChange={(e) => setStylist(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            <option value="">Select Stylist</option>
            {stylists.map((stylist) => (
              <option key={stylist} value={stylist}>
                {stylist}
              </option>
            ))}
          </select>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Choose Service(s)</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            <option value="">Select Service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Customize Package (Optional)</label>
          <input
            type="text"
            value={customize_package}
            onChange={(e) => setPackage(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Appointment Date</label>
          <DatePicker
            selected={appoi_date}
            onChange={(date) => setDate(date)}
            dateFormat="yyyy-MM-dd"
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Appointment Time</label>
          <select
            value={appoi_time}
            onChange={(e) => setTime(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            <option value="">Select Time</option>
            {timeIntervals.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveAppointment}>
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the CreateAppointment component
export default CreateAppointment;
