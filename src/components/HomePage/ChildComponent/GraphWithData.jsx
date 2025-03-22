import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import OrderList from './OrderList';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Register necessary components for Chart.js
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// Create a plugin to add a blue halo effect
const glowPlugin = {
  id: 'glowPlugin',
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
    const meta = chart.getDatasetMeta(0);
    const line = meta.data.map(point => ({
      x: point.x,
      y: point.y,
    }));

    ctx.save();
    ctx.shadowColor = 'rgba(0, 123, 255, 1)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 15;

    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(0, 123, 255, 0.5)';
    ctx.beginPath();
    line.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();
    ctx.restore();
  },
};

const GraphWithData = () => {
 
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backtade-2.onrender.com/api/transactions');
        const transactions = response.data;
        if (!Array.isArray(transactions)) {
          throw new Error('Expected transactions to be an array');
        }

        // Prepare data for the chart
        const labels = transactions.map(transaction => new Date(transaction.date).toLocaleDateString());
        const salesData = transactions.map(transaction => transaction.soldQuantity);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Sales',
              data: salesData,
              borderColor: '#007bff',
              backgroundColor: 'rgba(0, 123, 255, 0.2)',
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Value: ${tooltipItem.raw}`;
          },
        },
      },
      glowPlugin,
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
      },
      y: {
        grid: { display: false },
        border: { display: false },
      },
    },
    elements: {
      line: { borderWidth: 2 },
    },
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', padding: '20px', boxSizing: 'border-box', height: '30vh' , }} className='split'>
      <div style={{ width: '100%', height: 'fit-content', maxWidth: '600px', margin: '0 auto', backgroundColor: "white", borderRadius: "10px" }}>
        <Line data={chartData} options={options} />
      </div>
      <OrderList />
    </div>
  );
};

export default GraphWithData;
