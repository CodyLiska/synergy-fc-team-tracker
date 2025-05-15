<template>
  <div>
    <h3>Recent Activity</h3>
    <table class="activity-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Player</th>
          <th>Activity</th>
          <th>Details</th>
          <th style="width: 40px;"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="activity in recentActivity" :key="activity._id">
          <td>{{ activity.date }}</td>
          <td>{{ activity.player }}</td>
          <td>{{ activity.activity }}</td>
          <td>{{ activity.details }}</td>
          <!-- <td class="delete-cell">
            <span class="delete-icon" @click="deleteActivity(activity._id)" title="Delete">🗑️</span>
          </td> -->
          <td class="delete-cell">
            <span class="delete-icon" @click="$emit('delete', activity)" title="Delete">🗑️</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
// import { recentActivityService } from '../../services/recentActivityService';

const props = defineProps({
  recentActivity: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.activity-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 1rem;
  margin-bottom: 2rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  border-radius: 16px;
  overflow: hidden;
}

.activity-table th,
.activity-table td {
  border-right: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
  padding: 0.75rem 1rem;
  text-align: left;
}

.activity-table th:last-child,
.activity-table td:last-child {
  border-right: none;
}

.activity-table tr:last-child td {
  border-bottom: none;
}

.activity-table th {
  background: #f5f5f5;
  font-weight: bold;
}

.activity-table thead tr:first-child th:first-child {
  border-top-left-radius: 16px;
}

.activity-table thead tr:first-child th:last-child {
  border-top-right-radius: 16px;
}

.activity-table tbody tr:last-child td:first-child {
  border-bottom-left-radius: 16px;
}

.activity-table tbody tr:last-child td:last-child {
  border-bottom-right-radius: 16px;
}

.delete-cell {
  text-align: right;
}

.delete-icon {
  color: red;
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.2s;
  margin-left: 8px;
}

.delete-icon:hover {
  color: darkred;
}
</style>