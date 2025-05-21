<template>
  <div class="section-card team-skills-chart-section">
    <h2 class="section-heading">
      <el-icon>
        <DataAnalysis />
      </el-icon> Team Skills Overview
    </h2>
    <TeamSkillsChart :data="teamSkillsData" />
    <div v-if="teamSkillsData.labels[0] === 'No Data Available'">
      No player data available. Add players to see the chart.
    </div>
  </div>
</template>

<script setup>
import { DataAnalysis } from '@element-plus/icons-vue'
import TeamSkillsChart from './TeamSkillsChart.vue'

defineProps({
  teamSkillsData: Object
})
</script>