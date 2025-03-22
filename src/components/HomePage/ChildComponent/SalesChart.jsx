import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const SalesChart = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [todaySales, setTodaySales] = useState([]);

  // Fetch all sales data
  const fetchAllSalesData = async () => {
    try {
      const response = await axios.get('https://backtade-2.onrender.com/sales'); // No date filter
      setData(response.data);
      filterTodaySales(response.data); // Filter for today's sales on initial fetch
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  // Filter sales data for today
  const filterTodaySales = (salesData) => {
    const filtered = salesData.filter(sale => sale.todaySales > 0); // Only include pharmacists with sales today

    setTodaySales(filtered);
  };

  useEffect(() => {
    fetchAllSalesData();
  }, []); // Fetch all sales data on mount

  useEffect(() => {
    if (data.length > 0) {
      filterTodaySales(data); // Update today's sales when data changes
    }
  }, [selectedDate, data]); // Filter when selected date changes

  return (
    <div style={{fontFamily: '"DM Sans", sans-serif' , textAlign:"center"}}>
      <h2 style={{fontFamily: '"DM Sans", sans-serif' , textAlign:"center"}}>Sales Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="pharmacist" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSales" fill="#8884d8" name="Total Sold Quantity" />
        </BarChart>
      </ResponsiveContainer>

      {/* Display today's sales below the chart */}
      <div style={{ marginTop: '20px' }}>
        <h3>Today's Sales by Pharmacist:</h3>
        {todaySales.length > 0 ? (
          <ul style={{display:"grid" , gridTemplateColumns:"1fr 1fr 1fr 1fr" , justifyContent:"space-between"}}>
            {todaySales.map((sale, index) => (
              <li key={index} style={{listStyle:"none"}}>
              <div style={{padding:"20px", background:"#ccc" , width:"fit-content" , borderRadius:"5px"}}> <span>Pharamacist &nbsp;</span> <span style={{fontWeight:"bold"}}>{sale.pharmacist}</span> <br></br> {sale.todaySales} sold</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No sales today.</p>
        )}
      </div>
    </div>
  );
};

export default SalesChart;
