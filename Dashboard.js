import React from 'react';

const Dashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
          <h2>Stats</h2>
          <p>Users: 120</p>
          <p>Sales: $3,400</p>
        </div>
        <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
          <h2>Recent Activity</h2>
          <ul>
            <li>User John signed up</li>
            <li>Order #1234 completed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
