import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './CSS/loginRegisterPage.css'
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      
      const userData = await response.json();
      localStorage.setItem('userId', JSON.stringify(userData._id));
      toast.success(`Successfuly logged in as ${userData.username}!`);
      
      navigate('/dashboard');
      
    } else {
      toast.error('Invalid username or password');
    }
  };

  return (

    <div className='main'> 
         <h className="heading">Login Page</h>
         <form onSubmit={handleSubmit} className="form">
   
   <div className="form__group field">

   <input className="form__field" type="text"
       value={username}
       onChange={(e) => setUsername(e.target.value)}
       required
   />
   <label htmlFor="Username" className="form__label">Username</label>


   </div>
   <div className="form__group field">
     <label className="form__label" >Password:</label>
     <input className="form__field"
       type="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       required
     />
   </div>
   <button type="submit">Login</button>
   
 </form>
 <p style={{ marginBottom: '-10px',
    marginTop: '30px',
    fontSize: '18px',
    fontWeight: 'bold' }} > Don't have an account?</p>
 <button onClick={() => navigate('/register')}>Register</button>
    </div>
   
    
  );
}

export default Login;
