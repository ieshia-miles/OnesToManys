<script setup>
import { ref, onMounted } from 'vue'

const clients = ref([]);
const status = ref("Loading clients...");

const selectedClientName = ref("");
const serviceRecords = ref([]);
const loadingRecords = ref(false);


async function loadClients() {
  try {
    const res = await fetch("http://127.0.0.1:8000/clients");
    const data = await res.json();

    clients.value = Array.isArray(data) ? data : data.clients;
    status.value = `Loaded ${clients.value.length} clients`;
  } catch (err) {
    console.error(err);
      status.value = "Failed to load clients";
  }
}

async function selectClient(client) {
  console.log("Selected client:", client);
  selectedClientName.value = `${client.first_name} ${client.last_name}`;
  serviceRecords.value = [];
  loadingRecords.value = true;

  try {
  const res = await fetch(
    `http://127.0.0.1:8000/clients/${client.client_id}/service_records`
  );
  const data = await res.json();
  console.log("Service records:", data.service_records);
  serviceRecords.value = data.service_records || [];
  } catch (err) {
    console.error(err);
  } finally {
  loadingRecords.value = false;
}
}
onMounted(loadClients);
</script>

<template>
  <h1>Task Manager (Vue)</h1>
  <p>{{ status }}</p>

  <ul>
    <li v-for="client in clients" :key="client.client_id"
    @click="selectClient(client)"
    >
      {{ client.first_name }} {{ client.last_name }}
    </li>
  </ul>

  <!-- Service Records -->
  <h2>Service Records</h2>
  <p v-if="loadingRecords">Loading records...</p>
  <p v-else-if="!selectedClientName">Select a client to see service records.</p>

  <ul v-else>
    <li v-for="r in serviceRecords" :key="r.record_id">
    {{ r.service_type }} - {{ r.date_received }}
    </li>
  </ul>
</template>

<style scoped></style>
