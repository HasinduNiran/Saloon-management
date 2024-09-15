import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { BsInfoCircle } from 'react-icons/bs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ShowService = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to handle the icon click for adding new service
  const handleAddClick = () => {
    navigate('/services/create');
  };

  // Fetch services data from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8076/services');
        setServices(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to load services. Please try again later.');
      }
    };

    fetchServices();
  }, []);

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Service ID", "Category", "Service Type", "Description", "Duration (min)", "Price (Rs)", "Available"];
    const tableRows = [];

    services.forEach(service => {
      const serviceData = [
        service.service_ID,
        service.category,
        service.subCategory,
        service.description,
        service.duration,
        service.price,
        service.available ? 'Yes' : 'No'
      ];
      tableRows.push(serviceData);
    });

    const date = new Date().toLocaleDateString();

    // PDF Header
    doc.setFontSize(24).setFont("helvetica", "bold").setTextColor("#4B9CD3");
    doc.text("Saloon Management", 105, 15, { align: "center" });

    doc.setFont("helvetica", "normal").setFontSize(18).setTextColor("#333");
    doc.text("Package Details Report", 105, 25, { align: "center" });

    doc.setFont("helvetica", "italic").setFontSize(12).setTextColor("#666");
    doc.text(`Report Generated Date: ${date}`, 105, 35, { align: "center" });

    doc.setFont("helvetica", "normal").setFontSize(10).setTextColor("#999");
    doc.text("Saloon, Gampaha", 105, 45, { align: "center" });

    doc.setDrawColor(0, 0, 0).setLineWidth(0.5);
    doc.line(10, 49, 200, 49);

    // PDF Table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 55,
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: 'center', // Center-align header text
      },
      bodyStyles: {
        halign: 'center', // Center-align body text
      },
      columnStyles: {
        0: { cellWidth: 20 }, 
        1: { cellWidth: 30 }, 
        2: { cellWidth: 30 }, 
        3: { cellWidth: 30 }, 
        4: { cellWidth: 30 },
        5: { cellWidth: 30 }, 
        6: { cellWidth: 30 }, 
      },
      alternateRowStyles: {
        fillColor: [230, 230, 230]
      },
      margin: { top: 60 }
    });
    

    // Save PDF
    doc.save(`Package-Details-Report_${date}.pdf`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between my-6">
        <h1 className="text-3xl font-semibold text-gray-800">Services List</h1>
        <FaPlus 
          className="text-2xl cursor-pointer text-blue-500 hover:text-blue-700"
          onClick={handleAddClick}
          title='Add New Service'
        />
        </div>

   {/* Search bar and PDF button container */}
  <div className="flex items-center space-x-4 mb-6">
    {/* Search bar */}
   

    {/* PDF Button */}
    <button 
      onClick={generatePDF} 
      className="bg-violet-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition duration-150 ease-in-out"
    >
      Generate PDF
    </button>
  </div>


      {error && <p className="text-red-600">{error}</p>}
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-violet-300 text-white">
          <tr>
            <th className="text-left px-6  py-3 text-sm font-medium uppercase tracking-wider">Service ID</th>
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Category</th>
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Service Type</th>
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Description</th>
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Duration (min)</th>
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Price (Rs)</th>
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Available</th>
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {services.map((service) => (
            <tr key={service._id}className="hover:bg-gray-100 transition duration-150 ease-in-out">
              <td className="px-6 py-4 text-sm text-gray-700">{service.service_ID}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{service.category}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{service.subCategory}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{service.description}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{service.duration}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{service.price}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{service.available ? 'Yes' : 'No'}</td>
              <td className="px-6 py-4 text-sm text-gray-700 flex items-center space-x-4">
                <Link
                  to={`/services/details/${service._id}`}
                  className="text-green-600  hover:text-green-800 transition duration-150 ease-in-out"
                  title="View Service"
                >
                  <BsInfoCircle size={20} />
                </Link>
                <Link
                  to={`/services/edit/${service._id}`}
                  className="text-blue-600  hover:text-blue-800 transition duration-150 ease-in-out"
                  title="Edit Service"
                >
                  <FaEdit size={20} />
                </Link>
                <Link
                  to={`/services/delete/${service._id}`}
                  className="text-red-600  hover:text-red-800 transition duration-150 ease-in-out"
                  title="Delete Service"
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

export default ShowService;
