import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./CSS/loginRegisterPage.css";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`https://personal-account-manager-app-mern.vercel.app/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      toast.success(`User Successfuly Registered as ${username}!`);
      navigate("/");
    } else {
      toast.error(response.statusText);
    }
  };

  return (
    <div>
      <h className="heading" style={{ fontSize: "32px" }}>Register Page</h>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__group field">
          <input
            className="form__field"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="Username" className="form__label">
            Username
          </label>
        </div>
        <div className="form__group field">
          <label className="form__label">Password:</label>
          <input
            className="form__field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p style={{ marginBottom: '-10px',
    marginTop: '30px',
    fontSize: '18px',
    fontWeight: 'bold' }} > Already have an account?</p>
 <button onClick={() => navigate('/')}>Login</button>
    </div>
  );
}

export default Register;
