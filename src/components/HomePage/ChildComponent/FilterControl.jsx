import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaSort, FaChartLine, FaArrowDown, FaArrowUp , FaCaretLeft } from 'react-icons/fa';
import axios from 'axios';

const FilterControls = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [averageSales, setAverageSales] = useState(0);
  const [salesTrend, setSalesTrend] = useState(null); // New state for trend

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backtade-2.onrender.com/api/transactions');
        const sortedData = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setTransactions(sortedData);
        console.log(sortedData);
        calculateSales(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateSales = (data) => {
    const total = data.reduce((acc, transaction) => acc + transaction.totalAmount, 0);
    console.log(total);
    const average = total / data.length || 0; // Avoid division by zero
    setTotalSales(total);
    setAverageSales(average);

    // Use the last two transactions to determine trend
    if (data.length < 2) {
      setSalesTrend(null); // Not enough data to determine trend
    } else {
      const lastTransaction = data[data.length - 1].totalAmount;
      const secondLastTransaction = data[data.length - 2].totalAmount;

      if (lastTransaction > secondLastTransaction) {
        setSalesTrend('up'); // Sales are going up
      } else if (lastTransaction < secondLastTransaction) {
        setSalesTrend('down'); // Sales are going down
      } else {
        setSalesTrend('stable'); // Sales are stable
      }
    }
  };

  // Format date to "Day Month Year" format
  const formatDate = (date) => {
    if (!date) return '';
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <>
      <div style={{ width: "70vw", display: "flex", justifyContent: "space-between", height: "10vh" }} className='splitwithmargin'>
        <div style={{ display: 'grid', marginRight: '20px', height: "fit-content", padding: "4px", borderRadius: "10px", fontSize: "30px", backgroundColor: "#ccc" }} className='one'>
          <label htmlFor="startDate" style={{ marginRight: '10px', margin: "0", padding: "0", fontFamily: '"DM Sans", sans-serif', textAlign: "center", border: "none", color: "#333" }}>Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select Start Date"
            dateFormat="dd MMMM yyyy"
            customInput={
              <input
                value={formatDate(startDate)}
                onClick={(e) => e.stopPropagation()}
                style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ddd', cursor: 'pointer' }}
              />
            }
          />
        </div>

        <div style={{ display: 'grid', marginRight: '20px', height: "fit-content", padding: "4px", borderRadius: "10px", fontSize: "30px", backgroundColor: "#ccc" }} className='one'>
          <p style={{ marginRight: '10px', fontFamily: '"DM Sans", sans-serif', textAlign: "center", border: "none", color: "#333", margin: "0" }}>
            <FaChartLine color='green' size={25} /> Sales Status
          </p>
          {salesTrend === 'down' && (
            <p style={{ fontFamily: '"DM Sans", sans-serif', marginTop: "-20px", fontSize: "20px", margin: "0", color: "black" }}>
              <FaArrowDown color='red' /> Downward Going
            </p>
          )}
          {salesTrend === 'up' && (
            <p style={{ fontFamily: '"DM Sans", sans-serif', marginTop: "-20px", fontSize: "20px", margin: "0", color: "black" }}>
              <FaArrowUp color='green' /> Up Going
            </p>
          )}
          {salesTrend === 'stable' && (
            <p style={{ fontFamily: '"DM Sans", sans-serif', marginTop: "-20px", fontSize: "20px", margin: "0", color: "black" }}>
              <span>🚦</span> Sales Stable
            </p>
          )}
        </div>

        <div style={{ display: 'grid', marginRight: '20px', height: "fit-content", padding: "4px", borderRadius: "10px", fontSize: "30px", backgroundColor: "#ccc" }} className='one'>
          <p style={{ marginRight: '10px', fontFamily: '"DM Sans", sans-serif', textAlign: "center", border: "none", color: "#333", margin: "0" }}>
            <FaSort color='green' size={25} /> Total Sales: {totalSales.toFixed(2)} Birr
          </p>
          <p style={{ fontFamily: '"DM Sans", sans-serif', marginTop: "-20px", fontSize: "20px", background: "transparent", margin: "0", color: "black" }}>
            <FaCaretLeft color='gray' /> Average Sale: {averageSales.toFixed(2)} Birr
          </p>
        </div>
      </div>
    </>
  );
};

export default FilterControls;