import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { BsInfoCircle } from 'react-icons/bs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ShowPkg = () => {
  const [pkg, setPkg] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); // For search input

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
};

const filteredPackages = pkg.filter(pkg => {
  const matchesSearch = (
    pkg.ID.toLowerCase().includes(searchQuery) ||
    pkg.p_name.toLowerCase().includes(searchQuery) ||
      (pkg.package_type && pkg.package_type.toLowerCase().includes(searchQuery)) ||
      (pkg.base_price && pkg.base_price.toString().includes(searchQuery)) ||
      (pkg.category && pkg.category.toLowerCase().includes(searchQuery)) ||
      (pkg.subCategory && pkg.subCategory.toLowerCase().includes(searchQuery)) ||
      (pkg.discount_rate && pkg.discount_rate.toString().includes(searchQuery)) ||
      (pkg.final_price && pkg.final_price.toString().includes(searchQuery)) 
  );

  return matchesSearch ;
});

  // Function to handle the icon click
  const handleAddClick = () => {
    navigate('/pkg/create');
  };

  // Fetch packages data from API
  useEffect(() => {
    const fetchPkg = async () => {
      try {
        const response = await axios.get('http://localhost:8076/pkg');
        setPkg(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to load packages. Please try again later.');
      }
    };

    fetchPkg();
  }, []);

  // Handle view details action
  const handleViewDetails = (ID) => {
    navigate(`/pkg/${ID}`); // Navigate to package details page
  };

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Define table columns
    const tableColumn = [
      "No", "Package ID", "Service Category", "Service Type", "Package Name",
      "Package Type", "Description", "Base Price", "Discount Rate", "Final Price",
      "Start Date", "End Date", "Conditions"
    ];
    const tableRows = [];

    // Populate table rows
    pkg.forEach((pkgItem, index) => {
      const data = [
        index + 1,
        pkgItem.ID,
        pkgItem.category,
        pkgItem.subCategory,
        pkgItem.p_name,
        pkgItem.package_type,
        pkgItem.description,
        pkgItem.base_price,
        pkgItem.discount_rate,
        pkgItem.final_price,
        pkgItem.start_date,
        pkgItem.end_date,
        pkgItem.conditions
      ];
      tableRows.push(data);
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
        0: { cellWidth: 10 }, // No
        1: { cellWidth: 30 }, // Package ID
        2: { cellWidth: 30 }, // Service Category
        3: { cellWidth: 30 }, // Service Type
        4: { cellWidth: 30 }, // Package Name
        5: { cellWidth: 30 }, // Package Type
        6: { cellWidth: 40 }, // Description
        7: { cellWidth: 30 }, // Base Price
        8: { cellWidth: 30 }, // Discount Rate
        9: { cellWidth: 30 }, // Final Price
        10: { cellWidth: 40 }, // Start Date
        11: { cellWidth: 40 }, // End Date
        12: { cellWidth: 40 }  // Conditions
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
  {/* Heading and Add button */}
  <div className="flex items-center justify-between my-6">
    <h1 className="text-3xl font-semibold text-gray-800">Packages List</h1>
    <FaPlus 
      className="text-3xl cursor-pointer text-blue-500 hover:text-blue-700"
      onClick={handleAddClick}
      title="Add New Package"
    />
  </div>

  {/* Search bar and PDF button container */}
  <div className="flex items-center space-x-4 mb-6">
    {/* Search bar */}
    <input 
      type="text" 
      placeholder="Search packages..." 
      value={searchQuery} 
      onChange={handleSearchChange} 
      className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
    />

    {/* PDF Button */}
    <button 
      onClick={generatePDF} 
      className="bg-violet-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition duration-150 ease-in-out"
    >
      Generate PDF
    </button>
  </div>

  {error && <p className="text-red-600">{error}</p>}

  {/* Modern Table Design */}
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-violet-300 text-white">
        <tr>
          <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Package ID</th>
          <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Service Category</th>
          <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Service Type</th>
          <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Package Name</th>
          <th className="text-left px-6 text-sm font-medium uppercase tracking-wider">Package Type</th>
          <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Description</th>
          <th className="text-left px-6 text-sm font-medium uppercase tracking-wider">Base Price (Rs)</th>
          <th className="text-left px-6 text-sm font-medium uppercase tracking-wider">Discount Rate (%)</th>
          <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Final Price (Rs)</th>
          <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Start Date</th>
          <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">End Date</th>
          <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Conditions</th>
          <th className="text-left px-6  text-sm font-medium uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {pkg.map((pkg) => (
          <tr key={pkg._id} className="hover:bg-gray-100 transition duration-150 ease-in-out">
            <td className="px-6 py-4 text-sm text-gray-700">{pkg.ID}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{pkg.category}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{pkg.subCategory}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{pkg.p_name}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{pkg.package_type}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{pkg.description}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{pkg.base_price}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{pkg.discount_rate}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{pkg.final_price}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{pkg.start_date}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{pkg.end_date}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{pkg.conditions}</td>
            <td className="px-6 py-4 text-sm text-gray-700 flex items-center space-x-4">
              <Link
                to={`/pkg/details/${pkg._id}`}
                className="text-green-600 hover:text-green-800 transition duration-150 ease-in-out"
                title="View Package Details"
              >
                <BsInfoCircle size={20} />
              </Link>
              <Link
                to={`/pkg/edit/${pkg._id}`}
                className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
                title="Edit Package"
              >
                <FaEdit size={20} />
              </Link>
              <Link
                to={`/pkg/delete/${pkg._id}`}
                className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                title="Delete Package"
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

export default ShowPkg;
