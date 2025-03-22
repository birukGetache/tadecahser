import React, { useRef, useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from 'react-redux';
const OrderList = () => {
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const borderColor = isDarkTheme ? '#555' : '#dedede';
  const selectBorderColor = isDarkTheme ? '#555' : '#ccc';
  const labelColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const containerRef = useRef(null);
  const [orders, setOrders] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;  // Number of items to display and scroll by

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://backtade-2.onrender.com/api/transactions'); // Adjust the URL as needed
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleScrollDown = () => {
    if (startIndex + itemsPerPage < orders.length) {
      setStartIndex(startIndex + itemsPerPage);
      if (containerRef.current) {
        containerRef.current.scrollTop += containerRef.current.clientHeight / itemsPerPage;
      }
    }
  };

  const handleScrollUp = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
      if (containerRef.current) {
        containerRef.current.scrollTop -= containerRef.current.clientHeight / itemsPerPage;
      }
    }
  };

  // Calculate visible orders based on startIndex and itemsPerPage
  const visibleOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', overflowY: "auto", height: "60vh" }} className='orderContainer'>
      <h2 style={{ fontFamily: '"DM Sans", sans-serif', textAlign: "center", border: "none", color: textColor }}>Order List</h2>
      <div ref={containerRef} style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd' }} className='order'>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'center', fontFamily: '"DM Sans", sans-serif', border: "none", color:textColor }}>Order ID</th>
              <th style={{ borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'center', fontFamily: '"DM Sans", sans-serif', border: "none", color:textColor}}>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {visibleOrders.map((order, index) => (
              <tr key={order._id}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontFamily: '"DM Sans", sans-serif', textAlign: "center", border: "none",color:textColor }}>{order._id}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontFamily: '"DM Sans", sans-serif', textAlign: "center", border: "none", color:textColor }}>{new Date(order.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <button onClick={handleScrollUp} disabled={startIndex === 0} style={{ border: "none", color: "green", fontFamily: '"DM Sans", sans-serif', textAlign: "center", cursor: "pointer" }}>
          <FaArrowUp /> Scroll Up
        </button>
        <button onClick={handleScrollDown} disabled={startIndex + itemsPerPage >= orders.length} style={{ border: "none", color: "green", fontFamily: '"DM Sans", sans-serif', textAlign: "center", cursor: "pointer" }}>
          <FaArrowDown /> Scroll Down
        </button>
      </div>
    </div>
  );
};

export default OrderList;
