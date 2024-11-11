// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Remove Router
import Registration from '../components/Registration';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';

function AppRoutes({ isRegistering }) {
  return (
    <Routes>
      <Route path="/" element={isRegistering ? <Registration /> : <Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default AppRoutes;
