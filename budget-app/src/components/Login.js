// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Optional: Import CSS for styling

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
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
