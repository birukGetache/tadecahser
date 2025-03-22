import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles

const CalendarWithEvents = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({}); // Store events by date

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleDayClick = (value) => {
    const dateString = value.toDateString();
    const isHoliday = events[dateString] === 'Holiday';
    const isWorkingDay = events[dateString] === 'Working Day';

    if (isHoliday) {
      // Remove holiday
      setEvents((prevEvents) => {
        const { [dateString]: _, ...rest } = prevEvents;
        return rest;
      });
    } else {
      // Toggle between Working Day and Holiday
      setEvents((prevEvents) => ({
        ...prevEvents,
        [dateString]: isWorkingDay ? 'Holiday' : 'Working Day',
      }));
    }
  };

  // Function to get tile class name based on the event
  const tileClassName = ({ date }) => {
    const dateString = date.toDateString();
    return events[dateString] ? `calendar-tile-${events[dateString].toLowerCase().replace(' ', '-')}` : '';
  };

  return (
    <div style={{ position: 'relative', padding: '20px' }}>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileClassName={tileClassName}
        onClickDay={handleDayClick}
        // Additional props can be added here to customize the calendar
      />
      <div style={{ marginTop: '20px' }}>
        Selected Date: {date.toDateString()}
      </div>
    </div>
  );
};

export default CalendarWithEvents;
