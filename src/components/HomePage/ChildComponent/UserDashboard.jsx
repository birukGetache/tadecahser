import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../Reducer/userSlices'; // Adjust the import path as necessary
import axios from 'axios';
import Modal from 'react-modal';

// Component to handle creating users
const CreateUserForm = ({ onCreate }) => {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onCreate({ username, password, role });
    // Reset form fields after submission
    try {
      // Make a POST request to the /register endpoint
      const response = await axios.post('https://backtade-2.onrender.com/register', {
        username,
        password,
        role,
      });
      
      // Handle the response
      console.log('User registered successfully:', response.data);
    } catch (error) {
      // Handle any errors
      console.error('Error registering user:', error.response ? error.response.data : error.message);
    }
    setName('');
    setPassword('');
    setRole('User');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2>Create New User</h2>
      <label>
        Name:
        <input
          type="text"
          value={username}
          name='username'
          placeholder='Insert username'
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          name='password'
          placeholder='Insert password'
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          required
        />
      </label>
      <label>
        Role:
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          required
        >
          <option value='User'>User</option>
          <option value='mainAdmin'>mainAdmin</option>
        </select>
      </label>
      <button type="submit" style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>
        Create User
      </button>
    </form>
  );
};

// Component to handle updating users
const UpdateUserForm = ({ user, onUpdate, onClose }) => {
  const [username, setName] = useState(user.username || '');
  const [password, setPassword] = useState(user.password || '');
  const [role, setRole] = useState(user.role || 'User');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...user, username, password, role });
    alert(user.username);
  };
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        
      <h2>Update User</h2>
      <label>
        Name:
        <input
          type="text"
          value={username}
          onChange={(e) => {setName(e.target.value); alert(e.target.value)}}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          required
        />
      </label>
      <label>
        Role:
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          required
        >
          <option value='User'>User</option>
          <option value='mainAdmin'>mainAdmin</option>
          {/* mainAdmin role should not be selectable */}
        </select>
      </label>
      <button type="submit" style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>
        Update User
      </button>
      <button type="button" onClick={onClose} style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer', marginLeft: '10px' }}>
        Cancel
      </button>
    </form>
  );
};

// Component to display user cards
const UserCard = ({ user, onEdit, onDelete }) => {
 
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3>UserName: {user.username}</h3>
      <p>Role: {user.role}</p>
      <button onClick={() => onEdit(user)} style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', marginRight: '10px' }}>
        Edit
      </button>
      <button onClick={() => onDelete(user._id)} style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer' }}>
        Delete
      </button>
    </div>
  );
};

const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch all users from the backend
        const response = await axios.get('https://backtade-2.onrender.com/users'); // Adjust endpoint as needed
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
  console.log(user.username)
    onEdit(user);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://backtade-2.onrender.com/users/${userId}`);
      // Remove the user from state after deletion
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>User List</h1>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map(user => (
          <UserCard key={user._id} user={user} onEdit={handleEdit} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

// Main component to handle role-based rendering and user operations
const UserDashboard = () => {
  const { role } = useSelector(selectUser);
  const [users, setUsers] = useState([]); // Local state for managing users
  const [editingUser, setEditingUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCreateUser = async (newUser) => {
    try {
      // Replace with actual API call to create the user
      const response = await axios.post('https://backtade-2.onrender.com/users', newUser);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      // Replace with actual API call to update the user
      const response = await axios.put(`https://backtade-2.onrender.com/users/${updatedUser._id}`, updatedUser);
      setUsers(users.map(user => (user._id === updatedUser._id ? response.data : user)));
      setEditingUser(null);
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://backtade-2.onrender.com/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openModal = (user) => {
    setEditingUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingUser(null);
  };

  return (
    <div style={{ padding: '20px', height: '85vh', overflowY: 'auto' }}>
      <h1>User Management</h1>
      {role === 'mainAdmin' ? (
        <>
          <CreateUserForm onCreate={handleCreateUser} />
          <UserList onEdit={openModal} />
          {modalIsOpen && editingUser && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Edit User"
              style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                  maxWidth: '500px',
                  margin: 'auto',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }
              }}
            >
              <UpdateUserForm user={editingUser} onUpdate={handleUpdateUser} onClose={closeModal} />
            </Modal>
          )}
        </>
      ) : (
        <p>You do not have the required permissions to access these forms.</p>
      )}
    </div>
  );
};

export default UserDashboard;
