console.log("status element:", document.getElementById("status"));
console.log("clientsList element:", document.getElementById("clientsList"))
console.log("recordsPanel element:", document.getElementById("recordsPanel"))
console.log("app.js loaded")

async function loadClients() {

    const statusEL = document.getElementById("status");
    const listEL = document.getElementById("clientsList");
    const recordsPanelEl = document.getElementById("recordsPanel");

    if (!statusEL || !listEL) {
        console.error("Missing DOM elements:", { statusEL, listEL });
        return;
    }

    const res = await fetch("http://127.0.0.1:8000/clients");
    const data = await res.json();
    const clients = Array.isArray(data) ? data : data.Clients;
    // const clients = await res.json();
    console.log("clients JSON:", clients);

    statusEL.textContent = `Loaded ${clients.length} clients`;

    listEL.innerHTML = ""; //clear list

    clients.forEach(client => {
        const li = document.createElement("li");
        li.textContent = `${client.first_name} ${client.last_name}`;
        listEL.appendChild(li);
    });
}

loadClients();
