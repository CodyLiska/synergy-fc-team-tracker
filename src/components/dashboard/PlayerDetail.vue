<!-- EVENTUALLY MOVE TO src/components/player/PlayerDetail.vue -->

<template>
  <el-dialog :model-value="localVisible" title="Edit Player" width="500px" @close="handleClose">
    <div class="player-basic">
      <!-- <div class="player-name">{{ player.name }}</div>
      <div><strong>Number:</strong> {{ player.number }}</div>
      <div><strong>Position:</strong> {{ player.position }}</div> -->
      <el-form :model="editablePlayer" label-width="140px">
        <el-form-item label="Name">
          <el-input v-model="editablePlayer.name" />
        </el-form-item>
        <el-form-item label="Number">
          <el-input-number v-model="editablePlayer.number" :min="0" />
        </el-form-item>
        <el-form-item label="Position">
          <el-input v-model="editablePlayer.position" />
        </el-form-item>

        <!-- Editable skill maps -->
        <template v-for="(category, label) in skillLabels" :key="label">
          <el-divider>{{ label }}</el-divider>
          <el-form-item v-for="(value, skill) in editablePlayer[category]" :key="skill" :label="capitalize(skill)">
            <el-input-number v-model.number="editablePlayer[category][skill]" :min="0" :max="10" />
          </el-form-item>
        </template>
      </el-form>
    </div>
    <!-- <pre>{{ player }}</pre> -->
    <!-- <div class="player-stats">
      <div v-for="category in skillCategories" :key="category.label" class="stat-category">
        <h4>{{ category.label }}</h4>
        <ul>
          <li v-for="skill in category.skills" :key="skill.key">
            <span>{{ skill.label }}:</span>
            <span class="stat-value">{{ getSkillValue(category.label, skill.key) }}</span>
          </li>
        </ul>
      </div>
    </div> -->
    <template #footer>
      <el-button @click="cancelChanges">Cancel</el-button>
      <el-button type="primary" @click="saveChanges">Save</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { watch, ref } from 'vue';

const props = defineProps({
  player: Object,
  visible: Boolean
});

// Local state to control dialog visibility
const localVisible = ref(props.visible);

// Watch for prop changes to sync local state
watch(() => props.visible, (val) => {
  localVisible.value = val;
});

// Watch for local state changes to sync with prop
const editablePlayer = ref({ ...props.player });

// Watch for changes in the player prop and update local state
watch(
  () => props.player,
  (newPlayer) => {
    editablePlayer.value = { ...newPlayer };
  },
  { immediate: true }
);

const emit = defineEmits(["update:visible", "player-updated"]);

const skillLabels = {
  psychological: "Psychological",
  physical: "Physical",
  socialEmotional: "Social/Emotional",
  technical: "Technical",
};

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const saveChanges = () => {
  emit("player-updated", editablePlayer.value);
  emit("update:visible", false); // close dialog
};

const cancelChanges = () => {
  emit("update:visible", false); // close dialog without emitting changes
};

// Emit update when dialog is closed
// function handleClose() {
//   localVisible.value = false;
//   emit('update:visible', false);
// };

const skillCategories = [
  {
    label: "PSYCHOLOGICAL",
    skills: [
      { label: "Self-Confidence", key: "selfConfidence" },
      { label: "Competitiveness", key: "competitiveness" },
      { label: "Concentration", key: "concentration" },
      { label: "Self-Control", key: "selfControl" },
      { label: "Determination", key: "determination" },
      { label: "Enjoyment", key: "enjoyment" }
    ]
  },
  {
    label: "PHYSICAL",
    skills: [
      { label: "Agility", key: "agility" },
      { label: "Balance", key: "balance" },
      { label: "Coordination", key: "coordination" },
      { label: "Stamina", key: "stamina" },
      { label: "Strength", key: "strength" },
      { label: "Speed", key: "speed" },
      { label: "Acceleration", key: "acceleration" },
      { label: "Reaction", key: "reaction" }
    ]
  },
  {
    label: "SOCIAL/EMOTIONAL",
    skills: [
      { label: "Listening", key: "listening" },
      { label: "Cooperation", key: "cooperation" },
      { label: "Communication", key: "communication" },
      { label: "Sharing", key: "sharing" },
      { label: "Problem-Solving", key: "problemSolving" },
      { label: "Decision-Making", key: "decisionMaking" },
      { label: "Empathy", key: "empathy" },
      { label: "Patience", key: "patience" },
      { label: "Respect/Discipline", key: "respectDiscipline" }
    ]
  },
  {
    label: "TECHNICAL",
    skills: [
      { label: "Dribbling", key: "dribbling" },
      { label: "Shooting", key: "shooting" },
      { label: "Running With Ball", key: "runningWithBall" },
      { label: "Turning With Ball", key: "turningWithBall" },
      { label: "Receiving The Ball", key: "receivingTheBall" },
      { label: "Passing", key: "passing" }
    ]
  }
];

// Helper to get the player's value for a skill
function getSkillValue(category, skillKey) {
  const keyMap = {
    PSYCHOLOGICAL: 'psychological',
    PHYSICAL: 'physical',
    "SOCIAL/EMOTIONAL": 'socialEmotional',
    TECHNICAL: 'technical'
  };
  const playerCategory = keyMap[category];
  if (!props.player || !props.player[playerCategory]) return '-';
  return props.player[playerCategory][skillKey] !== undefined
    ? props.player[playerCategory][skillKey]
    : '-';
}
</script>

<style scoped>
.player-basic {
  margin-bottom: 1rem;
}

.player-name {
  font-size: 1.5em;
  font-weight: bold;
  color: var(--primary, #409eff);
  margin-bottom: 0.5em;
  text-align: center;
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