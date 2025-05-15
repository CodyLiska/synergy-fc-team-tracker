<!-- EVENTUALLY MOVE TO src/components/player/PlayerDetail.vue -->

<template>
  <el-dialog :model-value="localVisible" :title="`Player Details: ${player.name}`" width="400px" @close="handleClose">
    <div class="player-basic">
      <div><strong>Name:</strong> {{ player.name }}</div>
      <div><strong>Number:</strong> {{ player.number }}</div>
      <div><strong>Position:</strong> {{ player.position }}</div>
    </div>
    <div class="player-stats">
      <div v-for="(skills, category) in statsHierarchy" :key="category" class="stat-category">
        <h4>{{ category }}</h4>
        <ul>
          <li v-for="skill in skills" :key="skill">
            <span>{{ skill }}:</span>
            <span class="stat-value">{{ getSkillValue(category, skill) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { watch, ref } from 'vue';

const props = defineProps({
  player: Object,
  visible: Boolean
});
const emit = defineEmits(['update:visible']);

// Local state to control dialog visibility
const localVisible = ref(props.visible);

// Watch for prop changes to sync local state
watch(() => props.visible, (val) => {
  localVisible.value = val;
});

// Emit update when dialog is closed
function handleClose() {
  localVisible.value = false;
  emit('update:visible', false);
};

// The stats hierarchy as an object
const statsHierarchy = {
  PSYCHOLOGICAL: [
    "SELF CONFIDENCE",
    "COMPETITIVENESS",
    "CONCENTRATION",
    "SELF-CONTROL",
    "DETERMINATION",
    "ENJOYMENT"
  ],
  PHYSICAL: [
    "AGILITY",
    "BALANCE",
    "COORDINATION",
    "STAMINA",
    "STRENGTH",
    "SPEED",
    "ACCELERATION",
    "REACTION"
  ],
  "SOCIAL/EMOTIONAL": [
    "LISTENING",
    "COOPERATION",
    "COMMUNICATION",
    "SHARING",
    "PROBLEM-SOLVING",
    "DECISION-MAKING",
    "EMPATHY",
    "PATIENCE",
    "RESPECT/DISCIPLINE"
  ],
  TECHNICAL: [
    "DRIBBLING",
    "SHOOTING",
    "RUNNING WITH BALL",
    "TURNING WITH BALL",
    "RECEIVING THE BALL",
    "PASSING"
  ]
};

// Helper to get the player's value for a skill
function getSkillValue(category, skill) {
  // Map category keys to player object keys
  const keyMap = {
    PSYCHOLOGICAL: 'psychological',
    PHYSICAL: 'physical',
    "SOCIAL/EMOTIONAL": 'socialEmotional',
    TECHNICAL: 'technical'
  };
  const playerCategory = keyMap[category];
  if (!props.player || !props.player[playerCategory]) return '-';
  // Some keys may have underscores or dashes, so normalize
  const normalizedSkill = skill.replace(/[\s/-]/g, '');
  // Try to find the skill in the player's data (case-insensitive)
  const found = Object.entries(props.player[playerCategory]).find(
    ([k]) => k.replace(/[\s/-]/g, '').toUpperCase() === normalizedSkill.toUpperCase()
  );
  return found ? found[1] : '-';
}
</script>

<style scoped>
.player-basic {
  margin-bottom: 1rem;
}

.player-stats {
  margin-top: 1rem;
}

.stat-category {
  margin-bottom: 1rem;
}

.stat-category h4 {
  margin-bottom: 0.5rem;
  font-size: 1.05rem;
  color: var(--primary, #409eff);
}

.stat-value {
  font-weight: bold;
  margin-left: 0.5em;
}
</style>