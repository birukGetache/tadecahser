import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import default styles

const RevenueCalendar = ({ setDates }) => {
  const [date, setDate] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDateChange = (newDate) => {
    if (newDate.getTime() !== date.getTime()) { // Only update if date is different
      setDate(newDate);
      console.log(newDate)
      setDates(newDate); // Pass the selected date to parent
    }
    setIsDropdownOpen(false); // Close the dropdown after selecting a date
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const formattedDate = date.toDateString(); // Format the date for the input field

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <input
        type="text"
        value={formattedDate}
        onClick={toggleDropdown}
        readOnly
        style={inputStyle}
      />
      {isDropdownOpen && (
        <div style={dropdownStyle}>
          <DatePicker
            selected={date}
            onChange={handleDateChange}
            inline // Inline calendar
          />
        </div>
      )}
    </div>
  );
};

// Inline styles for simplicity
const inputStyle = {
  padding: '5px 10px',
  fontSize: '12px',
  cursor: 'pointer',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '5px',
  marginBottom: '10px',
  marginTop: '15px',
  width: '100px',
};

const dropdownStyle = {
  position: 'absolute',
  top: '100%',
  right: '0',
  padding: '20px',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '5px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  zIndex: 1000,
  width: 'fit-content',
};

export default RevenueCalendar;
