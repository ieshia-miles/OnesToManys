import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [clients, setClients] = useState([]);
  const [status, setStatus] = useState("Loading clients...");

async function loadClients() {
  try {
    const response = await fetch("http://127.0.0.1.8000/clients");
    if (!response.ok) {
      throw new Error(`HTTP Error: $response.status`);
    }
    const data = await response.json();

    setClients(Array.isArray(data) ? data : data.clients || []);
    setStatus(`Loaded ${data.length || data.clients?.length || 0} clients`);
  } catch (error) {
    console.error(error);
    setStatus("Failed to load clients");
  }
}

useEffect(() => {
  loadClients();
}, []);
  return (
    <div className="App">
      <h1>Client Manager (React)</h1>
      <p>{status}</p>
      <p>Number of clients: {clients.length}</p>
    </div>
  );
}

export default App;
