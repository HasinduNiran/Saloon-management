import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import backgroundImage from "../../images/logobg.jpg";
import Logo from "../../images/logo.png";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner"; // Assuming you have this component

const UpdateFeedback = () => {
  const { id } = useParams(); // Get feedback ID from route params
  const [cusID, setCusID] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [employee, setEmployee] = useState("");
  const [date_of_service, setDateOfService] = useState(null);
  const [message, setMessage] = useState("");
  const [star_rating, setStarRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch feedback data by ID
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8076/feedback/${id}`);
        const data = response.data;

        // Populate the form with feedback data
        setCusID(data.cusID || "");
        setName(data.name);
        setPhone(data.phone_number);
        setEmail(data.email);
        setEmployee(data.employee);
        setDateOfService(new Date(data.date_of_service));
        setMessage(data.message);
        setStarRating(data.star_rating);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [id]);

  const handleDateChange = (date) => {
    if (date && date < new Date()) {
      setDateError("Please select a future date.");
    } else {
      setDateError("");
    }
    setDateOfService(date);
  };

  const handleUpdateFeedback = () => {
    if (!name || !phone_number || !email || !employee || !date_of_service || !message || !star_rating) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fill in all required fields!",
        showConfirmButton: true,
        timer: 2000,
      });
      return;
    }

    const feedbackData = {
      cusID,
      name,
      phone_number,
      email,
      employee,
      date_of_service: date_of_service ? date_of_service.toISOString().split("T")[0] : "",
      message,
      star_rating,
    };

    setLoading(true);
    axios
      .put(`http://localhost:8076/feedback/${id}`, feedbackData)
      .then(() => {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Feedback updated successfully!",
          showConfirmButton: true,
          timer: 2000,
        });
        navigate(`/customers/get/${cusID}`);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred. Please check console.");
        console.log(error);
      });
  };

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      style={containerStyle}
      className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <img
          className="mx-auto h-10 w-auto"
          src={Logo}
          alt="logo"
          style={{ width: "50px", height: "50px" }}
        />
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Update Feedback
        </h1>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {loading && <Spinner />}
          <form className="space-y-4">

            {/* Customer ID */}
            <div>
              <label htmlFor="cusID" className="block text-sm font-medium leading-5 text-gray-700">Customer ID (Optional)</label>
              <input
                id="cusID"
                type="text"
                value={cusID}
                onChange={(e) => setCusID(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
              />
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium leading-5 text-gray-700">Phone Number</label>
              <input
                id="phone_number"
                type="text"
                value={phone_number}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
              />
            </div>

            {/* Employee */}
            <div>
              <label htmlFor="employee" className="block text-sm font-medium leading-5 text-gray-700">Employee</label>
              <input
                id="employee"
                type="text"
                value={employee}
                onChange={(e) => setEmployee(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
              />
            </div>

            {/* Date of Service */}
            <div>
              <label htmlFor="date_of_service" className="block text-sm font-medium leading-5 text-gray-700">Date of Service</label>
              <DatePicker
                selected={date_of_service}
                onChange={handleDateChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  dateError ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm`}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
              />
              {dateError && <p className="text-red-500 text-sm">{dateError}</p>}
            </div>

            {/* Feedback Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium leading-5 text-gray-700">Feedback Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
                rows="4"
              />
            </div>

            {/* Star Rating */}
            <div>
              <label htmlFor="star_rating" className="block text-sm font-medium leading-5 text-gray-700">Star Rating (1-5)</label>
              <input
                id="star_rating"
                type="number"
                min="1"
                max="5"
                value={star_rating}
                onChange={(e) => setStarRating(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
              />
            </div>

            <div>
              <button
                type="button"
                onClick={handleUpdateFeedback}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:border-pink-700 focus:shadow-outline-blue active:bg-pink-700 transition duration-150 ease-in-out"
              >
                Update Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFeedback;
