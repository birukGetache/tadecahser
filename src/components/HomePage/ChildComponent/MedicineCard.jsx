import React from 'react';

const MedicineCard = ({ medicineName, quantity }) => {
  return (
    <div style={{
      padding: '10px', margin: '10px', borderRadius: '4px', border: '1px solid #ddd',
      backgroundColor: '#f9f9f9', boxShadow: '0 0 5px rgba(0,0,0,0.1)'
    }}>
      <h4 style={{ margin: '0 0 10px 0' }}>{medicineName}</h4>
      <p style={{ margin: '0' }}>Quantity: {quantity}</p>
    </div>
  );
};

export default MedicineCard;
