import React from 'react';

function Dashboard() {
  return (
    <div style={{ padding: '20px', background: '#0f172a', color: '#fff', minHeight: '100vh' }}>
      <h1>Recruiter Dashboard</h1>
      <p>Welcome to your hiring dashboard. Here is a list of candidates:</p>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Active Candidates</h3>
        <div style={{ border: '1px solid #334155', padding: '10px', margin: '10px 0', borderRadius: '8px' }}>
          <strong>John Doe</strong> - Score: 85
          <p>Status: Pending Vetting</p>
        </div>
        <div style={{ border: '1px solid #334155', padding: '10px', margin: '10px 0', borderRadius: '8px' }}>
          <strong>Jane Smith</strong> - Score: 92
          <p>Status: Vetted (Approved)</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
