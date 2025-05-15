<!-- EVENTUALLY MOVE TO src/components/player/PlayerCards.vue -->

<template>
  <div>
    <div class="player-section-title">Player Stats</div>
    <el-row :gutter="24" class="player-cards-row">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="player in players" :key="player._id">
        <el-card class="player-card">
          <button class="edit-btn" @click="openEditDialog(player)" title="Edit Player">
            ✏️
          </button>
          <div class="player-name">{{ player.name }}</div>
          <div class="player-number">#{{ player.number }}</div>
          <div class="player-position">Position: {{ player.position }}</div>
          <div class="player-averages">
            <div>Psychological: {{ getAverage(player.psychological) }}</div>
            <div>Physical: {{ getAverage(player.physical) }}</div>
            <div>Social/Emotional: {{ getAverage(player.socialEmotional) }}</div>
            <div>Technical: {{ getAverage(player.technical) }}</div>
          </div>
          <div class="card-actions">
            <el-button class="details-btn" size="small" @click="$emit('show-details', player)">
              View Details
            </el-button>
            <el-button class="delete-btn" size="small" type="danger"
              @click="openDeleteDialog(player)">Delete</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-model="deleteDialogVisible" title="Confirm Delete" width="350px" :before-close="handleDialogClose">
      <span>Are you sure you want to archive this player?</span>
      <template #footer>
        <el-button @click="deleteDialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="confirmDelete">Yes, Archive</el-button>
      </template>
    </el-dialog>
    <PlayerEdit v-if="playerToEdit" :player="playerToEdit" :visible="editDialogVisible"
      @update:visible="editDialogVisible = $event" @player-updated="handlePlayerUpdated" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { playerService } from '../../services/playerService';
import PlayerEdit from '../player/PlayerEdit.vue';

defineProps({
  players: Array,
  getAverage: Function
});
defineEmits(['show-details', 'player-archived']);

const deleteDialogVisible = ref(false);
const playerToDelete = ref(null);

// Edit modal state
const editDialogVisible = ref(false);
const playerToEdit = ref(null);

function openDeleteDialog(player) {
  playerToDelete.value = player;
  deleteDialogVisible.value = true;
}

function handleDialogClose() {
  deleteDialogVisible.value = false;
  playerToDelete.value = null;
}

function openEditDialog(player) {
  playerToEdit.value = player;
  editDialogVisible.value = true;
}

async function confirmDelete() {
  if (!playerToDelete.value) return;
  try {
    await playerService.archivePlayer(playerToDelete.value._id);
    ElMessage.success('Player archived successfully!');
    deleteDialogVisible.value = false;
    playerToDelete.value = null;
    // Notify parent to refresh player list
    // (emit an event or call a prop function as needed)
    // Example:
    // emit('player-archived');
    window.location.reload(); // Or use a better state update if available
  } catch (err) {
    ElMessage.error('Failed to archive player.');
  }
}

async function handlePlayerUpdated(updatedPlayer) {
  try {
    await playerService.updatePlayer(updatedPlayer._id, updatedPlayer);
    ElMessage.success('Player updated!');
    window.location.reload();
  } catch (err) {
    ElMessage.error('Failed to update player.');
  }
}

</script>

<style scoped>
.player-section-title {
  margin: 32px 0 12px 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: 0.04em;
}

.player-cards {
  padding: 0 16px;
}

.player-cards-row {
  margin: 0;
}

.player-card {
  position: relative;
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

.player-name {
  font-size: 1.15rem;
  font-weight: bold;
}

.player-number,
.player-position {
  font-size: 0.98rem;
  color: var(--text-secondary);
  margin-bottom: 2px;
}

.player-averages {
  margin: 12px 0;
  font-size: 0.98rem;
}

.card-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}

.details-btn,
.delete-btn {
  margin-top: 0;
}

.edit-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 2;
  transition: color 0.2s;
}

.edit-btn:hover {
  color: var(--primary, #409eff);
}

.delete-btn {
  margin-top: 0;
}
</style>