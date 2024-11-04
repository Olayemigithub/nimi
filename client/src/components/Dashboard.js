import React, { useEffect, useState } from 'react';
import './dashboard.css'; // Ensure you create this CSS file

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Simulate fetching data from an API
  useEffect(() => {
    // Fetch the data from an API or backend
    const fetchDashboardData = async () => {
      try {
        // Replace this with actual API calls
        const fetchedBalance = 1234.56;
        const fetchedTransactions = [
          { id: 1, description: 'Payment to XYZ', amount: 50.00 },
          { id: 2, description: 'Payment from ABC', amount: 100.00 },
          { id: 3, description: 'Bill Payment', amount: 30.00 }
        ];
        const fetchedNotifications = [
          'Payment from John received',
          'Reminder: Bill Payment due tomorrow',
          'New message from Support'
        ];

        // Update state
        setBalance(fetchedBalance);
        setTransactions(fetchedTransactions);
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card-header">
          <h2>Total Balance</h2>
          <p className="card-text">${balance.toFixed(2)}</p>
        </div>
        <div className="card-body">
          <h2 className="card-text">Recent Transactions</h2>
          <ul>
            {transactions.map(transaction => (
              <li key={transaction.id}>
                {transaction.description}: ${transaction.amount.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-body">
          <h2 className="card-text">Notifications</h2>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
