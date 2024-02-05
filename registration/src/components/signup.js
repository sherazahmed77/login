// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username: username,
        password: password
      });

      setMessage(response.data.message);
      if (response.status === 201) {
        setAuthenticated(true);
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
      <p>{message}</p>
    </div>
  );
};

export default Signup;
