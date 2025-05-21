<template>
  <div class="section-card">
    <h2 class="section-heading">
      <el-icon>
        <Document />
      </el-icon> Recent Activity
    </h2>
    <div class="recent-activity-header">
      <el-button type="primary" @click="$emit('add-activity')">
        Add Activity
      </el-button>
    </div>
    <RecentActivity :recentActivity="recentActivity" @delete="$emit('delete', $event)" />
  </div>
</template>

<script setup>
import { Document } from '@element-plus/icons-vue'
import RecentActivity from './RecentActivity.vue'

defineProps({
  recentActivity: Array
})
</script>