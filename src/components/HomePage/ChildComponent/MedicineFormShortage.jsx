import React, { useState } from 'react';
import MedicineCard from './MedicineCard'; // Import the MedicineCard component

// Define an array of medicine names and quantities
const medicineShortage = [
  { name: 'Aspirin', quantity: 10 },
  { name: 'Paracetamol', quantity: 5 },
  { name: 'Ibuprofen', quantity: 8 },
  { name: 'Amoxicillin', quantity: 12 }
];

const MedicineFormShortage = () => {
  const [selectedMedicineName, setSelectedMedicineName] = useState('');
  const [medicineId, setMedicineID] = useState(0);
  const [medicineGroup, setMedicineGroup] = useState('');
  const [quantity, setQuantity] = useState('');
  const [howToUse, setHowToUse] = useState('');
  const [sideEffects, setSideEffects] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      selectedMedicineName,
      medicineId,
      medicineGroup,
      quantity,
      howToUse,
      sideEffects
    });
  };

  // Sample data for medicine groups
  const groups = ['Generic Medicine', 'Diabetes', 'Heart Health'];

  return (
    <div style={{ display: 'flex', width: '100%', height: '90vh', padding: '20px', boxSizing: 'border-box' }}>
      {/* Form Container */}
      <div style={{ flex: 1, padding: '20px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
          <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "30px", paddingLeft: "10px" }}>
            <label style={{ fontFamily: " 'Kanit', sans-serif", width: "30vw" }}>
              Medicine Name:
              <select
                value={selectedMedicineName}
                onChange={(e) => setSelectedMedicineName(e.target.value)}
                style={{ width: '100%', padding: '16px', borderRadius: '4px', border: '1px solid #ddd' }}
                required
              >
                <option value="">- Select Medicine Name -</option>
                {medicineShortage.map((medicine, index) => (
                  <option key={index} value={medicine.name}>{medicine.name}</option>
                ))}
              </select>
            </label>
            <label style={{ fontFamily: " 'Kanit', sans-serif", width: "30vw" }}>
              Medicine Id:
              <input
                type="number"
                value={medicineId}
                onChange={(e) => setMedicineID(e.target.value)}
                style={{ width: '100%', padding: '16px', borderRadius: '4px', border: '1px solid #ddd' }}
                required
              />
            </label>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "30px", paddingLeft: "10px" }}>
            <label style={{ fontFamily: " 'Kanit', sans-serif", width: "30vw" }}>
              Medicine Group:
              <select
                value={medicineGroup}
                onChange={(e) => setMedicineGroup(e.target.value)}
                style={{ width: '107%', padding: '16px', textAlign: "center", borderRadius: '4px', border: '1px solid #ddd' }}
                required
              >
                <option value="">- Select Medicine Group -</option>
                {groups.map((group, index) => (
                  <option key={index} value={group}>{group}</option>
                ))}
              </select>
            </label>
            <label style={{ fontFamily: " 'Kanit', sans-serif", width: "30vw" }}>
              Quantity:
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ width: '100%', padding: '16px', borderRadius: '4px', border: '1px solid #ddd' }}
                required
              />
            </label>
          </div>
          <label style={{ fontFamily: " 'Kanit', sans-serif" }}>
            How to Use:
            <textarea
              value={howToUse}
              onChange={(e) => setHowToUse(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', height: '90px' }}
            />
          </label>

          <label style={{ fontFamily: " 'Kanit', sans-serif" }}>
            Side Effects:
            <textarea
              value={sideEffects}
              onChange={(e) => setSideEffects(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', height: '90px' }}
            />
          </label>

          <button
            type="submit"
            style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}
          >
            Submit
          </button>
        </form>
      </div>

      {/* Cards Container */}
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {medicineShortage.map((medicine, index) => (
          <MedicineCard
            key={index}
            medicineName={medicine.name}
            quantity={medicine.quantity}
          />
        ))}
      </div>
    </div>
  );
};

export default MedicineFormShortage;
