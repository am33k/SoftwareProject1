// App.js
import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to PennyWise</h1> {/* Add your app name here */}
        <h2>Your personal budgeting companion for smarter spending and saving.</h2>

        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
        </button>
        {isRegistering ? <Registration /> : <Login />}
      </header>
    </div>
  );
}

export default App;
