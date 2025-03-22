import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { List, Button, Modal, Form, Input } from 'antd';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://backtade-2.onrender.com/users');
        setUsers(response.data);
      } catch (err) {
        setError('Error fetching users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleEditClick = (user) => {
    setEditingUser(user._id);
    setEditFormData({ name: user.name, email: user.email, phone: user.phone, address: user.address });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSubmit = async (values) => {
    try {
      const response = await axios.put(`https://backtade-2.onrender.com/users/${editingUser}`, values);
      setUsers(users.map(user => user._id === editingUser ? response.data : user));
      setIsModalOpen(false);
      toast.success('User updated successfully!');
    } catch (err) {
      console.error('Error updating user:', err);
      toast.error('Error updating user');
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://backtade-2.onrender.com/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      toast.success('User deleted successfully!');
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error('Error deleting user');
    }
  };

  return (
    <div>
      <h3 style={{ color: textColor }}>User List</h3>
      <p style={{ color: textColor }}>The list of users</p>
      <List
        bordered
        dataSource={users}
        renderItem={user => (
          <List.Item>
            <div>
              <strong>Name:</strong> {user.name}<br />
              <strong>Email:</strong> {user.email}<br />
              <strong>Phone:</strong> {user.phone}<br />
              <strong>Address:</strong> {user.address}<br />
              <Button onClick={() => handleEditClick(user)} style={{ marginRight: '10px' }}>
                Edit
              </Button>
              <Button danger onClick={() => handleDelete(user._id)}>
                Delete
              </Button>
            </div>
          </List.Item>
        )}
      />

      <Modal
        title="Edit User"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form onFinish={handleEditSubmit} layout="vertical">
          <Form.Item label="Name" required>
            <Input
              name="name"
              value={editFormData.name}
              onChange={handleFormChange}
            />
          </Form.Item>

          <Form.Item label="Phone" required>
            <Input
              name="phone"
              value={editFormData.phone}
              onChange={handleFormChange}
            />
          </Form.Item>

          <Form.Item label="Address" required>
            <Input
              name="address"
              value={editFormData.address}
              onChange={handleFormChange}
            />
          </Form.Item>

          <Form.Item label="Email" required>
            <Input
              name="email"
              type="email"
              value={editFormData.email}
              onChange={handleFormChange}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default UsersList;
