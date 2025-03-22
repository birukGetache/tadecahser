import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';

const UserForm = () => {
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (values) => {
    try {
      await axios.post('https://backtade-2.onrender.com/users', values);
      toast.success('User saved successfully!');
      handleClear();
    } catch (error) {
      toast.error('Error saving user. Please try again.');
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      phone: '',
      address: '',
      email: '',
    });
  };

  return (
    <div>
      <h3 style={{ color: textColor }}>User Management</h3>
      <p style={{ color: textColor }}>Manage user roles and permissions here.</p>

      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Name" required>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
          />
        </Form.Item>

        <Form.Item label="Phone Number" required>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Phone Number"
          />
        </Form.Item>

        <Form.Item label="Address" required>
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Address"
          />
        </Form.Item>

        <Form.Item label="Email" required>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="default" onClick={handleClear} style={{ marginLeft: '10px' }}>
            Clear
          </Button>
        </Form.Item>
      </Form>

      <ToastContainer />
    </div>
  );
};

export default UserForm;
