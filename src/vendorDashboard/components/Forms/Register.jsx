import React from 'react';
import { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { toast } from 'react-toastify';

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(`Congrats ${username}`);
        toast.success("Registration Success");
        setUsername("");
        setEmail("");
        setPassword("");
        showLoginHandler();
      } else {
        if (data === "Email already taken") {
          toast.error("Email already exists. Please use a different email.");
        } else {
          toast.error("Registration Failed");
        }
      }
    } catch (error) {
      console.log("Registration failed", error);
      toast.error("Registration Failed");
      toast.info(`${error}`);
    }
  }

  return (
    <div className='registerSection'>
      <form className='authForm' onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>
        <label>Username</label>
        <input 
          type='text' 
          value={username} 
          name='username' 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder='Enter your Name' 
        /><br />
        <label>Email</label>
        <input 
          type='text' 
          value={email} 
          name='email' 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder='Enter your Email' 
        /><br />
        <label>Password</label>
        <input 
          type='text' 
          value={password} 
          name='password' 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder='Enter your Password' 
        /><br />
        <div className='btnSubmit'>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
