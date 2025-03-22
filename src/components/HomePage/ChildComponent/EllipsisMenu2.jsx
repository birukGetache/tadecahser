import React, { useState } from 'react';
import { FaFilePdf, FaFileImage, FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useDispatch } from 'react-redux';
import { toggleClicked } from '../../../Reducer/dashboardSlice.js';

const EllipsisMenu2 = ({ data }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // Function to download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Name', 'Date', 'Price', 'Sold Quantity', 'Total', 'Method']],
      body: data.map(item => [
        item.medicineName,
        new Date(item.date).toLocaleDateString(),
        item.price,
        item.soldQuantity,
        (item.price * item.soldQuantity).toFixed(2),
        item.method,
      ]),
    });
    doc.save('payment_report.pdf');
  };

  // Function to download Excel
  const downloadExcel = () => {
    if (!Array.isArray(data) || data.length === 0) {
      alert('No data available to download');
      return;
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payments");
    XLSX.writeFile(wb, "payment_report.xlsx");
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          marginTop: "30px",
          background: '#1a222b',
          border: 'none',
          cursor: 'pointer',
          color: 'white',
          fontSize: '16px',
          padding: '10px',
          borderRadius: '4px',
          fontFamily: '"DM Sans", sans-serif',
        }}
      >
        Download
      </button>

      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            width: '150px',
            right: 0,
            padding: '10px',
            margin: 0,
            backgroundColor: 'white',
            border: '1px solid white',
            borderRadius: '4px',
            listStyleType: 'none',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}
        >
          <li onClick={downloadPDF} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '10px' }}>
            <FaFilePdf style={{ marginRight: '10px', color: 'red' }} /> PDF
          </li>
          <li onClick={downloadExcel} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '10px' }}>
            <FaFileExcel style={{ marginRight: '10px', color: 'green' }} /> Excel
          </li>
        </ul>
      )}
    </div>
  );
};

export default EllipsisMenu2;
