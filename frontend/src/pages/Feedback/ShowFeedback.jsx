import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';
import Swal from 'sweetalert2';
import CountUp from 'react-countup';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../images/logo.png';

const ShowFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCustomerOpen, setIsCustomerOpen] = useState(false);
    const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
    const [isCompanyOpen, setIsCompanyOpen] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
       

        axios
            .get('http://localhost:8077/feedback')
            .then((response) => {
                setFeedbacks(response.data);
                setFilteredFeedbacks(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching feedbacks:', error);
                setError('Error fetching feedbacks.');
                setLoading(false);
            });
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filteredFeedbacks = feedbacks.filter((feedback) => {
            return (
                feedback.cusID.toLowerCase().includes(query) ||
                feedback.name.toLowerCase().includes(query) ||
                feedback.email.toLowerCase().includes(query) ||
                feedback.phone_number.toLowerCase().includes(query) ||
                feedback.employee.toLowerCase().includes(query) ||
                feedback.message.toLowerCase().includes(query) ||
                String(feedback.star_rating).toLowerCase().includes(query)
            );
        });
        setFilteredFeedbacks(filteredFeedbacks);

       
       
    };

    const handleDelete = (id, type) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            axios
                .delete(`http://localhost:8077/${type}/${id}`)
                .then(() => {
                    if (type === 'feedback') {
                        setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
                        setFilteredFeedbacks(filteredFeedbacks.filter(feedback => feedback._id !== id));
                    } else {
                        setCustomers(customers.filter(customer => customer._id !== id));
                        setFilteredCustomers(filteredCustomers.filter(customer => customer._id !== id));
                    }
                })
                .catch((error) => {
                    console.error(`Error deleting ${type}:`, error);
                    setError(`Error deleting ${type}.`);
                });
        }
    };

    const generateReport = () => {
        const doc = new jsPDF();
        doc.text('Feedback Report', 14, 16);

        const tableData = filteredFeedbacks.map(feedback => [
            feedback.cusID,
            feedback.name,
            feedback.email,
            feedback.phone_number,
            feedback.employee,
            feedback.message,
            feedback.star_rating
        ]);

        doc.autoTable({
            head: [['Customer ID', 'Name', 'Email', 'Phone Number', 'Employee', 'Message', 'Star Rating']],
            body: tableData,
            startY: 30,
            margin: { horizontal: 10 },
            styles: { fontSize: 10 },
        });

        doc.save('feedback_report.pdf');
    };

   

    return (
        <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            {/* Sidebar */}
            {sidebarOpen && (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="flex items-center justify-center h-16 bg-gray-800">
            <img src={logo} alt="logo" style={{ width: '60px', height: '60px' }} />
        </div>
        <nav className="flex-1">
            <ul className="mt-2">
           
                
                {/* Customer Details Dropdown */}
                <li 
                    className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center justify-between cursor-pointer"
                    onClick={() => setIsCustomerOpen(!isCustomerOpen)}
                >
                    <div className="flex items-center space-x-3">
                        <i className="bx bx-user text-xl"></i>
                        <span>Customer :</span>
                    </div>
                    <i className={`bx bx-chevron-${isCustomerOpen ? 'up' : 'down'} text-xl`}></i>
                </li>
                {isCustomerOpen && (
                    <ul className="ml-8">
                        <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3">
                            <Link to="/Customer">Customer Details</Link>
                        </li>
                        <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3">
                            <Link to="/feedback">Feedback</Link>
                        </li>
                        
                    </ul>
                )}

            </ul>
        </nav>
        <div className="p-3">
            <button className="w-full flex items-center p-3 bg-gray-800 rounded hover:bg-gray-700">
                <i className="bx bx-cog text-xl"></i>
                <span className="ml-4">Settings</span>
            </button>
        </div>
    </aside>
)}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <header className="flex items-center justify-between bg-white h-16 px-4 shadow">
                    <div className="flex items-center">
                        <i className="bx bx-menu text-xl cursor-pointer" onClick={toggleSidebar}></i>
                        <input
                            type="search"
                            placeholder="Search..."
                            className="ml-4 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <button
                            className="mt-1 ml-3 inline-block px-8 py-2.5 text-white bg-gray-800 text-sm uppercase rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg active:translate-y-px active:shadow-md"
                            onClick={generateReport}
                        >
                            Generate Report
                        </button>
                        {/* Dark Mode Toggle Button */}
                        <button
                            className="mt-1 ml-3 inline-block px-8 py-2.5 text-white bg-gray-800 text-sm uppercase rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg active:translate-y-px active:shadow-md"
                            onClick={toggleDarkMode}
                        >
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                        <button class="mt-1 ml-3 inline-block px-8 py-2.5 text-white bg-gray-800 text-sm uppercase rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg active:translate-y-px active:shadow-md"  >
                                <Link to="/feedback/create">Give Feedback</Link>
                             </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <i className="bx bx-bell text-xl"></i>
                        <div className="flex items-center space-x-2">
                            <img
                                src="https://randomuser.me/api/portraits/men/11.jpg"
                                alt="user"
                                className="h-8 w-8 rounded-full"
                            />
                            <span>Tom Cook</span>
                            <i className="bx bx-chevron-down text-xl"></i>
                        </div>
                    </div>
                </header>

                {/* Stats Section with Dark Mode */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
                    <div className="flex flex-col items-center">
                        <h3 className="text-5xl font-extrabold text-dark-grey-900">
                            <CountUp id="countto1" end={250} />
                            +
                        </h3>
                        <p className="text-base font-medium text-dark-grey-600">Successful Projects</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-5xl font-extrabold text-dark-grey-900">
                            <CountUp id="countto2" end={1200} />
                            +
                        </h3>
                        <p className="text-base font-medium text-dark-grey-600">Customer Feedbacks</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-5xl font-extrabold text-dark-grey-900">
                            <CountUp id="countto3" end={800} />
                            +
                        </h3>
                        <p className="text-base font-medium text-dark-grey-600">Employees</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-5xl font-extrabold text-dark-grey-900">
                            <CountUp id="countto4" end={20} />
                            +
                        </h3>
                        <p className="text-base font-medium text-dark-grey-600">Years in Business</p>
                    </div>
                </div>

                {/* Feedback Table */}
                <div className={`p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                    <h2 className="text-2xl font-bold mb-4">Customer Feedbacks</h2>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="p-3">Customer ID</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Phone Number</th>
                                <th className="p-3">Employee</th>
                                <th className="p-3">Message</th>
                                <th className="p-3">Star Rating</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFeedbacks.map((feedback,index) => (
                                <tr key={feedback._id}
                                className={index % 2 === 0 ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : (darkMode ? 'bg-gray-800' : 'bg-white')}

                                >
                                    <td className="p-3 border-b">{feedback.cusID}</td>
                                    <td className="p-3 border-b">{feedback.name}</td>
                                    <td className="p-3 border-b">{feedback.email}</td>
                                    <td className="p-3 border-b">{feedback.phone_number}</td>
                                    <td className="p-3 border-b">{feedback.employee}</td>
                                    <td className="p-3 border-b">{feedback.message}</td>
                                    <td className="p-3 border-b">{feedback.star_rating}</td>
                                    <td className="p-3 border-b flex items-center space-x-2">
                                    <Link to={`/feedback/edit/${feedback._id}`} className="text-yellow-600">
                                            <AiOutlineEdit />
                                        </Link>
                                        <Link to={`/feedback/get/${feedback._id}`}>
                                            <BsInfoCircle className="text-blue-600 hover:text-blue-800" title="Edit" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(feedback._id, 'feedback')}
                                            className="text-red-600 hover:text-red-800"
                                            title="Delete"
                                        >
                                            <MdOutlineDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

              
            </div>
        </div>
    );
};

export default ShowFeedback;