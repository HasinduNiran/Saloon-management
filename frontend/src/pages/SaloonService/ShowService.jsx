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
  const [searchQuery, setSearchQuery] = useState('');
  const [noDataMessage, setNoDataMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Search function
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8076/searchservice?search=${searchQuery}`);
      console.log("Search response:", response);
      if (response.data.length === 0) {
        console.log("No matching services found.");
        setNoDataMessage('No matching services found.');
      } else {
        console.log("Matching services found:", response.data);
        setNoDataMessage('');
        setServices(response.data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching packages:", err);
      setLoading(false);
    }
  };

    // Apply search filter
    const applySearchFilter = (services) => {
  
      const service_ID = services.service_ID ? services.service_ID.toLowerCase() : '';
      const category = services.category ? services.category.toLowerCase() : '';
      const duration = services.duration ? services.duration.toLowerCase() : ''; 
      const price = services.price ? services.price.toString() : ''; 
      const available = services.available ? services.available.toLowerCase() : '';
      const subCategory = services.subCategory ? services.subCategory.toLowerCase() : '';
   
  
      return (
        service_ID.includes(searchQuery.toLowerCase()) ||
        category.includes(searchQuery.toLowerCase()) ||
        duration.includes(searchQuery.toLowerCase()) ||
        price.includes(searchQuery.toLowerCase()) ||
        available.includes(searchQuery.toLowerCase()) || 
        subCategory.includes(searchQuery.toLowerCase())
      );
    };

    // Filter reviews based on search query
    const filteredServices = services.filter(applySearchFilter);

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
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Image</th>
            <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredServices.map((service) => (
            <tr key={service._id}className="hover:bg-gray-100 transition duration-150 ease-in-out">
              <td className="px-6 py-4 text-sm text-gray-700">{service.service_ID}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{service.category}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{service.subCategory}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{service.description}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{service.duration}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{service.price}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{service.available ? 'Yes' : 'No'}</td>

              <td className="px-6 py-4 text-sm text-gray-700">
              <img src={`http://localhost:8076/${service.image}`}  className='w-full h-32 object-cover rounded-t-lg' />
                  {console.log(`http://localhost:8076/${service.image}`)}
              </td>

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
