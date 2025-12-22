import React, { useEffect, useState } from "react";
import "./App.css";

const API_BASE = "http://127.0.0.1:8000";

export default function App() {
  const [clients, setClients] = useState([]);
  const [status, setStatus] = useState("Loading clients...");

  const [selectedClientId, setSelectedClientId] = useState(null);
  const [selectedClientName, setSelectedClientName] = useState("");
  const [records, setRecords] = useState([]);
  const [recordsStatus, setRecordsStatus] = useState("Select a client.");

  async function loadClients() {
    try {
      const res = await fetch(`${API_BASE}/clients`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.Clients ?? [];
      setClients(list);
      setStatus(`Loaded ${list.length} clients`);
    } catch (e) {
      console.error(e);
      setStatus("Failed to load clients");
    }
  }

  async function loadServiceRecords(client) {
    const clientId = client.client_id;
    setSelectedClientId(clientId);
    setSelectedClientName(`${client.first_name} ${client.last_name}`);
    setRecords([]);
    setRecordsStatus("Loading service records...");

    try {
      const res = await fetch(`${API_BASE}/clients/${clientId}/service_records`);
      const data = await res.json();
      const list = data.service_records ?? [];
      setRecords(list);
      setRecordsStatus(list.length ? "Loaded." : "No service records for this client.");
    } catch (e) {
      console.error(e);
      setRecordsStatus("Failed to load service records");
    }
  }

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <div className="App" style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h1>Client Manager (React)</h1>
      <p>{status}</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <section>
          <h2>Clients</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {clients.map((c) => (
              <li key={c.client_id} style={{ marginBottom: 8 }}>
                <button
                  onClick={() => loadServiceRecords(c)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 10px",
                    borderRadius: 6,
                    border: "1px solid #ddd",
                    background: c.client_id === selectedClientId ? "#dbeafe" : "white",
                    cursor: "pointer",
                  }}
                >
                  {c.first_name} {c.last_name}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Service Records</h2>
          <p><b>{selectedClientName || "None selected"}</b></p>
          <p>{recordsStatus}</p>

          {records.length > 0 && (
            <ul>
              {records.map((r) => (
                <li key={r.record_id}>
                  {r.service_type} — {r.date_received}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

