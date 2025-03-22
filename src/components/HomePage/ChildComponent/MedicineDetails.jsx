import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toggleClicked } from '../../../Reducer/dashboardSlice';
import { setSelectedMedicine } from '../../../Reducer/MedicineSlice';
import { useMediaQuery } from 'react-responsive';
const MedicineDetails = () => {
  const isMediumOrLarger = useMediaQuery({ query: '(min-width: 500px)' });
  const selectedGroupId = useSelector(state => state.slice.selectedGroupId);
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const borderColor = isDarkTheme ? '#555' : '#dedede';
  const selectBorderColor = isDarkTheme ? '#555' : '#ccc';
  const labelColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const [medicines, setMedicines] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(`https://backtade-2.onrender.com/medicinesGroup/${selectedGroupId}`);
        console.log(response.data)
        setMedicines(response.data);
      } catch (error) {
        console.error('Error fetching medicine details:', error);
      }
    };

    if (selectedGroupId) {
      fetchMedicines();
    }
  }, [selectedGroupId]);

  return (
    <div style={{ padding: '20px' , backgroundColor , height:"85vh"}} className='height'>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' , color:textColor }}>Details for Group {selectedGroupId}</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        margin: '0 auto',
        maxWidth: '1200px',
        padding: '20px'
      }} className='auto'>
        {medicines.map(medicine => (
          <div key={medicine._id} style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            transition: 'transform 0.2s',
            padding: '15px',
            margin: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
            <h2 style={{ fontSize: '18px', margin: '0 0 10px 0', color: '#333' }}>Medicine Name :{medicine.medicineName}</h2>
            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 10px 0' }}>Medicine Discription: {medicine.medicineDescription}</p>
            <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>Group: {medicine.medicineGroup}</p>
            <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>ID: {medicine.medicineId}</p>
            <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>Price: {medicine.price}</p>
            <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>Quantity: {medicine.quantity}</p>
            <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>Size: {medicine.singleSize}</p>
            <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>Sold In: {medicine.soldIn}</p>
            <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>Strip per Pack: {medicine.stripPerPk}</p>
            <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>Unit: {medicine.unit}</p>
            { isMediumOrLarger && <button style={{
  backgroundColor: '#007bff',   // Background color
  color: '#fff',                 // Text color
  border: 'none',                // No border
  borderRadius: '4px',           // Rounded corners
  padding: '10px 20px',          // Vertical and horizontal padding
  fontSize: '16px',              // Font size
  cursor: 'pointer',             // Pointer cursor on hover
  transition: 'background-color 0.3s ease, transform 0.3s ease', // Smooth transitions
  margin: '5px',                 // Margin around the button
  display: 'inline-block',       // Inline-block display
  textAlign: 'center',           // Center text alignment
  textDecoration: 'none',        // Remove underline if it's a link
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
  outline: 'none'                // Remove default outline
}} onClick={() =>     {dispatch(setSelectedMedicine(medicine))
  dispatch(toggleClicked(28));
}}>
  Sold
</button>}

          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineDetails;
