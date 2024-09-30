import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom"; // Add useParams
import backgroundImage from "../../images/logobg.jpg";
import Logo from "../../images/logo.png";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner"; // Assuming you have this component

const CreateFeedback = () => {
  // const [cusID, setCusID] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState(""); // Added last name
  const [phone_number, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [employee, setEmployee] = useState("");
  const [employeeOptions, setEmployeeOptions] = useState([]); // Dropdown options
  const [date_of_service, setDateOfService] = useState(null);
  const [message, setMessage] = useState("");
  const [star_rating, setStarRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState("");
  const [cussID, setcussID] = useState('');
  
  const navigate = useNavigate();
  
  const { cusID } = useParams(); // Get CusID from the URL

  useEffect(() => {
    if (cusID) {
      setLoading(true);
      axios.get(`http://localhost:8076/customers/${cusID}`)
        .then((response) => {
          const data = response.data;
          setcussID(data.cusID); // Assuming cusID is coming from the API response
          setPhone(data.ContactNo);
          setEmail(data.Email);
          setName(`${data.FirstName} ${data.LastName}`);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          alert('An error occurred. Please check the console.');
          console.log(error);
        });
    } else {
      console.log("cusID is undefined");
    }
  }, [cusID]);
  
  

  // Fetch Employee options for the dropdown
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8076/employees");
        const employees = response.data.data || [];
        const employeeOptions = employees.map((emp) => ({
          value: emp.FirstName,
          label: `${emp.FirstName} ${emp.LastName}`,
        }));
        setEmployeeOptions(employeeOptions);
      } catch (error) {
        console.error("Error fetching employees:", error);
        Swal.fire({
          title: "Error",
          text: "Unable to fetch employee data. Please try again.",
          icon: "error",
        });
      }
    };

    fetchEmployees();
  }, []);


  const handleDateChange = (date) => {
    if (date && date < new Date()) {
      setDateError("Please select a future date.");
    } else {
      setDateError("");
    }
    setDateOfService(date);
  };

  const handleSaveFeedback = () => {
    if (!name || !lastName || !phone_number || !email || !employee || !date_of_service || !message || !star_rating) {
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
      lastName,
      phone_number,
      email,
      employee,
      date_of_service: date_of_service ? date_of_service.toISOString().split("T")[0] : "",
      message,
      star_rating,
    };

    setLoading(true);
    axios
      .post("http://localhost:8076/feedback", feedbackData)
      .then(() => {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Feedback submitted successfully!",
          showConfirmButton: true,
          timer: 2000,
        });
        navigate(`/customers/get/${cusID}`);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred. Please check the console.");
        console.error(error);
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
          Submit Feedback
        </h1>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {loading && <Spinner />}
          <form className="space-y-4">
            {/* Customer ID */}
            <div>
              <label htmlFor="cusID" className="block text-sm font-medium leading-5 text-gray-700">Customer ID</label>
              <input
                id="cusID"
                type="text"
                value={cussID}
                onChange={(e) => setcussID(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
                disabled
              />
            </div>

            {/* Auto-filled Fields */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">First Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium leading-5 text-gray-700">Last Name</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
              />
            </div>

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
              <select
                id="employee"
                value={employee}
                onChange={(e) => setEmployee(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              >
                <option value="" disabled>Select Employee</option>
                {employeeOptions.map((emp) => (
                  <option key={emp.value} value={emp.value}>
                    {emp.label}
                  </option>
                ))}
              </select>
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
                placeholderText="Select date of service"
              />
              {dateError && (
                <p className="text-red-500 text-xs mt-1">{dateError}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium leading-5 text-gray-700">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
              />
            </div>

            {/* Star Rating */}
            <div>
              <label htmlFor="star_rating" className="block text-sm font-medium leading-5 text-gray-700">Star Rating</label>
              <input
                id="star_rating"
                type="number"
                value={star_rating}
                onChange={(e) => setStarRating(Number(e.target.value))}
                min={0}
                max={5}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-pink-300 transition duration-150 ease-in-out sm:text-sm"
              />
            </div>

            {/* Save Button */}
            <div>
              <button
                type="button"
                onClick={handleSaveFeedback}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:shadow-outline-blue focus:border-pink-700 active:bg-pink-700 transition duration-150 ease-in-out"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFeedback;
