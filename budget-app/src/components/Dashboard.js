import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import CSS for styling

function Dashboard() {
  const [user, setUser] = useState({ name: 'John Doe' }); // Replace with dynamic user data from backend
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({ category: '', amount: '' });
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    category: '',
    amount: '',
    date: '',
  });

  const token = localStorage.getItem('authToken');

  // Fetch budgets from backend (replace with actual API call)

  const fetchBudgets = async () => {
    try {

      // Send the request with the Authorization header
      const response = await fetch('http://localhost:61955/api/Budget', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBudgets(data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };


  const fetchTransactions = async () => {
    try {


      const response = await fetch('http://localhost:61955/api/Transaction', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const transactions = await response.json();
      console.log('transactions list:', transactions)
      setTransactions(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchBudgets();
    fetchTransactions();
  }, []);

  const handleBudgetSubmit = async (e) => {
    e.preventDefault();


    // API call to save the budget
    try {
      const response = await fetch('http://localhost:61955/api/Budget', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBudget),
      });

      if (response.ok) {
        const savedBudget = await response.json();
        setBudgets((prev) => [...prev, savedBudget]);
        setNewBudget({ category: '', amount: '' }); // Reset form
      } else {
        console.error('Failed to save budget');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();

    // API call to save the transaction
    try {
      const response = await fetch('http://localhost:61955/api/Transaction', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTransaction),
      });


      const savedTransaction = await response.json();
      setTransactions((prev) => [...prev, savedTransaction]);
      setNewTransaction({ description: '', category: '', amount: '', date: '' }); // Reset form

    } catch (error) {
      console.error('Error:', error);
    }
  };




  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}!</h1>
      <p>Your personalized budgeting dashboard.</p>

      <div className="dashboard-sections">
        {/* Current Budgets Section */}
        <div className="budgets-section">
          <h2>Your Current Budgets</h2>
          {budgets.length > 0 ? (
            <ul>
              {budgets.map((budget, index) => (
                <li key={index}>
                  <strong>{budget.category}:</strong> ${budget.amount}
                </li>
              ))}
            </ul>
          ) : (
            <p>No budgets set yet.</p>
          )}
        </div>

        {/* Set New Budget Section */}
        <div className="new-budget-section">
          <h2>Set a New Budget</h2>
          <form onSubmit={handleBudgetSubmit}>
            <div className="form-group">
              <label>Category:</label>
              <input
                type="text"
                value={newBudget.category}
                onChange={(e) =>
                  setNewBudget({ ...newBudget, category: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Amount:</label>
              <input
                type="number"
                value={newBudget.amount}
                onChange={(e) =>
                  setNewBudget({ ...newBudget, amount: e.target.value })
                }
                required
              />
            </div>
            <button type="submit">Add Budget</button>
          </form>
        </div>

        {/* Recent Transactions Section */}
        <div className="transactions-section">
          <h2>Recent Transactions</h2>
          {transactions.length > 0 ? (
            <ul>
              {transactions.map((transaction, index) => (
                <li key={index}>
                  <strong>{transaction.description}</strong> - ${transaction.amount} on{' '}
                  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(transaction.date))} ({transaction.category})
                </li>
              ))}
            </ul>
          ) : (
            <p>No transactions recorded yet.</p>
          )}

          {/* Add New Transaction */}
          <h2>Add a Transaction</h2>
          <form onSubmit={handleTransactionSubmit}>
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                value={newTransaction.description}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, description: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <input
                type="text"
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, category: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Amount:</label>
              <input
                type="number"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, amount: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, date: e.target.value })
                }
                required
              />
            </div>
            <button type="submit">Add Transaction</button>
          </form>
        </div>

        {/* Overview Section */}
        <div className="overview-section">
          <h2>Overview</h2>
          <p>Here you can add charts and analytics for the user’s spending.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
