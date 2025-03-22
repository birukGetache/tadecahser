import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { FaSearch, FaArrowLeft, FaTrashAlt, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash/debounce';
import { useSelector } from 'react-redux';
// Styled Components
const Container = styled.div`
  padding: 2rem;
  background-color: #f1f5f9;
  height: 82vh;
  overflow-y: auto;
`;

const SearchContainer = styled.div`
  margin-bottom: 1rem;
  position: relative;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
`;

const ContactList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 400px;
  overflow-y: auto;
`;

const ContactItem = styled.li`
  display: flex;
  flex-direction:column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ContactText = styled.span`
  font-size: 1rem;
  color: #333;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #007bff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  &:hover {
    color: #0056b3;
  }
`;

const ContactDetail = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MedicineItem = styled.div`
  margin-bottom: 10px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  font-size: 1.2rem;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;

  &:hover {
    color: #c82333;
  }
`;

const ClearButton = styled.button`
  background: #dc3545;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:hover {
    background: #c82333;
  }
`;

const ContactListPage = () => {
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const borderColor = isDarkTheme ? '#555' : '#dedede';
  const selectBorderColor = isDarkTheme ? '#555' : '#ccc';
  const labelColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('https://backtade-2.onrender.com/contacts');
        const fetchedContacts = Array.isArray(response.data) ? response.data : [response.data];
        setContacts(fetchedContacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        toast.error('Failed to fetch contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleSearch = useCallback(
    debounce((e) => {
      setSearchTerm(e.target.value.toLowerCase());
    }, 300),
    []
  );

  const handleClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleBack = () => {
    setSelectedContact(null);
  };

  const saveToServer = async () => {
    try {
      await axios.post('https://backtade-2.onrender.com/contacts', contacts);
      toast.success('Contacts saved successfully');
    } catch (error) {
      console.error('Error saving contacts:', error);
      toast.error('Failed to save contacts');
    }
  };

  const handleDelete = async (phone) => {
    try {
      await axios.delete(`https://backtade-2.onrender.com/contacts/${phone}`);
      setContacts(prevContacts => prevContacts.filter(contact => contact.phone !== phone));
      toast.success('Contact deleted');
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
    }
  };

  const handleClearAll = async () => {
    try {
      await axios.delete('https://backtade-2.onrender.com/contacts'); // Ensure your API supports this
      setContacts([]);
      toast.success('All contacts cleared');
    } catch (error) {
      console.error('Error clearing contacts:', error);
      toast.error('Failed to clear contacts');
    }
  };

  const groupedContacts = useMemo(() => {
    const contactMap = new Map();

    contacts.forEach(contact => {
      if (contact.phone) {
        const key = contact.phone;
        if (!contactMap.has(key)) {
          contactMap.set(key, {
            phone: key,
            name: contact.name,
            email: contact.email,
            dateTime: contact.dateTime,
            purchases: contact.purchases || [] // Initialize purchases
          });
        } else {
          contactMap.get(key).purchases.push(...(contact.purchases || []));
        }
      }
    });

    return Array.from(contactMap.values());
  }, [contacts]);

  const filteredContacts = useMemo(() => {
    return groupedContacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm)
    );
  }, [groupedContacts, searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container style={{backgroundColor , height:"89vh" , boxSizing:"border-box"}}>
      {selectedContact ? (
        <>
          <BackButton onClick={handleBack}>
            <FaArrowLeft style={{ marginRight: '5px' , fontFamily:' "DM Sans", sans-serif'}}/> Back to List
          </BackButton>
          <ContactDetail>
            <h2 style={{fontFamily:' "DM Sans", sans-serif'}}>Contact Details</h2>
            <p style={{fontFamily:' "DM Sans", sans-serif'}}><strong>Name:</strong> {selectedContact.name}</p>
            <p style={{fontFamily:' "DM Sans", sans-serif'}}> <strong>Email:</strong> {selectedContact.email}</p>
            <p style={{fontFamily:' "DM Sans", sans-serif'}}><strong>Phone:</strong> {selectedContact.phone}</p>
            <p style={{fontFamily:' "DM Sans", sans-serif'}}><strong>DateTime:</strong> {selectedContact.dateTime}</p>
            <h3 style={{fontFamily:' "DM Sans", sans-serif'}}>Medicine Purchases</h3>
            {selectedContact.purchases && selectedContact.purchases.length > 0 ? (
              selectedContact.purchases.map((purchase, index) => (
                <MedicineItem key={index}>
                  <p style={{fontFamily:' "DM Sans", sans-serif'}}><strong>Medicine:</strong> {purchase.medicine}</p>
                  <p style={{fontFamily:' "DM Sans", sans-serif'}}><strong>Quantity:</strong> {purchase.quantity}</p>
                  <p style={{fontFamily:' "DM Sans", sans-serif'}}><strong>Time:</strong> {purchase.time}</p>
                </MedicineItem>
              ))
            ) : (
              <p style={{fontFamily:' "DM Sans", sans-serif'}}>No purchases recorded.</p>
            )}
          </ContactDetail>
        </>
      ) : (
        <>
          <ClearButton onClick={handleClearAll}>
            <FaTimes style={{ marginRight: '5px' }} /> Clear All
          </ClearButton>
          <h2 style={{fontFamily:' "DM Sans", sans-serif' , color:textColor}}>Contact List</h2>
          <SearchContainer>
            <Input
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              value={searchTerm}
            />
            <FaSearch style={{ position: 'absolute', right: '10px', top: '8px' }} />
          </SearchContainer>
          <ContactList>
            {filteredContacts.map((contact) => (
              <ContactItem key={contact.phone} onClick={() => handleClick(contact)}>
                <div style={{ flex: 1 }}>
                  <ContactText style={{fontFamily:' "DM Sans", sans-serif'}}>{contact.name}</ContactText>
                  <ContactText style={{fontFamily:' "DM Sans", sans-serif'}}>{contact.email}</ContactText>
                  <ContactText style={{fontFamily:' "DM Sans", sans-serif'}}>{contact.phone}</ContactText>
                </div>
                <div>
                  <ContactText style={{fontFamily:' "DM Sans", sans-serif'}}>Quantity: {contact.purchases.length}</ContactText>
                  <ContactText style={{fontFamily:' "DM Sans", sans-serif'}}>{contact.dateTime}</ContactText>
                </div>
                <div style={{marginLeft:"90px"}}>
                <DeleteButton onClick={(e) => {
                  e.stopPropagation(); // Prevent the click from bubbling up to the ContactItem
                  handleDelete(contact.phone);
                  
                }}
                style={{fontFamily:' "DM Sans", sans-serif' }}>
                  <FaTrashAlt />
                </DeleteButton>
                </div>
              </ContactItem>
            ))}
          </ContactList>
        </>
      )}
      <ToastContainer />
    </Container>
  );
};

export default ContactListPage;
