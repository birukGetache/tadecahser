import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import SupplierCard from './SupplierCard';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
const PageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  height:86vh;
  overflowY:auto;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const UserSupplierPage = () => {
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const borderColor = isDarkTheme ? '#555' : '#dedede';
  const selectBorderColor = isDarkTheme ? '#555' : '#ccc';
  const labelColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const [users, setUsers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('https://backtade-2.onrender.com/usersAdmin');
        const suppliersResponse = await axios.get('https://backtade-2.onrender.com/users');
        
        setUsers(usersResponse.data);
        setSuppliers(suppliersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer style={{backgroundColor , height:"89vh" , boxSizing:"border-box"}}>
      <Title style={{color:textColor}}>Users and Suppliers</Title>

      <h2 style={{color:textColor}}>Users</h2>
      <CardContainer>
        {users.length > 0 ? users.map(user => <UserCard key={user.id} user={user} />) : <p>No users available.</p>}
      </CardContainer>

      <h2 style={{color:textColor}}>Suppliers</h2>
      <CardContainer>
        {suppliers.length > 0 ? suppliers.map(supplier => <SupplierCard key={supplier.id} supplier={supplier} />) : <p>No suppliers available.</p>}
      </CardContainer>
    </PageContainer>
  );
};

export default UserSupplierPage;
