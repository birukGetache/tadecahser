import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Table, Input, Select, DatePicker, Space } from 'antd';
import { FaPills, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import dayjs from 'dayjs';
import EllipsisMenu2 from './EllipsisMenu2';

const { Option } = Select;

const PaymentReport = () => {
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ Method: '', name: '', date: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backtade-2.onrender.com/api/transactions');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredData = data.filter((item) => {
    const nameMatch = filters.name ? item.medicineName.toLowerCase().includes(filters.name.toLowerCase()) : true;
    const MethodMatch = filters.Method ? item.Method === filters.Method : true;
    const dateMatch = filters.date ? new Date(item.date).toLocaleDateString() === new Date(filters.date).toLocaleDateString() : true;
    return nameMatch && MethodMatch && dateMatch;
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'medicineName',
      key: 'medicineName',
      sorter: true,
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: true,
      render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: true,
      render: (price) => <span>{price.toFixed(2)} Birr</span>,
    },
    {
      title: 'Sold Quantity',
      dataIndex: 'soldQuantity',
      key: 'soldQuantity',
      sorter: true,
    },
    {
      title: 'Total',
      key: 'total',
      render: (_, record) => <span>{(record.price * record.soldQuantity).toFixed(2)} Birr</span>,
    },
    {
      title: 'Method',
      dataIndex: 'Method',
      key: 'Method',
      sorter: true,
    },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor, color: textColor }} className='newTable'>
      <h2 style={{ textAlign: 'center', color: textColor }}>Payment Report</h2>

      <Space style={{ marginBottom: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }} className='split'>
        <div>
          <FaPills style={{ marginRight: '8px' }} />
          <Input
            placeholder="Search by Medicine Name"
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
            style={{ width: 200 }}
          />
        </div>
        <div>
          <FaCalendarAlt style={{ marginRight: '8px' }} />
          <DatePicker
            value={filters.date ? dayjs(filters.date) : null}
            onChange={(date) => handleFilterChange('date', date ? date.format('YYYY-MM-DD') : null)}
            style={{ width: 200 }}
            placeholder="Search by Date"
          />
        </div>
        <div>
          <FaDollarSign style={{ marginRight: '8px' }} />
          <Select
            placeholder="Select Payment Method"
            value={filters.Method}
            onChange={(value) => handleFilterChange('Method', value)}
            style={{ width: 200 }}
          >
            <Option value="">All</Option>
            <Option value="Credit Card">Credit Card</Option>
            <Option value="Cash">Cash</Option>
            <Option value="Debit Card">Debit Card</Option>
          </Select>
        </div>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey={(record) => record._id}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          current: 1,
          total: filteredData.length,
        }}
        style={{ overflowX: 'auto', backgroundColor: "white" }}
      />

      {/* Pass the filtered data to EllipsisMenu2 */}
  <div style={{display:"flex" , width:"100%" , justifyContent:"center"}}> <EllipsisMenu2 data={filteredData} /></div>   
    </div>
  );
};

export default PaymentReport;
