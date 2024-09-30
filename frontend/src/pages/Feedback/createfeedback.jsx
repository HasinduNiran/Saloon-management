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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import Font Awesome
import { faStar } from "@fortawesome/free-solid-svg-icons"; // Import the star icon

const CreateFeedback = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone_number, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [employee, setEmployee] = useState("");
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [date_of_service, setDateOfService] = useState(null);
  const [message, setMessage] = useState("");
  const [star_rating, setStarRating] = useState(0); // Star rating state
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
          setcussID(data.cusID);
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
    }
  }, [cusID]);
  
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

  const handleStarClick = (rating) => {
    setStarRating(rating); // Set the star rating
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          onClick={() => handleStarClick(i)} // Handle star click
          className={i <= star_rating ? "text-yellow-500" : "text-gray-300"}
          size="2x"
          style={{ cursor: "pointer" }}
        />
      );
    }
    return stars;
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
            <div>
              <label htmlFor="cusID" className="block text-sm font-medium leading-5 text-gray-700">Customer ID</label>
              <input
                id="cusID"
                type="text"
                value={cussID}
                onChange={(e) => setcussID(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                disabled
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">First Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium leading-5 text-gray-700">Last Name</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium leading-5 text-gray-700">Phone Number</label>
              <input
                id="phone_number"
                type="text"
                value={phone_number}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="employee" className="block text-sm font-medium leading-5 text-gray-700">Employee</label>
              <select
                id="employee"
                value={employee}
                onChange={(e) => setEmployee(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select an employee</option>
                {employeeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="date_of_service" className="block text-sm font-medium leading-5 text-gray-700">Date of Service</label>
              <DatePicker
                id="date_of_service"
                selected={date_of_service}
                onChange={handleDateChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
              />
              {dateError && <p className="text-red-600">{dateError}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium leading-5 text-gray-700">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium leading-5 text-gray-700">Star Rating</label>
              <div className="flex items-center space-x-4">
                {renderStars()}
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleSaveFeedback}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-300 hover:bg-pink-400"
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
