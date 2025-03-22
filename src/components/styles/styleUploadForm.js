// src/styles/styleUploadForm.js
import styled from 'styled-components';
import { space, layout, color, typography, border } from 'styled-system';

// Container for the form
export const Container = styled.div`
  ${space}
  ${layout}
  ${color}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

export const Form = styled.form`
  ${space}
  ${layout}
  ${color}
  ${border}
  ${typography}
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  ${space}
  ${layout}
  ${color}
  ${border}
  ${typography}
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  ${space}
  ${layout}
  ${color}
  ${border}
  ${typography}
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ImagePreview = styled.img`
  ${space}
  ${layout}
  ${color}
  ${border}
  ${typography}
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;
