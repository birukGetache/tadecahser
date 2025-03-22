// GroupModal.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css'; // Import default styles

const ModalContainer = styled(Modal)`
position:absolute;
  top: 35%;
  left: 40%;
  width: 400px;
  max-width: 90vw; /* Makes it responsive on smaller screens */
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const StyledButton = styled.button`
  padding: 10px 15px;
  margin: 5px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  text-align: center; /* Center align the title */
`;

const GroupModal = ({ isOpen, onRequestClose }) => {
  const [groupName, setGroupName] = useState('');
  const [groupId, setGroupId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate an API call or any async action
    setTimeout(() => {
      // Logic to handle form submission (e.g., dispatch an action or make an API call)
      toast.success(`Group Created: ${groupName} (ID: ${groupId})`);
      onRequestClose(); // Close the modal
      setGroupName(''); // Clear input
      setGroupId('');   // Clear input
    }, 500); // Simulating a delay
  };

  return (
    <>
      <ModalContainer
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        <Title>Add New Group</Title>
        <form onSubmit={handleSubmit}>
          <label>
            Group Name:
            <StyledInput
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </label>
          <label>
            Group ID:
            <StyledInput
              type="text"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              required
            />
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <StyledButton type="submit">Submit</StyledButton>
            <StyledButton type="button" onClick={onRequestClose}>Close</StyledButton>
          </div>
        </form>
      </ModalContainer>
      {/* Add ToastContainer to the DOM to display notifications */}
      <ToastContainer />
    </>
  );
};

export default GroupModal;