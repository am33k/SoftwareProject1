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

  // Fetch budgets from backend (replace with actual API call)
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await fetch('http://localhost:61955/api/budgets');
        const data = await response.json();
        setBudgets(data);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:61955/api/transactions');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchBudgets();
    fetchTransactions();
  }, []);

  const handleBudgetSubmit = async (e) => {
    e.preventDefault();

    // API call to save the budget
    try {
      const response = await fetch('http://localhost:61955/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      const response = await fetch('http://localhost:61955/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });

      if (response.ok) {
        const savedTransaction = await response.json();
        setTransactions((prev) => [...prev, savedTransaction]);
        setNewTransaction({ description: '', category: '', amount: '', date: '' }); // Reset form
      } else {
        console.error('Failed to save transaction');
      }
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
                  {new Date(transaction.date).toLocaleDateString()} ({transaction.category})
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
