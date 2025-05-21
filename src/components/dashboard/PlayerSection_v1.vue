<template>
  <section class="section-card">
    <h2 class="section-heading">
      <el-icon>
        <User />
      </el-icon> Player Stats
    </h2>
    <div class="add-player-button">
      <el-button type="primary" @click="navigateToCreatePlayer">
        <el-icon>
          <Plus />
        </el-icon> Add New Player
      </el-button>
    </div>
    <PlayerCards :players="players" :getAverage="getAverage" @player-archived="handlePlayerDataChanged"
      @show-details="handleShowDetails" @player-updated="handlePlayerDataChanged" />
    <PlayerDetail v-if="selectedPlayer" :player="selectedPlayer" :visible="playerDialogVisible"
      @update:visible="playerDialogVisible = $event" />
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PlayerCards from './PlayerCards.vue'
import PlayerDetail from './PlayerDetail.vue'
import { User, Plus } from '@element-plus/icons-vue'
import { playerService } from '@/services/playerService'

// State
const players = ref([])
const playerDialogVisible = ref(false)
const selectedPlayer = ref(null)
const router = useRouter()

// Fetch Players
const fetchPlayers = async () => {
  try {
    players.value = await playerService.getAllPlayers();
  } catch (error) {
    console.error('Error fetching players:', error);
  }
};

// Get average skill value
const getAverage = (skills) => {
  const values = Object.values(skills)
  return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)
}

// Navigation
const navigateToCreatePlayer = () => {
  router.push('/create-player')
}

// Show details modal
const handleShowDetails = (player) => {
  selectedPlayer.value = player
  playerDialogVisible.value = true
}

// Handle player data change
const emit = defineEmits(['player-data-changed']);
const handlePlayerDataChanged = async () => {
  await fetchPlayers()
  // Optionally emit event to parent to update team stats/skills
  emit('player-data-changed')
}

onMounted(() => {
  fetchPlayers()
})
</script>