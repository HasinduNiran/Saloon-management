import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EmployeeSalaryReport = ({ filteredSalaries }) => {
    const generatePDF = () => {
        const doc = new jsPDF();
        const tableColumn = [
            "No",
            "Employee No",
            "Employee Name",
            "From Date",
            "To Date",
            "Total OT Hours",
            "OT Pay",
            "Total Worked Hours",
            "Worked Pay",
            "Total Salary"
        ];
        const tableRows = [];

        filteredSalaries.forEach((salary, index) => {
            const data = [
                index + 1,
                salary.EmpID,
                salary.employeeName,
                salary.fromDate,
                salary.toDate,
                salary.totalOThours || 'N/A',
                salary.totalOTpay || 'N/A',
                salary.totalWorkedhours || 'N/A',
                salary.totalWorkedpay || 'N/A',
                salary.TotalSalary || 'N/A'
            ];
            tableRows.push(data);
        });

        const date = new Date().toLocaleDateString();

        // Add headers
        doc.setFontSize(24).setFont("helvetica", "bold").setTextColor("#4B9CD3");
        doc.text("Saloon Management", 105, 15, { align: "center" });

        doc.setFont("helvetica", "normal").setFontSize(18).setTextColor("#333");
        doc.text("Employee Salary Report", 105, 25, { align: "center" });

        doc.setFont("helvetica", "italic").setFontSize(12).setTextColor("#666");
        doc.text(`Report Generated Date: ${date}`, 105, 35, { align: "center" });

        doc.setFont("helvetica", "normal").setFontSize(10).setTextColor("#999");
        doc.text("Saloon, Gampaha", 105, 45, { align: "center" });

        // Draw a line
        doc.setDrawColor(0, 0, 0).setLineWidth(0.5);
        doc.line(10, 49, 200, 49);

        // Create the table
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 55,
            styles: { fontSize: 10, cellPadding: 2 },
            headStyles: {
                fillColor: [44, 62, 80],
                textColor: [255, 255, 255],
                fontStyle: "bold",
                halign: 'center'
            },
            alternateRowStyles: {
                fillColor: [230, 230, 230]
            },
            margin: { top: 60 }
        });

        // Save the PDF
        doc.save(`Employee-Salary-Report_${date}.pdf`);

        // Send email alert to HR manager
        const emailSubject = encodeURIComponent('Employee Salary Report Generated');
        const emailBody = encodeURIComponent(`Dear HR Manager,\n\nThe employee salary report has been generated.\n\nBest regards,\nYour Company`);
        const emailRecipient = encodeURIComponent('hrManager@gmail.com');
        const mailtoLink = `mailto:${emailRecipient}?subject=${emailSubject}&body=${emailBody}`;

        window.location.href = mailtoLink;
    };

    return (
        <button onClick={generatePDF} className='btn2' style={{ backgroundColor: '#4B9CD3', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            Generate Report
        </button>
    );
};

export default EmployeeSalaryReport;
