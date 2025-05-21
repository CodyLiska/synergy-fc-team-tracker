<template>
  <div class="section-card">
    <h2 class="section-heading">
      <el-icon>
        <User />
      </el-icon> Player Stats
    </h2>
    <div class="add-player-button">
      <el-button type="primary" @click="$emit('add-player')">
        <el-icon>
          <Plus />
        </el-icon> Add New Player
      </el-button>
    </div>
    <PlayerCards :players="players" :getAverage="getAverage" @player-archived="$emit('refresh')"
      @player-updated="$emit('refresh')" @show-details="$emit('show-details', $event)" />
    <PlayerDetail v-if="selectedPlayer" :player="selectedPlayer" :visible="playerDialogVisible"
      @update:visible="$emit('update:dialogVisible', $event)" />
  </div>
</template>

<script setup>
import { User, Plus } from '@element-plus/icons-vue'
import PlayerCards from './PlayerCards.vue'
import PlayerDetail from './PlayerDetail.vue'

defineProps({
  players: Array,
  getAverage: Function,
  selectedPlayer: Object,
  playerDialogVisible: Boolean
})
</script>