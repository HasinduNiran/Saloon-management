import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { BsInfoCircle } from 'react-icons/bs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ShowPkg = () => {
  const [pkg, setPkg] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleAddClick = () => {
    navigate('/pkg/create');
  };

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

  const handleViewDetails = (ID) => {
    navigate(`/pkg/${ID}`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const tableColumn = [
      "Package ID",
      "Service Category",
      "Package Name",
      "Base Price",
      "Discount Rate",
      "Final Price",
    ];
    const tableRows = [];

    pkg.forEach((pkgItem) => {
      const data = [
        pkgItem.ID,
        pkgItem.category,
        pkgItem.p_name,
        pkgItem.base_price,
        pkgItem.discount_rate,
        pkgItem.final_price,
      ];
      tableRows.push(data);

      doc.setFontSize(10).setTextColor("#333");
      doc.text(`Start Date: ${pkgItem.start_date}`, 15, doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 60);
      doc.text(`End Date: ${pkgItem.end_date}`, 15, doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : 65);
    });

    const date = new Date().toLocaleDateString();

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

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 70,
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
      },
      bodyStyles: {
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 20 },
        4: { cellWidth: 30 },
        5: { cellWidth: 30 },
      },
      alternateRowStyles: {
        fillColor: [230, 230, 230],
      },
      margin: { top: 80 },
    });

    doc.save(`Package-Details-Report_${date}.pdf`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between my-6">
        <h1 className="text-3xl font-semibold text-gray-800">Packages List</h1>
        <FaPlus 
          className="text-3xl cursor-pointer text-blue-500 hover:text-blue-700"
          onClick={handleAddClick}
          title="Add New Package"
        />
      </div>

      <div className="flex items-center space-x-4 mb-6">
        
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
              <th className="text-left px-6 text-sm font-medium uppercase tracking-wider">Package ID</th>
              <th className="text-left px-6 text-sm font-medium uppercase tracking-wider">Service Category</th>
              <th className="text-left px-6 text-sm font-medium uppercase tracking-wider">Service Type</th>
              <th className="text-left px-6 text-sm font-medium uppercase tracking-wider">Package Name</th>
              <th className="text-left px-6 text-sm font-medium uppercase tracking-wider">Package Type</th>
              <th className="text-left px-6 text-sm font-medium uppercase tracking-wider">Description</th>
              <th className="text-left px-6 text-sm font-medium uppercase tracking-wider">Base Price (Rs)</th>
              <th className="text-left px-6 text-sm font-medium uppercase tracking-wider">Discount Rate (%)</th>
              <th className="text-left px-6 text-sm font-medium uppercase tracking-wider">Final Price (Rs)</th>
              <th className="text-left px-6 text-sm font-medium uppercase tracking-wider">Start Date</th>
              <th className="text-left px-6 text-sm font-medium uppercase tracking-wider">End Date</th>
              <th className="text-left px-6 text-sm font-medium uppercase tracking-wider">Conditions</th>
              <th className="text-left px-6 text-sm font-medium uppercase tracking-wider">Actions</th>
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
                <td className="px-6 py-4 text-sm text-gray-700 flex space-x-2">
                  <BsInfoCircle 
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    onClick={() => handleViewDetails(pkg.ID)}
                    title="View Details"
                  />
                  <Link to={`/pkg/edit/${pkg.ID}`}>
                    <FaEdit className="text-yellow-500 cursor-pointer hover:text-yellow-700" title="Edit" />
                  </Link>
                  <Link to={`/pkg/delete/${pkg.ID}`}>
                    <FaTrash className="text-red-500 cursor-pointer hover:text-red-700" title="Delete" />
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
