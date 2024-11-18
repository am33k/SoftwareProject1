// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import logo from './assets/BudgetLogo.png';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Routes for Login and Registration */}
          <Route
            path="/"
            element={
              <>
                <header className="App-header">
                  <h1>Welcome to BudgetOnTheGo</h1>
                  <img src={logo} alt="BudgetOnTheGo Logo" className='App-logo'/>
                  <h2>Your personal budgeting companion for smarter spending and saving.</h2>
                  <button onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
                  </button>
                </header>
                {isRegistering ? <Registration /> : <Login />}
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <header className="App-header">
                  <h1>Welcome to BudgetOnTheGo</h1>
                  <img src={logo} alt="BudgetOnTheGo Logo" />
                  <h2>Your personal budgeting companion for smarter spending and saving.</h2>
                  <button onClick={() => setIsRegistering(false)}>Already have an account? Login</button>
                </header>
                <Registration />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <header className="App-header">
                  <h1>Welcome to BudgetOnTheGo</h1>

                  <h2>Your personal budgeting companion for smarter spending and saving.</h2>
                  <button onClick={() => setIsRegistering(true)}>Need an account? Register</button>
                </header>
                <Login />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
