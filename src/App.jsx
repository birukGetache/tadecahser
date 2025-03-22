import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/Authentications/LoginForm';
import HomePage from './components/HomePage/HomePage'; // Create a HomePage component
import Casher from './components/casher/Casher';
import Invetory from './components/casher/Inventory';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Casher/>} />
        <Route path="/casherPage" element={<Invetory/>} />
      </Routes>
    </Router>
  );
}

export default App;
