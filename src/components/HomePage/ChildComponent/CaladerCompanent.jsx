import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div>
      <h1>Current Date</h1>
      <p>{format(date, 'MMMM d, yyyy')}</p>
      <button onClick={toggleCalendar}>
        {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
      </button>
      {showCalendar && (
        <Calendar
          onChange={handleDateChange}
          value={date}
        />
      )}
    </div>
  );
};

export default CalendarComponent;
