import React, { useState } from 'react';

// Component to handle individual medicine details
const MedicineItem = ({ medicine }) => (
  <div style={{ marginBottom: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
    <h3 style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center", border:"none" , color:"#333"}}>{medicine.name}</h3>
    <p><strong>Quantity:</strong> {medicine.quantity}</p>
    <p><strong>Price:</strong> ${medicine.price.toFixed(2)}</p>
  </div>
);

// Component to handle medicine group
const MedicineGroup = () => {

  return (
    <div style={{ padding: '20px' , height:"85vh" , overflowY:"auto" , height:"89vh" , boxSizing:"border-box"}}>
      <h1 style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center", border:"none" , color:"#333"}}>Medicine Group</h1>
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2>Group Name: Pain Relief Medications</h2>
        {medicines.length > 0 ? (
          medicines.map((medicine, index) => (
            <MedicineItem key={index} medicine={medicine} />
          ))
        ) : (
          <p>No medicines available.</p>
        )}
      </div>
    </div>
  );
};

export default MedicineGroup;
