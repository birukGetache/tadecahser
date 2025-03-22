// SupplierCard.js
import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid #28a745;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  width: 200px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.25em;
  color: #28a745;
`;

const CardDetails = styled.p`
  margin: 5px 0;
`;

const SupplierCard = ({ supplier }) => {
  return (
    <CardContainer>
      <CardTitle>{supplier.name}</CardTitle>
      <CardDetails>Email: {supplier.email}</CardDetails>
      <CardDetails>Phone: {supplier.phone}</CardDetails>
      <CardDetails>Address: {supplier.address}</CardDetails>
    </CardContainer>
  );
};

export default SupplierCard;