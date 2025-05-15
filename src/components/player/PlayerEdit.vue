<template>
  <el-dialog :model-value="visible" title="Edit Player" width="500px" @close="handleClose">
    <el-form :model="form" label-width="120px">
      <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Number">
        <el-input v-model="form.number" type="number" />
      </el-form-item>
      <el-form-item label="Position">
        <el-input v-model="form.position" />
      </el-form-item>

      <template v-for="(skills, category) in skillCategories" :key="category">
        <el-divider>{{ category }}</el-divider>
        <el-form-item v-for="skill in skills" :key="skill" :label="skill">
          <el-input v-model.number="form[categoryKey(category)][skill]" type="number" min="0" max="10" />
        </el-form-item>
      </template>
    </el-form>
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
const emit = defineEmits(['update:visible', 'player-updated']);

const skillCategories = {
  psychological: [
    "SELF_CONFIDENCE",
    "COMPETITIVENESS",
    "CONCENTRATION",
    "SELF_CONTROL",
    "DETERMINATION",
    "ENJOYMENT"
  ],
  physical: [
    "AGILITY",
    "BALANCE",
    "COORDINATION",
    "STAMINA",
    "STRENGTH",
    "SPEED",
    "ACCELERATION",
    "REACTION"
  ],
  socialEmotional: [
    "LISTENING",
    "COOPERATION",
    "COMMUNICATION",
    "SHARING",
    "PROBLEM_SOLVING",
    "DECISION_MAKING",
    "EMPATHY",
    "PATIENCE",
    "RESPECT_DISCIPLINE"
  ],
  technical: [
    "DRIBBLING",
    "SHOOTING",
    "RUNNING_WITH_BALL",
    "TURNING_WITH_BALL",
    "RECEIVING_THE_BALL",
    "PASSING"
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
      }
    }
  },
  { immediate: true }
);

function handleClose() {
  emit('update:visible', false);
}

async function submit() {
  emit('player-updated', { ...form, _id: props.player._id });
  handleClose();
}
</script>