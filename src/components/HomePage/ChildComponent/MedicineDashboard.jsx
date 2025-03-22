import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import {Card  , Button} from 'antd'
import axios from 'axios';
import { Modal as AntdModal, notification} from 'antd';
import './MedicineDashboard.css'; // Custom styles for table
import { useSelector } from 'react-redux';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
const MedicineDashboard = () => {
  const [medicineData, setMedicineData] = useState([]);
  const [statusMessage, setStatusMessage] = useState('Pharmacy Status: Good');
  const [page, setPage] = useState(0);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [quantitySearchTerm, setQuantitySearchTerm] = useState('');
  const [descriptionSearchTerm, setDescriptionSearchTerm] = useState('');
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const borderColor = isDarkTheme ? '#555' : '#dedede';
  const selectBorderColor = isDarkTheme ? '#555' : '#ccc';
  const labelColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const itemsPerPage = 6;
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger re-fetch
  // Fetch medicines from the backend
  const handleDelete = (medicineId) => {
    AntdModal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this item?',
      onOk: async () => {
        try {
          await axios.delete(`https://backtade-2.onrender.com/medicines/${medicineId}`);
          setRefreshKey(prevKey => prevKey + 1);// Update data after deletion
          notification.success({
            message: 'Deletion Successful',
            description: 'The item has been successfully deleted.',
          });
        } catch (error) {
          console.error('Error deleting medicine:', error);
          notification.error({
            message: 'Deletion Failed',
            description: 'There was an error deleting the item. Please try again later.',
          });
        }
      },
    });
  };
  const fetchMedicines = async () => {
    try {
      const response = await axios.get('https://backtade-2.onrender.com/medicines');
      const datas = response.data;

      const res = await axios.get('https://backtade-2.onrender.com/mark');
      const r = res.data;

      console.log("Response from /mark: ", r);

      // Filter out items in datas that are not found in r
      const filteredData = datas.filter(dataItem => {
          return !r.some(markItem => markItem.medicineId === dataItem.medicineId);
      });

      setMedicineData(filteredData); // Update state with filtered data

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
useEffect(() => {
  fetchMedicines();
}, [refreshKey]);

  // Update status based on medicine data
  const updateStatus = (data) => {
    const warningQuantityThreshold = 15;
    const warningExpiryDays = 5;
    const now = new Date();

    const lowQuantityMedicines = data.filter(med => med.quantity < warningQuantityThreshold);
    const warningQuantityMedicines = lowQuantityMedicines.length >= 5;

    const nearExpiryMedicines = data.filter(med => {
      const expiryDate = new Date(med.expirationDate);
      console.log(expiryDate)
      const daysToExpire = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
      console.log(daysToExpire)
      return daysToExpire <= warningExpiryDays;
    });
    const warningExpiryMedicines = nearExpiryMedicines.length >= 20;

    let statusMessage = 'Pharmacy Status: Good';
    if (warningQuantityMedicines) {
      statusMessage = 'Warning: Quantity of some medicines is low.';
    }
    if (warningExpiryMedicines) {
      statusMessage = 'Warning: Many medicines are near expiry.';
    }
    if (warningQuantityMedicines && warningExpiryMedicines) {
      statusMessage = 'Warning: Medicines are both low in quantity and near expiry.';
    }

    setStatusMessage(statusMessage);
  };

  // Get current page data
  const getCurrentPageData = () => {
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredMedicines.slice(start, end);
  };

  // Paginate data
  const handleNextPage = () => {
    if ((page + 1) * itemsPerPage < filteredMedicines.length) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const filteredMedicines = medicineData.filter(med => {
    const nameMatch = med.medicineName.toLowerCase().includes(searchTerm.toLowerCase());
    const quantityMatch = quantitySearchTerm ? med.quantity <= parseInt(quantitySearchTerm, 10) : true;
    const descriptionMatch = (med.medicineDescription?.toLowerCase() || '').includes(descriptionSearchTerm.toLowerCase());

    return nameMatch && quantityMatch && descriptionMatch;
  });

  // Handle mark Button click
  const handleMark = async (medicine) => {
    try {
      // Send selected medicine data to the backend
      await axios.post('https://backtade-2.onrender.com/mark', { medicine });
      alert(`${medicine.medicineName} marked successfully!`);
      setRefreshKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error('Error marking medicine:', error);
      alert('Error marking medicine');
    }
  };

  // Chart data
  const labels = getCurrentPageData().map(med => med.medicineName);
  const quantities = getCurrentPageData().map(med => med.quantity);
  const backgroundColors = quantities.map(quantity => quantity < 15 ? 'red' : 'green');

  const data = {
    labels,
    datasets: [
      {
        label: 'Medicine Quantity',
        data: quantities,
        backgroundColor: backgroundColors,
        borderColor: 'black',
        borderWidth: 1,
      }
    ]
  };

  // Filter expired medicines
  const expiredMedicines = medicineData.filter(med => {
    const expiryDate = new Date(med.expirationDate);
    return expiryDate < new Date(); // Compare with current date
  });
console.log(expiredMedicines)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height:"89vh" , boxSizing:"border-box", overflowY: 'auto', justifyContent: 'space-between', padding: '20px', backgroundColor }} className='name3'>
      {/* Graph Container */}
      <div style={{ padding: '20px', height: '60vh' }} className='medicineDashboard'>
        <h2 style={{ fontFamily:' "DM Sans", sans-serif',textAlign:"center" , color:textColor}}>Medicine Graph</h2>
        <div style={{ height: '100%' }} className='barcontainer'>
          <Bar
            data={data}
            options={{
              indexAxis: 'x', // Vertical bar chart (medicine names on x-axis)
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
          <div style={{ marginTop: '10px' }}>
            <div style={{display:"flex" , justifyContent:"space-between" , paddingLeft:"10px", paddingRight:"10px"}}>
                <Button onClick={handlePrevPage} disabled={page === 0} style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center", border:"none" , textUnderlineOffset:"2px" , color:"Green" , backfaceVisibility:"visible", backgroundColor:"lightblue" , borderRadius:"10px"}}>Previous</Button> 
                <Button  onClick={handleNextPage} disabled={(page + 1) * itemsPerPage >= filteredMedicines.length} style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center", border:"none" , color:"#333" , backgroundColor:"lightblue" , borderRadius:"10px" , color:"Green" }}>Next</Button>
                </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div style={{ padding: '20px', height: '75vh', overflowY: 'auto'  }} className='table'>
        <h2 style={{ fontFamily:' "DM Sans", sans-serif',textAlign:"center" , color:textColor}}>Medicine Table</h2>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{width:"150px" , height:"20px" , borderRadius:"10px" , fontFamily:' "DM Sans", sans-serif',textAlign:"center", border:"1px solid black" , margin:"7px"}}
        />
        <input
          type="number"
          placeholder="Search by max quantity..."
          value={quantitySearchTerm}
          onChange={(e) => setQuantitySearchTerm(e.target.value)}
          style={{width:"150px" , height:"20px" , borderRadius:"10px" , fontFamily:' "DM Sans", sans-serif',textAlign:"center", border:"1px solid black" , margin:"7px"}}
        />
        <input
          type="text"
          placeholder="Search by description..."
          value={descriptionSearchTerm}
          onChange={(e) => setDescriptionSearchTerm(e.target.value)}
          style={{width:"150px" , height:"20px" , borderRadius:"10px" , fontFamily:' "DM Sans", sans-serif',textAlign:"center", border:"1px solid black" , margin:"7px"}}
        />
        <div className='medicineTable'>
        <table className="medicine-table">
          <thead>
            <tr>
              <th style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>Name</th>
              <th  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>Quantity</th>
              <th  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>Expire Date</th>
              <th  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>Medicine Description</th>
              <th  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageData().map((med, index) => (
              <tr key={index}>
                <td  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>{med.medicineName}</td>
                <td  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>{med.quantity}</td>
                <td  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>{med.expirationDate}</td>
                <td  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>{med.medicineDescription}</td>
                <td  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>
                  <Button onClick={() => handleMark(med)}  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center", border:"none" , color:"#333"}}>Mark</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Expired Medicines Section */}
      <div style={{ padding: '20px', width: '100%', marginTop: '20px' }}>
        <h2  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",color:textColor}}>Expired Medicines</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {expiredMedicines.length > 0 ? (
            expiredMedicines.map((med, index) => (
              <Card key={index} className="medicine-card" style={{border:"2px solid #ccc " , borderRadius:"5px"}}>
                <h3  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>{med.medicineName}</h3>
                <p  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>Quantity: {med.quantity}</p>
                <p  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>Expire Date: {med.expireDate}</p>
                <p  style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center",}}>Description: {med.medicineDescription || 'No Description'}</p>
                <div style={{display:"flex" , justifyContent:"space-between" , paddingLeft:"10px", paddingRight:"10px"}}>
                <Button style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center", border:"none" , color:"red"}}   onClick={() => handleDelete(med.medicineId)}>Delete</Button> 
                <Button style={{fontFamily:' "DM Sans", sans-serif',textAlign:"center", border:"none" , color:"#333"}} onClick={() => handleMark({...med ,Why:"Expired"})}>Mark</Button>
                </div>
              </Card>
            ))
          ) : (
            <p>No expired medicines found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineDashboard;
