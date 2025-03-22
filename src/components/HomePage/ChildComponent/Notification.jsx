import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Table, Button, Input, Modal } from 'antd';

const CalendarWithEvents = () => {
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleDayClick = (value) => {
    const dateString = value.toDateString();
    const isHoliday = events[dateString] === 'Holiday';
    const isWorkingDay = events[dateString] === 'Working Day';

    if (isHoliday) {
      setEvents((prevEvents) => {
        const { [dateString]: _, ...rest } = prevEvents;
        return rest;
      });
    } else {
      setEvents((prevEvents) => ({
        ...prevEvents,
        [dateString]: isWorkingDay ? 'Holiday' : 'Working Day',
      }));
    }
  };

  const tileClassName = ({ date }) => {
    const dateString = date.toDateString();
    return events[dateString] ? `calendar-tile-${events[dateString].toLowerCase().replace(' ', '-')}` : '';
  };

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('https://backtade-2.onrender.com/medicines');
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  const handleDelete = (medicineId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this medicine?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await axios.delete(`https://backtade-2.onrender.com/medicines/${medicineId}`);
          fetchMedicines(); // Refresh the medicine list after deletion
        } catch (error) {
          console.error('Error deleting medicine:', error);
        }
      },
    });
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'medicineName',
      key: 'medicineName',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Expire Date',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="danger" onClick={() => handleDelete(record.medicineId)}>Delete</Button>
      ),
    },
  ];

  const filteredMedicines = medicines.filter(medicine =>
    medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ position: 'relative', height:"89vh" , boxSizing:"border-box", backgroundColor , padding:"20px" , boxSizing:"border-box", overflow:"auto" }} className='notification'>

      {/* Search Input */}
      <Input
        placeholder="Search Medicines"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ fontFamily: '"DM Sans", sans-serif', color: textColor }}
      />

      {/* Medicines Table */}
      <h2 style={{ color: textColor ,  fontFamily: '"DM Sans", sans-serif', color: textColor  , textAlign:"center"}}>Medicines</h2>
      
      <Table
        columns={columns}
        dataSource={filteredMedicines}
        rowKey="medicineId"
        pagination={false}
        style={{ backgroundColor }}
        className='table'
      />
      
      {/* Notify analysis time if the selected date is 10 */}
      {date.getDate() === 6 && (
        <div style={{ color: 'red', marginTop: '20px' , fontFamily: '"DM Sans", sans-serif' }}>
          Please note: Analysis time is required on the 10th of each month.
        </div>
      )}
    </div>
  );
};

export default CalendarWithEvents;
