// ContactManagement.js
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, List, Typography, Form, message } from 'antd';
import { FaUser, FaEnvelope, FaPhone, FaPlus, FaEdit, FaTrash, FaPaperPlane } from 'react-icons/fa';
import { useSelector } from 'react-redux';

// Ant Design Styles
const { Title } = Typography;

// Contact Management Component
const ContactManagement = () => {
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';

  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [contacts, setContacts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Fetch contacts from the server
  const fetchContacts = async () => {
    try {
      const response = await fetch('https://backtade-2.onrender.com/contacts');
      const data = await response.json();
      console.log('Fetched contacts:', data);

      const fetchedContacts = Array.isArray(data) ? data : [data];
      setContacts(fetchedContacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      message.error('Failed to fetch contacts');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const onSubmit = async (data) => {
    const contactWithDate = {
      ...data,
      dateTime: new Date().toLocaleString(),
    };

    let updatedContacts;

    if (editIndex !== null) {
      updatedContacts = [...contacts];
      updatedContacts[editIndex] = contactWithDate;
      setEditIndex(null);
      message.success('Contact updated successfully!');
    } else {
      updatedContacts = [...contacts, contactWithDate];
      message.success('Contact added successfully!');
    }

    setContacts(updatedContacts);
    reset();
    saveToServer(updatedContacts);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const contact = contacts[index];
    reset({ ...contact, dateTime: contact.dateTime });
  };

  const handleDelete = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    message.info('Contact deleted');
    saveToServer(updatedContacts);
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const saveToServer = async (contactsToSave) => {
    try {
      await fetch('https://backtade-2.onrender.com/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactsToSave),
      });
    } catch (error) {
      console.error('Error saving contacts:', error);
      message.error('Failed to save contacts');
    }
  };

  return (
    <div style={{ display: 'flex', padding: '2rem', backgroundColor: isDarkTheme ? '#2c3e50' : '#edf1f5', height:"89vh" , boxSizing:"border-box", gap: '2rem' }} className='split'>
      <div style={{ flex: 1, maxWidth: '600px', background: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
        <Title level={2} style={{ fontFamily: '"DM Sans", sans-serif' }}>{editIndex !== null ? 'Edit Contact' : 'Add Contact'}</Title>
        <Form onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label={<span><FaUser /> Name</span>}
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name ? errors.name.message : ''}
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label={<span><FaEnvelope /> Email</span>}
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email ? errors.email.message : ''}
          >
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Please enter a valid email' } }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item label={<span><FaPhone /> Phone</span>}>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              <FaPlus /> {editIndex !== null ? 'Update Contact' : 'Add Contact'}
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div style={{ flex: 1, maxWidth: '600px', display: 'flex', flexDirection: 'column', height: '70vh' }}>
        <Title level={2} style={{ fontFamily: '"DM Sans", sans-serif', color: isDarkTheme ? '#ecf0f1' : '#2c3e50' }}>Contact List</Title>
        <List
          itemLayout="horizontal"
          dataSource={contacts}
          renderItem={(contact, index) => (
            <List.Item>
              <List.Item.Meta
                title={<span style={{ fontFamily: '"DM Sans", sans-serif' }}>{contact.name} - {contact.email} {contact.phone && ` - ${contact.phone}`} - {contact.dateTime}</span>}
                description={
                  <div>
                    <Button type="link" onClick={() => handleEdit(index)} style={{ marginRight: '8px' }}>
                      <FaEdit /> Edit
                    </Button>
                    <Button type="link" onClick={() => handleDelete(index)} style={{ marginRight: '8px' }}>
                      <FaTrash /> Delete
                    </Button>
                    <Button type="link" onClick={() => handleEmail(contact.email)}>
                      <FaPaperPlane /> Email
                    </Button>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ContactManagement;
