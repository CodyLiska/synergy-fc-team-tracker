<template>
  <div class="section-card">
    <h2 class="section-heading">
      <el-icon>
        <TrendCharts />
      </el-icon> Team Stats
    </h2>
    <StatsRow :statsArray="statsArray" />
    <div class="add-game-outcome-button">
      <el-button type="primary" @click="$emit('add-game')" style="margin-top: 10px;">
        Add Game Outcome
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { TrendCharts } from '@element-plus/icons-vue'
import StatsRow from './StatsRow.vue'

defineProps({
  statsArray: Array
})
</script>