import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Modal, Form, Tabs, notification } from 'antd';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;

const CustomerPage = () => {
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', dateTime: '', purchases: [] });
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    fetch('https://backtade-2.onrender.com/api/customers')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleAddCustomer = () => {
    fetch('https://backtade-2.onrender.com/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCustomer),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(newCustomerData => {
        // Append the new customer
        setData([...data, newCustomerData]);
        setNewCustomer({ name: '', email: '', phone: '', dateTime: '', purchases: [] });
        notification.success({ message: 'Customer added successfully!' });
      })
      .catch(error => {
        console.error('Error adding customer:', error);
        notification.error({ message: 'Error adding customer', description: error.message });
      });
  };

 const handleDeleteCustomer = (id, dateTime = null) => {
  const url = `https://backtade-2.onrender.com/api/customers${dateTime ? '' : '/' + id}`;

  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    ...(dateTime && { body: JSON.stringify({ time: dateTime }) }) // Only add body if dateTime is provided
  };

  fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(message => {
      if (dateTime) {
        // Handle purchase deletion
        setData(data.map(customer => {
          if (customer.phone === id) {
            return { ...customer, purchases: customer.purchases.filter(purchase => purchase.time !== dateTime) };
          }
          return customer;
        }));
        notification.success({ message });
      } else {
        // Handle customer deletion
        setData(data.filter(customer => customer.phone !== id));
        notification.success({ message:"Item Deleted Succefully" });
      }
    })
    .catch(error => {
      console.error('Error deleting:', error);
      notification.error({ message: 'Error deleting', description: error.message });
    });
};


  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    fetch(`https://backtade-2.onrender.com/api/customers/${editingCustomer.phone}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingCustomer),
    })
      .then(response => response.json())
      .then(updatedCustomer => {
        setData(data.map(customer => customer.phone === updatedCustomer.phone ? updatedCustomer : customer));
        setEditModalVisible(false);
        notification.success({ message: 'Customer updated successfully!' });
      })
      .catch(error => {
        console.error('Error updating customer:', error);
        notification.error({ message: 'Error updating customer', description: error.message });
      });
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.dateTime.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', backgroundColor: isDarkTheme ? '#2c3e50' : '#edf1f5' }} className='customerPage'>
      <h1 style={{ color: textColor }}>Customer Management</h1>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Customer Data" key="1">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginBottom: '20px' }}
          />
          
          <Table
            dataSource={filteredData}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
            className='customer'
          >
            <Table.Column title="Name" dataIndex="name" key="name" />
            <Table.Column title="Email" dataIndex="email" key="email" />
            <Table.Column title="Phone" dataIndex="phone" key="phone" />
            <Table.Column title="DateTime" dataIndex="dateTime" key="dateTime" />
            <Table.Column
              title="Actions"
              key="actions"
              render={(text, record) => (
                <>
                  <Button onClick={() => handleEditCustomer(record)} icon={<FaEdit />} />
                  <Button onClick={() => handleDeleteCustomer(record.phone)} icon={<FaTrash />} style={{ marginLeft: '10px' }} />
                </>
              )}
            />
          </Table>
        </TabPane>
        
        <TabPane tab="Add Customer" key="2">
          <Form layout="vertical" style={{ marginBottom: '20px', maxWidth:"500px" , backgroundColor:"gray", borderRadius:"10px" , padding:"10px" , boxSizing:"border-box" , margin:"auto" }}>
            <Form.Item label="Name">
              <Input
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Phone">
              <Input
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="DateTime">
              <Input
                value={newCustomer.dateTime}
                onChange={(e) => setNewCustomer({ ...newCustomer, dateTime: e.target.value })}
              />
            </Form.Item>
            <Button type="primary" onClick={handleAddCustomer}>Add Customer</Button>
          </Form>
        </TabPane>
      </Tabs>

      <Modal
        title="Edit Customer"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              value={editingCustomer?.name || ''}
              onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              type="email"
              value={editingCustomer?.email || ''}
              onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Phone">
            <Input
              value={editingCustomer?.phone || ''}
              onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="DateTime">
            <Input
              value={editingCustomer?.dateTime || ''}
              onChange={(e) => setEditingCustomer({ ...editingCustomer, dateTime: e.target.value })}
            />
          </Form.Item>
          <Button type="primary" onClick={handleSaveEdit}>Save</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerPage;
