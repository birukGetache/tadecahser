import React, { useState } from 'react';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { toggleClicked } from '../../Reducer/dashboardSlice.js';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectUser, setUser } from '../../Reducer/userSlices';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const EllipsisMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickd = (value) => {
    dispatch(toggleClicked(value));
  };
  const [isOpen, setIsOpen] = useState(false);
  const {_id} = useSelector(selectUser);
  const handleLogout = async () => {
    try {
      // Send request to delete the user from the database
      await axios.delete(`https://backtade-2.onrender.com/user/${_id}`);
      navigate('/');
      // Clear user state and handle logout (e.g., redirect to login page)
      dispatch(setUser(null)); // Clear the user from Redux store
      // Optionally redirect to login or home page
  
      window.location.href = '/'; // Adjust the redirect path as needed
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <div style={{ position: 'relative',display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'white',
          fontSize: '40px',
        }}
      >
        ⋮
      </button>

      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            width: '100px',
            right: 0,
            padding: '10px',
            margin: 0,
            backgroundColor: 'white',
            border: '1px solid white',
            borderRadius: '4px',
            listStyleType: 'none',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            // Positioning the arrow
            paddingBottom: '20px', // Increased padding to fit the larger arrow
            paddingTop: '10px', // Ensure there's some space above the content
          }}
        >
          {/* Arrow */}
          <div
            style={{
              position: 'absolute',
              top: '-15px', // Position the arrow further above the dropdown
              right: '10px', // Adjust as needed to align with the button
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent', // Increased size of the arrow
              borderRight: '10px solid transparent',
              borderBottom: '15px solid white', // Arrow color matches the menu
              zIndex: 1001, // Ensure the arrow is above the dropdown content
            }}
          ></div>
          <div style={{display:"flex" , alignItems:"center" ,  borderBottom:"1px solid black"}}>
          <FaUser style={{    }} /> {/* Profile Icon */}
          <li
            style={{
              cursor: 'pointer',
              padding: '10px',
           
              fontSize: '16px',
              fontFamily:' "DM Sans", sans-serif' ,
              textAlign:'center',
              backgroundColor: 'white',  
             // Ensure the background color is consistent
            }}
            onClick={() => handleClickd(27)}
          >
            Profile
          </li>
          </div>
          <div style={{display:"flex" , alignItems:"center" }}>
          <FaSignOutAlt  style={{   color: 'red',}}/> {/* Log Out Icon */}
          <li
            style={{
              cursor: 'pointer',
              padding: '10px',
            color:"red",
              fontFamily:' "DM Sans", sans-serif' ,
              textAlign:'center',
              fontSize: '16px',
              whiteSpace: "nowrap",
              backgroundColor: 'white', // Ensure the background color is consistent
            }}
            onClick={handleLogout}
          >
            Log Out
          </li>
          </div>
        </ul>
      )}
    </div>
  );
};

export default EllipsisMenu;
