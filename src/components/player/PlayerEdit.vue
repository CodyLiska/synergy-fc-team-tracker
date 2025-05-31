<template>
  <el-dialog :model-value="visible" title="Edit Player" width="700px" @close="handleClose">
    <div class="edit-player-dialog-body">
      <el-form :model="form" label-width="140px" class="edit-player-form">
        <el-form-item label="Name">
          <el-input v-model="form.name" required />
        </el-form-item>
        <el-form-item label="Number">
          <el-input v-model.number="form.number" type="number" min="0" max="5" required />
        </el-form-item>
        <el-form-item label="Position">
          <el-input v-model="form.position" required />
        </el-form-item>

        <template v-for="(skills, category) in skillCategories" :key="category">
          <el-divider>{{ category }}</el-divider>
          <el-form-item v-for="skill in skills" :key="skill" :label="skill.replace(/_/g, ' ')" class="skill-form-item">
            <el-input v-model.number="form[category][skill]" type="number" :min="0" :max="5" />
          </el-form-item>
        </template>
      </el-form>
    </div>
    <template #footer>
      <el-button @click="handleClose">Cancel</el-button>
      <el-button type="primary" @click="submit">Save</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, watch, toRefs } from 'vue';

const props = defineProps({
  player: Object,
  visible: Boolean,
});
// Notify parent to refresh player list
const emit = defineEmits(['update:visible', 'player-updated']);

const skillCategories = {
  psychological: [
    "selfConfidence",
    "competitiveness",
    "concentration",
    "selfControl",
    "determination",
    "enjoyment"
  ],
  physical: [
    "agility",
    "balance",
    "coordination",
    "stamina",
    "strength",
    "speed",
    "acceleration",
    "reaction"
  ],
  socialEmotional: [
    "listening",
    "cooperation",
    "communication",
    "sharing",
    "problemSolving",
    "decisionMaking",
    "empathy",
    "patience",
    "respectDiscipline"
  ],
  technical: [
    "dribbling",
    "shooting",
    "runningWithBall",
    "turningWithBall",
    "receivingTheBall",
    "passing"
  ]
};

function categoryKey(category) {
  return category;
}

const form = reactive({
  name: '',
  number: '',
  position: '',
  psychological: {},
  physical: {},
  socialEmotional: {},
  technical: {},
});

// Sync form with player prop
watch(
  () => props.player,
  (player) => {
    if (player) {
      form.name = player.name;
      form.number = player.number;
      form.position = player.position;
      for (const cat of Object.keys(skillCategories)) {
        form[cat] = { ...player[cat] };
        for (const skill of skillCategories[cat]) {
          form[cat][skill] = player[cat]?.[skill] ?? 0;
        }
      }
    }
  },
  { immediate: true }
);

function handleClose() {
  emit('update:visible', false);
}

function submit() {
  if (!form.name.trim() || !form.position.trim() || form.number === '') {
    ElMessage.error("Name, Number, and Position are required.");
    return;
  }
  // Notify parent to refresh player list
  emit("player-updated", { ...form, _id: props.player._id });
  handleClose();
}
</script>

<style scoped>
.edit-player-dialog-body {
  max-height: 60vh;
  overflow-y: auto;
}

.edit-player-form {
  min-width: 0;
}

.skill-form-item .el-form-item__label {
  white-space: normal;
  word-break: break-word;
  max-width: 120px;
}

@media (max-width: 800px) {
  .el-dialog {
    width: 98vw !important;
    min-width: 0 !important;
  }

  .edit-player-dialog-body {
    max-height: 50vh;
  }
}
</style>