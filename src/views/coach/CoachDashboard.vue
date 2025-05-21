<template>
  <PageWrapper>
    <div class="main-container coach-dashboard">

      <!-- Team Stats -->
      <TeamStatsSection :statsArray="statsArray" @add-game="navigateToAddGameOutcome" />

      <!-- Team Skills -->
      <TeamSkillsSection :teamSkillsData="teamSkillsData" />

      <!-- Player Stats -->

      <PlayerStatsSection :players="players" :getAverage="getAverage" :selectedPlayer="selectedPlayer"
        :playerDialogVisible="playerDialogVisible" @add-player="navigateToCreatePlayer" @refresh="handleTeamDataChanged"
        @show-details="handleShowDetails" @update:dialogVisible="val => playerDialogVisible = val" />

      <!-- Recent Activity -->
      <RecentActivitySection :recentActivity="combinedRecent" @add-activity="navigateToAddActivity"
        @delete="handleDeleteRecent" />

    </div>
  </PageWrapper>
</template>

<script setup>
// import { useCoachDashboard } from '@/composables/useCoachDashboard'
import { useCoachDashboard } from '../../composables/useCoachDashboard'
import PageWrapper from '@/components/ui/PageWrapper.vue'

import TeamStatsSection from '@/components/dashboard/TeamStatsSection.vue'
import TeamSkillsSection from '@/components/dashboard/TeamSkillsSection.vue'
import PlayerStatsSection from '@/components/dashboard/PlayerStatsSection.vue'
import RecentActivitySection from '@/components/dashboard/RecentActivitySection.vue'

import { useRouter } from 'vue-router'

const {
  players,
  selectedPlayer,
  playerDialogVisible,
  statsArray,
  teamSkillsData,
  combinedRecent,
  fetchTeamStats,
  fetchTeamSkillsData,
  handleDeleteRecent
} = useCoachDashboard()

const router = useRouter()

const navigateToAddGameOutcome = () => {
  router.push('/coach/add-game-outcome')
}

const navigateToCreatePlayer = () => {
  router.push('/coach/add-player') // This matches your actual file
}

const navigateToAddActivity = () => {
  router.push('/coach/add-activity')
} 

const handleTeamDataChanged = () => {
  fetchTeamStats()
  fetchTeamSkillsData()
}

const handleShowDetails = (player) => {
  selectedPlayer.value = player
  playerDialogVisible.value = true
}
</script>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  width: 100%;
  overflow-x: hidden;
}

.coach-dashboard {
  padding: 16px 0 32px 0;
}

.section-heading:not(:first-child) {
  border-top: 1px solid #eee;
  padding-top: 24px;
}

.add-game-outcome-button,
.add-player-button,
.recent-activity-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}
</style>