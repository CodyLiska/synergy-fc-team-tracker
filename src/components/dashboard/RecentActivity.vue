<template>
  <div>
    <div class="filter-controls">
      <el-button size="small" :type="showGamesOnly ? 'primary' : 'default'" @click="showGamesOnly = !showGamesOnly">
        {{ showGamesOnly ? 'Show All' : 'Show Only Games' }}
      </el-button>
    </div>
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
        <tr v-if="filteredActivity.length === 0">
          <td colspan="5">No activity yet.</td>
        </tr>
        <tr v-for="activity in paginatedActivity" :key="activity._id">
          <td>{{ activity.date }}</td>
          <td>{{ activity.player }}</td>
          <td>{{ activity.activity }}</td>
          <td>{{ activity.details }}</td>
          <td class="delete-cell">
            <span class="delete-icon" @click="confirmDelete(activity)" title="Delete">🗑️</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-controls" v-if="totalPages > 1">
      <el-button size="small" :disabled="currentPage === 1" @click="prevPage">Previous</el-button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <el-button size="small" :disabled="currentPage === totalPages" @click="nextPage">Next</el-button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';
// import { recentActivityService } from '../../services/recentActivityService';

const props = defineProps({
  recentActivity: {
    type: Array,
    required: true
  }
});

const pageSize = 5;
const currentPage = ref(1);
const showGamesOnly = ref(false);

// Filter to display only games *might take out in the future, if a game summary page is added*
const filteredActivity = computed(() => {
  if (showGamesOnly.value) {
    return props.recentActivity.filter(a => a.activity === 'Game Outcome');
  }
  return props.recentActivity;
});

// Sort newest first
const sortedActivity = computed(() =>
  [...filteredActivity.value].sort((a, b) => new Date(b.date) - new Date(a.date))
);

const totalPages = computed(() => Math.ceil(props.recentActivity.length / pageSize));

const paginatedActivity = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return sortedActivity.value.slice(start, start + pageSize);
});

function confirmDelete(activity) {
  if (confirm(`Delete activity from ${activity.player}?`)) {
    // Notify parent to refresh player list
    emit("delete", activity);
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
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

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
}

.filter-controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}
</style>