import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaFilePdf } from "react-icons/fa"; 
import { BsInfoCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";
import "jspdf-autotable";

const ShowAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [noDataMessage, setNoDataMessage] = useState('');

  // Search function
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8076/searchappointment?search=${searchQuery}`);
      console.log("Search response:", response);
      if (response.data.length === 0) {
        console.log("No matching appointments found.");
        setNoDataMessage('No matching appointments found.');
      } else {
        console.log("Matching appointments found:", response.data);
        setNoDataMessage('');
        setAppointments(response.data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setLoading(false);
    }
  };

    // Apply search filter
    const applySearchFilter = (appointments) => {
  
      const appoi_ID = appointments.appoi_ID ? appointments.appoi_ID.toLowerCase() : '';
      const client_name = appointments.client_name ? appointments.client_name.toLowerCase() : '';
      const client_email = appointments.client_email ? appointments.client_email.toLowerCase() : '';
      const client_phone = appointments.client_phone ? appointments.client_phone.toString() : '';
      const stylist = appointments.stylist ? appointments.stylist.toLowerCase() : ''; 
      const service = appointments.service ? appointments.service.toLowerCase() : '';
      const appoi_date = appointments.appoi_date ? appointments.appoi_date.toLowerCase() : '';
      const appoi_time = appointments.appoi_time ? appointments.appoi_time.toLowerCase() : '';
      const services = appointments.services ? appointments.services.toLowerCase() : '';
      const packages = appointments.packages ? appointments.packages.toLowerCase() : '';
  
      return (
        appoi_ID.includes(searchQuery.toLowerCase()) ||
        client_name.includes(searchQuery.toLowerCase()) ||
        client_email.includes(searchQuery.toLowerCase()) ||
        client_phone.includes(searchQuery.toLowerCase()) ||
        stylist.includes(searchQuery.toLowerCase()) || 
        service.includes(searchQuery.toLowerCase()) ||
        appoi_date.includes(searchQuery.toLowerCase()) ||
        appoi_time.includes(searchQuery.toLowerCase()) ||
        services.includes(searchQuery.toLowerCase()) ||
        packages.includes(searchQuery.toLowerCase())
      );
    };

     
    const filteredAppoointments = appointments.filter(applySearchFilter);

  
  // Function to handle the icon click
  const handleAddClick = () => {
    navigate('/appointments/create');
  };

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

// Function to generate PDF
const generatePDF = () => {
  const doc = new jsPDF();

  const tableColumn = [
    "Appointment ID",
    "Name",
    "Email",
    "Phone",
    "Stylist",
    "Service",
    "Package",
  ];
  const tableRows = [];

  appointments.forEach((appointment) => {
    const appointmentData = [
      appointment.appoi_ID,
      appointment.client_name,
      appointment.client_email,
      appointment.client_phone,
      appointment.stylist,
      appointment.service,
      appointment.customize_package || "N/A",
    ];
    tableRows.push(appointmentData);

    // Show Date and Time as points above the table (per appointment)
    doc.setFontSize(10).setTextColor("#333");
    doc.text(`Appointment Date: ${appointment.appoi_date}`, 15, doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 60);
    doc.text(`Appointment Time: ${appointment.appoi_time}`, 15, doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : 65);
  });

  const date = new Date().toLocaleDateString();

  // PDF Header
  doc.setFontSize(24).setFont("helvetica", "bold").setTextColor("#4B9CD3");
  doc.text("Saloon Management", 105, 15, { align: "center" });

  doc.setFont("helvetica", "normal").setFontSize(18).setTextColor("#333");
  doc.text("Appointment Details Report", 105, 25, { align: "center" });

  doc.setFont("helvetica", "italic").setFontSize(12).setTextColor("#666");
  doc.text(`Report Generated Date: ${date}`, 105, 35, { align: "center" });

  doc.setFont("helvetica", "normal").setFontSize(10).setTextColor("#999");
  doc.text("Saloon, Gampaha", 105, 45, { align: "center" });

  doc.setDrawColor(0, 0, 0).setLineWidth(0.5);
  doc.line(10, 49, 200, 49);

  // PDF Table without Date and Time columns
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 70, // Adjust startY to make space for Date and Time text above
    styles: { fontSize: 10, cellPadding: 2 },
    headStyles: {
      fillColor: [31, 41, 55],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center", // Center-align header text
    },
    bodyStyles: {
      halign: "center", // Center-align body text
    },
    alternateRowStyles: {
      fillColor: [230, 230, 230],
    },
    columnStyles: {
      0: { cellWidth: 20 }, // Appointment ID
      1: { cellWidth: 30 }, // Name
      2: { cellWidth: 35 }, // Email
      3: { cellWidth: 25 }, // Phone
      4: { cellWidth: 20 }, // Stylist
      5: { cellWidth: 20 }, // Service
      6: { cellWidth: 20 }, // Package
    },
  });

  // Save the generated PDF
  doc.save(`Appointment-Details-Report_${date}.pdf`);
};



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between my-6">
        <h1 className="text-3xl font-semibold text-gray-800">Appointments</h1>
        <FaPlus 
          className="text-2xl cursor-pointer text-blue-500 hover:text-blue-700"
          onClick={handleAddClick}
          title='Add New Appointment'
        />
      </div>

       {/* Search bar and PDF button container */}
  <div className="flex items-center space-x-4 mb-6">
  <input
          type="text"
          name="searchQuery"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search here..."
          className="mr-2 border border-gray-400 p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-violet-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>  

    {/* PDF Button */}
    <button 
      onClick={generatePDF} 
      className="bg-violet-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition duration-150 ease-in-out"
    >
      Generate PDF
    </button>
  </div>
  {noDataMessage && (
        <p className="text-red-500 text-center">{noDataMessage}</p>
      )} 
  <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-violet-300 text-white">
          <tr>
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Appointment ID</th>
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Name</th>
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Email</th>
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Phone</th>
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Stylist</th>
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Service</th>
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Package</th>
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Date</th>
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Time</th>
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredAppoointments.map((appointment) => (
            <tr key={appointment.appoi_ID} className="hover:bg-gray-100 transition duration-150 ease-in-out">
              <td className="px-6 py-4 text-sm text-gray-700">{appointment.appoi_ID}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{appointment.client_name}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{appointment.client_email}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{appointment.client_phone}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{appointment.stylist}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{appointment.service}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {appointment.customize_package || "N/A"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{appointment.appoi_date}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{appointment.appoi_time}</td>
              <td className="px-6 py-4 text-sm text-gray-700 flex items-center space-x-4">
                <Link
                  to={`/appointments/details/${appointment._id}`}
                  className="text-green-600 hover:text-green-800 transition duration-150 ease-in-out"
                  title="View Appointment"
                >
                  <BsInfoCircle size={20} /> 
                </Link>
                <Link
                  to={`/appointments/edit/${appointment._id}`}
                  className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
                  title="Edit Appointment"
                >
                  <FaEdit size={20} /> 
                </Link>
                <Link
                  to={`/appointments/delete/${appointment._id}`}
                  className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
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
    </div>
  );
};

export default ShowAppointment;
