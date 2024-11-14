// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css'; // Optional: Import CSS for styling

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Use name as the key and value as the new value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Adjust the URL to match your backend API
      const response = await axios.post('http://localhost:61955/api/Authenticate/login', formData);
      setSuccessMessage('Login successful!');
      setErrors({});
      console.log('Login successful:', response.data);

      // Handle successful login (e.g., store token in local storage)
      localStorage.setItem('authToken', response.data.token); // Example of storing token

      // Redirect to the Dashboard after a successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
      setErrors({
        api: error.response?.data?.message || 'Login failed. Please check your credentials and try again.',
      });
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
      {errors.api && <p className="error">{errors.api}</p>}
    </div>
  );
}

export default Login;
