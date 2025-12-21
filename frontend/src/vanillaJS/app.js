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

    // Works whether API returns [...] or { Clients: [...] }
    const clients = Array.isArray(data) ? data : data.Clients;
    // const clients = await res.json();
    console.log("clients JSON:", clients);

    statusEL.textContent = `Loaded ${clients.length} clients`;
    listEL.innerHTML = ""; //clear list

    clients.forEach((client) => {
        const li = document.createElement("li");
        li.textContent = `${client.first_name} ${client.last_name}`;

        li.addEventListener("click", () => {
            document.querySelectorAll("#clientsList li").forEach((item) => {
                item.classList.remove("selected");
            });

            li.classList.add("selected");
            loadServiceRecords(
                client.client_id,
                `${client.first_name} ${client.last_name}`
            );
        });
        listEL.appendChild(li);
    });
}

async function loadServiceRecords(client_id, clientName) {
    const recordsPanelEl = document.getElementById("recordsPanel");
    // show loading text immediately
    recordsPanelEl.innerHTML = `<p>Loading service records for <b>${clientName}</b>...</p>`;

    const res = await fetch(
        `http://127.0.0.1:8000/clients/${client_id}/service_records`
    );

    const data = await res.json();
    const records = data.service_records;

    if (!records || records.length === 0) {
        recordsPanelEl.innerHTML = `<p>No service records for this client.<p>`;
        return;
    }

    const ul = document.createElement("ul");
    records.forEach((record) => {
        const li = document.createElement("li");
        li.textContent = `${record.service_type} - ${record.date_received}`;
        ul.appendChild(li);
    });
    recordsPanelEl.innerHTML = "";
    recordsPanelEl.appendChild(ul);
}

loadClients();