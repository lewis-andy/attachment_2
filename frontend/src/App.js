// import logo from '../src/assets/icon.png'
// import Banner from './components/Banner'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from '../src/components/Signup';
import Login from '../src/components/Login';
import Home from './components/Home';
import Forum from './components/Forum';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};


export default App;
