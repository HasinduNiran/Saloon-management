import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EmployeeAttendanceReport = ({ filteredAttendance }) => {
    const generatePDF = () => {
        const doc = new jsPDF();
        const tableColumn = [
            "No",
            "Employee No",
            "Employee Name",
            "Date",
            "In Time",
            "Out Time",
            "Working Hours",
            "OT Hours"
        ];
        const tableRows = [];

        filteredAttendance.forEach((record, index) => {
            const data = [
                index + 1,
                record.EmpID,
                record.employeeName,
                record.date,
                record.InTime || "N/A",
                record.OutTime || "N/A",
                record.WorkingHours || 0,
                record.OThours || 0
            ];
            tableRows.push(data);
        });

        const date = new Date().toLocaleDateString();

        doc.setFontSize(24).setFont("helvetica", "bold").setTextColor("#4B9CD3");
        doc.text("Company Attendance Report", 105, 15, { align: "center" });

        doc.setFont("helvetica", "normal").setFontSize(18).setTextColor("#333");
        doc.text("Employee Attendance Details", 105, 25, { align: "center" });

        doc.setFont("helvetica", "italic").setFontSize(12).setTextColor("#666");
        doc.text(`Report Generated Date: ${date}`, 105, 35, { align: "center" });

        doc.setFont("helvetica", "normal").setFontSize(10).setTextColor("#999");
        doc.text(
            "Company, Location",
            105,
            45,
            { align: "center" }
        );

        doc.setDrawColor(0, 0, 0).setLineWidth(0.5);
        doc.line(10, 49, 200, 49);

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

        doc.save(`Employee-Attendance-Report_${date}.pdf`);

        // Send email alert to HR manager
        const emailSubject = encodeURIComponent('Employee Attendance Report Generated');
        const emailBody = encodeURIComponent(`Dear Employee Manager,\n\nThe employee attendance report has been generated.\n\nBest regards,\nYour Company`);
        const emailRecipient = encodeURIComponent('employeeManager@example.com');
        const mailtoLink = `mailto:${emailRecipient}?subject=${emailSubject}&body=${emailBody}`;
        
        window.location.href = mailtoLink;
    };

    return (
        <button onClick={generatePDF} className='btn2' style={{ backgroundColor: '#4B9CD3', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            Generate Report
        </button>
    );
};

export default EmployeeAttendanceReport;
