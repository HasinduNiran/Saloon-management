import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const StoreReport = ({ filteredStores }) => {
    const generatePDF = () => {
        const doc = new jsPDF();
        const tableColumn = [
            "No",
            "Item No",
            "Item Name",
            "Description",
            "Quantity",
            "Cost",
            "Selling Price"
        ];
        const tableRows = [];

        filteredStores.forEach((store, index) => {
            const data = [
                index + 1,
                store.ItemNo,
                store.ItemName,
                store.Description,
                store.Quantity,
                store.cost,
                store.SPrice
            ];
            tableRows.push(data);
        });

        const date = new Date().toLocaleDateString();

        // PDF Header
        doc.setFontSize(24).setFont("helvetica", "bold").setTextColor("#4B9CD3");
        doc.text("Saloon Management", 105, 15, { align: "center" });

        doc.setFont("helvetica", "normal").setFontSize(18).setTextColor("#333");
        doc.text("Store Details Report", 105, 25, { align: "center" });

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
                halign: 'center'
            },
            alternateRowStyles: {
                fillColor: [230, 230, 230]
            },
            margin: { top: 60 }
        });

        // Save PDF
        doc.save(`Store-Details-Report_${date}.pdf`);

        // Send email alert to Store manager
        const emailSubject = encodeURIComponent('Store Report Generated');
        const emailBody = encodeURIComponent(`Dear Store Manager,\n\nThe Store report has been generated.\n\nBest regards,\nYour Company`);
        const emailRecipient = encodeURIComponent('storemanager@gmail.com');
        const mailtoLink = `mailto:${emailRecipient}?subject=${emailSubject}&body=${emailBody}`;
        
        window.location.href = mailtoLink;
    };

    return (
        <button onClick={generatePDF} className='btn2' style={{ backgroundColor: '#4B9CD3', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            Generate Store Report
        </button>
    );
};

export default StoreReport;
