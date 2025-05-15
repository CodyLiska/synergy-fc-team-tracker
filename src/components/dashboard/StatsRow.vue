<template>
  <div class="stats-row-title">Team Stats</div>
  <el-row :gutter="24" class="dashboard-stats-row">
    <el-col :xs="24" :sm="12" :md="6" v-for="stat in statsArray" :key="stat.label">
      <el-card class="stat-card">
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-label">{{ stat.label }}</div>
        <div class="stat-desc">{{ stat.desc }}</div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { defineProps } from 'vue';
import { teamStatsService } from '../../services/teamStatsService';

defineProps({
  statsArray: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.stats-row-title {
  margin: 32px 0 12px 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: 0.04em;
}

.stats-row {
  padding: 0 16px;
}

.dashboard-stats-row {
  margin: 0;
}

.stat-card {
  background: var(--card-bg);
  color: var(--text-main);
  border-color: var(--border) !important;
  border-radius: 12px;
  box-shadow: none;
  text-align: left;
  min-height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
}

.stat-label {
  font-size: 1.1rem;
  margin-top: 8px;
}

.stat-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
}

:deep(.el-card) {
  background: var(--card-bg) !important;
  color: var(--text-main) !important;
  border-color: var(--border) !important;
}
</style>