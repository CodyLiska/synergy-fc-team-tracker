<template>
  <section class="section-card team-skills-chart-section">
    <h2 class="section-heading">
      <el-icon>
        <DataAnalysis />
      </el-icon>
      Team Skills Overview
    </h2>
    <TeamSkillsChart :data="teamSkillsData" />
    <div v-if="teamSkillsData.labels[0] === 'No Data Available'">
      No player data available. Add players to see the chart.
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TeamSkillsChart from './TeamSkillsChart.vue'
import { DataAnalysis } from '@element-plus/icons-vue'
import { playerService } from '@/services/playerService'
import { teamStatsService } from '@/services/teamStatsService'

// --- TEAM STATS (for team rating) ---
const teamStats = ref({
  totalPlayers: 0,
  gamesPlayed: 0,
  winRate: '0%',
  teamRating: 0,
})

// --- TEAM SKILLS CHART DATA ---
const teamSkillsData = ref({
  labels: ['No Data Available'],
  datasets: [
    {
      label: 'No Data',
      backgroundColor: '#e0e0e0',
      data: [0],
    },
  ],
})

// Fetch team stats from backend (for team rating)
const fetchTeamStats = async () => {
  try {
    const stats = await teamStatsService.getTeamStats()
    teamStats.value.totalPlayers = stats.totalPlayers
    teamStats.value.gamesPlayed = stats.gamesPlayed
    teamStats.value.winRate = stats.winRate
    // teamRating will be set after bar chart averages are calculated
  } catch (err) {
    console.error('Error fetching team stats:', err)
  }
}

// Fetch and calculate team skills data
const fetchTeamSkillsData = async () => {
  try {
    const playersArr = await playerService.getAllPlayers()
    if (playersArr.length === 0) {
      teamSkillsData.value = {
        labels: ['No Data Available'],
        datasets: [
          {
            label: 'No Data',
            backgroundColor: '#e0e0e0',
            data: [0],
          },
        ],
      }
      teamStats.value.teamRating = 0
      return
    }

    // Initialize totals and counts for each category
    const totals = {
      psychological: 0,
      physical: 0,
      socialEmotional: 0,
      technical: 0,
    }
    const counts = {
      psychological: 0,
      physical: 0,
      socialEmotional: 0,
      technical: 0,
    }

    // Calculate totals and counts
    playersArr.forEach((player) => {
      Object.values(player.psychological || {}).forEach((value) => {
        totals.psychological += value
        counts.psychological++
      })
      Object.values(player.physical || {}).forEach((value) => {
        totals.physical += value
        counts.physical++
      })
      Object.values(player.socialEmotional || {}).forEach((value) => {
        totals.socialEmotional += value
        counts.socialEmotional++
      })
      Object.values(player.technical || {}).forEach((value) => {
        totals.technical += value
        counts.technical++
      })
    })

    // Calculate averages
    const averages = {
      psychological: counts.psychological ? (totals.psychological / counts.psychological).toFixed(1) : 0,
      physical: counts.physical ? (totals.physical / counts.physical).toFixed(1) : 0,
      socialEmotional: counts.socialEmotional
        ? (totals.socialEmotional / counts.socialEmotional).toFixed(1)
        : 0,
      technical: counts.technical ? (totals.technical / counts.technical).toFixed(1) : 0,
    }

    // Update chart data
    teamSkillsData.value = {
      labels: ['Psychological', 'Physical', 'Social/Emotional', 'Technical'],
      datasets: [
        {
          label: 'Team Average',
          backgroundColor: '#3498fd',
          data: [
            parseFloat(averages.psychological),
            parseFloat(averages.physical),
            parseFloat(averages.socialEmotional),
            parseFloat(averages.technical),
          ],
        },
      ],
    }

    // Calculate team rating as the average of the four category averages
    const avgValues = [
      parseFloat(averages.psychological),
      parseFloat(averages.physical),
      parseFloat(averages.socialEmotional),
      parseFloat(averages.technical),
    ]
    const teamRating =
      avgValues.reduce((sum, val) => sum + val, 0) / avgValues.length
    teamStats.value.teamRating = teamRating.toFixed(2)
  } catch (error) {
    console.error('Error fetching team skills data:', error)
  }
}

// Fetch data on mount
onMounted(() => {
  fetchTeamStats()
  fetchTeamSkillsData()
})

// Optionally, export fetchTeamSkillsData and fetchTeamStats if parent needs to trigger updates
defineExpose({
  fetchTeamSkillsData,
  fetchTeamStats,
})
</script>

<style scoped>
.team-skills-chart-section {
  margin-bottom: 2rem;
}

.section-heading {
  display: flex;
  align-items: center;
  font-size: 1.2em;
  margin-bottom: 1rem;
}

.section-heading .el-icon {
  margin-right: 0.5em;
}
</style>