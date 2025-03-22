import React, { useState } from 'react';
import { FaFilePdf, FaFileImage, FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { toggleClicked } from '../../../Reducer/dashboardSlice.js';
import { useDispatch } from 'react-redux';
const EllipsisMenu = ({ data }) => {
  const dispatch = useDispatch();


  const [isOpen, setIsOpen] = useState(false);

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
        onClick={() =>  dispatch(toggleClicked(10))}
        style={{
          marginTop: "30px",
          background: '#808b96',
          border: 'none',
          cursor: 'pointer',
          color: 'white',
          fontSize: '16px',
          padding: '10px',
          borderRadius: '4px',
          fontFamily: '"DM Sans", sans-serif',
        }}
        className='buttom'
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
          <li onClick={() =>   dispatch(toggleClicked(10))} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '10px' }}>
            <FaFilePdf style={{ marginRight: '10px', color: 'red' }} /> PDF
          </li>
          <li onClick={() => console.log('SVG clicked')} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '10px' }}>
            <FaFileImage style={{ marginRight: '10px' }} /> SVG
          </li>
          <li onClick={downloadExcel} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '10px' }}>
            <FaFileExcel style={{ marginRight: '10px', color: 'green' }} /> Excel
          </li>
        </ul>
      )}
    </div>
  );
};

export default EllipsisMenu;
