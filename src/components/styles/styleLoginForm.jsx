// src/components/LoginForm.js

import styled from 'styled-components';
import { space, layout, color, typography, border, position } from 'styled-system';

// Styled components using styled-system
export const Container = styled.div`
  ${space}
  ${layout}
  ${color}
  ${position}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left:auto;
  margin-right:auto;
  width:20vw;
  height: 100vh;
 background:transparent;
  background-position: center top;
  background-size: contain;

`;

export const Form = styled.form`
  ${space}
  ${layout}
  ${color}
  ${border}
  ${typography}
  background: rgba(255, 255, 255, 0.1); /* Transparent white background with blur effect */
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px); /* Blur effect */
  display:grid;
  place-items:center;
  background:transparent;
`;

export const Input = styled.input`
  ${space}
  ${layout}
  ${color}
  ${border}
  ${typography}
  width: 80%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid rgba(0, 0, 0, 0.5); /* Transparent border */
  background: #8a9698; /* Slightly transparent background */
  border-radius: 5px;
  color: #313c43;
  ::placeholder {
    color: rgba(255, 255, 255, 0.7); /* Placeholder color */
  },
  :focus {
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;
export const I = styled.img`

width:86%;
height:auto;
padding-bottom:10px;
border-radius:10px;
`
export const Button = styled.button`
  ${space}
  ${layout}
  ${color}
  ${border}
  ${typography}
  width: 40%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #0056b3; /* Button color */
  color: white;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #8a9698; /* Hover color */
  }
`;
