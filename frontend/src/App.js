import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import {ToastContainer} from 'react-toastify';
import Register from './components/Register';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard';
import './App.css'
function App() {
  return (
    <div className='task-container'>

<ToastContainer />
<Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>

    </div>
    
  );
}

export default App;