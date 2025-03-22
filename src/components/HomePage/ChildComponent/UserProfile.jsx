// UserProfile.js
import React, { useState , useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUser } from '../../../Reducer/userSlices';
import UpdateUserComponent from './UpdateUserComponent';
import { toast, ToastContainer } from 'react-toastify';
import {  Modal as AntdModal } from 'antd';
import { Modal, Button, Input, Form } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
// //import {FaName}from 'react-icons'
// import Modal from 'react-modal';
import axios from 'axios';
const UserProfile = () => {
  const user = useSelector(selectUser);
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const borderColor = isDarkTheme ? '#555' : '#dedede';
  const selectBorderColor = isDarkTheme ? '#555' : '#ccc';
  const labelColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const users = useSelector((state) => state.user);
  const [phoneError, setPhoneError] = useState('');
  const [data, setData ] = useState([]);
  const [h,setH] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [isAntdModalVisible, setIsAntdModalVisible] = useState(false);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter(item => 
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const validatePhone = (value) => {
    const phonePattern = /^(09|07)\d{8}$/; // Regex for phone starting with 09 or 07 and followed by 8 digits
    if (!phonePattern.test(value)) {
      setPhoneError('Phone number must start with 09 or 07 and have 8 digits after that.');
    } else {
      setPhoneError('');
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    validatePhone(value);
  };
  const handleSave = (updatedUser) => {
    // Dispatch the action to update the user in the Redux store
    dispatch(setUser(updatedUser));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  const Delete = async (item) => {
    try {
      const res = await axios.delete(`https://backtade-2.onrender.com/usersAdmin/${item.username}`);
      if (res.status === 200) {
        toast.success("User deleted successfully", {
          position: "top-right",
          autoClose: 3000, // auto close after 3 seconds
          hideProgressBar: false,
        });
        
       setH(!h)
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };
  
  useEffect(()=>{
    const fetch = async () =>{
      const res = await axios.get('https://backtade-2.onrender.com/usersAdmin');
      console.log("Admins");
     setData(res.data)
    }
    fetch()
  } , [h])

  
  const handleModalSave = async ()  => {
    // Handle save logic for the modal form
  const res = await axios.post('https://backtade-2.onrender.com/register' , {username:newUsername , password:newPassword ,phone})
if(res.status=== 400){
  alert("Godd Job")
}
    setIsModalOpen(false);
    setH(!h);
  };
  
  const handleDelete = (item) => {
    AntdModal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this item?',
      onOk: () => {
        // Call your delete function here
        Delete(item); // Make sure to define this function
        // Optionally close the modal if you opened it in a different context
        setIsAntdModalVisible(false);
      },
    });
  };


  return (
    <div style={{  gap:"10px" , overflowY:"auto", height:"89vh" ,overflowX:"hidden", backgroundColor }}>
      {isEditing ? (
        <UpdateUserComponent user={user} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' , height:"fit-content" , display:"flex" , gap:"20px"}}>
        <div style={{ marginBottom: '10px', backgroundColor: "white" }}>
  <img 
    src={user.image ||'/defualt-image.avif'} 
    alt="Profile" 
    style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', backgroundColor: "wheat" }} 
  />
</div>

          <div>
          <p style={{ color:textColor , fontFamily:' "DM Sans", sans-serif'}}><strong style={{fontFamily:' "DM Sans", sans-serif' , color:textColor}}>Name:</strong> {user.username}</p>
          <p style={{ color:textColor , fontFamily:' "DM Sans", sans-serif'}}><strong style={{fontFamily:' "DM Sans", sans-serif', color:textColor}}>Role:</strong> {user.role}</p>
        
          </div>
          <div>
          <button 
            onClick={() => setIsEditing(true)} 
            style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' , margin:"20px",fontFamily:' "DM Sans", sans-serif' , height:"fit-content" , width:"fit-content"}}
          >
            Edit
          </button>
          {user.role === 'mainAdmin' &&( <button  style={{  borderRadius: '50%', height:"20px",width:"20px", border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' , fontFamily:' "DM Sans", sans-serif'}} onClick={() => setIsModalOpen(true)} >+</button>)}
          </div>
        </div>
        {user.role === 'mainAdmin' && (
  <div>
  <input
    type="text"
    placeholder="Search by username"
    value={searchTerm}
    onChange={handleSearchChange}
    style={{
      margin: '10px -10px',
      marginLeft:"10px",
      padding: '8px',
      width: '40%',
      borderRadius: '4px',
      border: '1px solid #ccc'
    }}
  />
  <table className="admin-table" style={{marginLeft:"10px", marginRight:"10px" , boxSizing:"border-box"}}>
    <thead>
      <tr>
        <th>Profile Image</th>
        <th>Name</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredData.map((item) => (
        <tr key={item.id}>
          <td>
            <img 
              src={item.image || 'default-profile.png'} 
              alt="Profile" 
              className="profile-image" 
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
          </td>
          <td>{item.username}</td>
          <td>{item.role}</td>
          <td>
            <button className="delete-button"   onClick={() => handleDelete(item)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
)}

        </>
      )}
      
      <Modal
      title="Add User"
      visible={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null} // Use custom footer
      style={{
        zIndex: 9999999,
      }}
    >
      <Form layout="vertical" style={{ height: 'fit-content' }}>
        <Form.Item label="Username">
          <Input 
            value={newUsername} 
            onChange={(e) => setNewUsername(e.target.value)} 
          />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
          />
        </Form.Item>
        <Form.Item label="Phone">
          <Input 
            value={phone} 
            onChange={handlePhoneChange} 
          />
          {phoneError && <div style={{ color: 'red', marginTop: '5px' }}>{phoneError}</div>}
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            type="primary" 
            onClick={handleModalSave} 
          >
            Save
          </Button>
        </div>
      </Form>
    </Modal>


    </div>
    
  );
  
};

export default UserProfile;
