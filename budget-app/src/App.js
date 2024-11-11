// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRoutes from './Routes/AppRoutes'; // Make sure the import path is correct

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to PennyWise</h1>
          <h2>Your personal budgeting companion for smarter spending and saving.</h2>

          {/* Toggle Button for Login and Registration */}
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
          </button>

          {/* AppRoutes Component Handles All Routes */}
          <AppRoutes isRegistering={isRegistering} />
        </header>
      </div>
    </Router>
  );
}

export default App;
