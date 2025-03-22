import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Container, Form, Input, Button, I } from '../styles/styleLoginForm.jsx';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Reducer/userSlices.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading.jsx';
import { gsap } from 'gsap';
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const checkImageExists = async (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };
  
  const constructImageUrl = async (username) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'jfif'];
    
    for (const extension of imageExtensions) {
      const imageUrl = `https://backtade-2.onrender.com/uploads/${username}.${extension}`;
      const exists = await checkImageExists(imageUrl);
      
      if (exists) {
        return imageUrl;
      }
    }
  
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post('https://backtade-2.onrender.com/login', {
        username,
        password,
      });

      if (result.status === 200) {
        const userImage = await constructImageUrl(username);
        dispatch(setUser({
          _id: result.data.user._id,
          username: result.data.user.username,
          image: userImage,
          role: result.data.user.role,
          password: result.data.user.password,
        }));

        // GSAP Animation for the transition
        gsap.fromTo(
          ".loading",
          { opacity: 1 },
          {
            opacity: 0,
            duration: 1.5,
            delay: 0.5,
            onComplete: () => {
              navigate('/home');
            }
          }
        );

        gsap.fromTo(
          ".home",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 2,
            delay: 0.5,
          }
        );
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed! Please check your username and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {loading ? (
        <Loading className='loading'/> // Show loading component
      ) : (
        <Form onSubmit={handleSubmit}>
          <I src='./Logo.png' alt='Logo' />
          <Input
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={handleUsernameChange}
          />
          <Input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={handlePasswordChange}
          />
          <Button type='submit'>Login</Button>
        </Form>
      )}
      <ToastContainer />
    </Container>
  );
};

export default LoginForm;
