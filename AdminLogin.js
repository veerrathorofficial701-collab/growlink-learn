import React, { useState } from 'react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    alert('Logged in as admin');
  };
  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '2rem', background: '#f9f9f9', borderRadius: 8 }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%' }} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
