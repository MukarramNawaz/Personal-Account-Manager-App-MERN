import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../App.css'


function Header() {
  const [mode, setMode ] = useState('dark');
  const toggleMode = () => {
    if(mode === 'white') {
      setMode('black');
      document.body.style.backgroundColor = 'white';
      toast.success('Dark mode enabled');
  }
  else{setMode('white');
  document.body.style.backgroundColor = '#333';
  toast.success('Dark mode disabled');
 }
 
  
  };
  return (
    <header className="Header" style={{  backgroundColor: `${mode === 'white' ? '#333' : 'white'}`}}>
      <h1 style={{ color: `${mode}`}}>Personal Account Manager</h1>
      <button onClick={toggleMode}>Enable {mode === 'white' ? 'Light' : 'Dark'} Mode</button>
      
    </header>
  );
}

export default Header;
