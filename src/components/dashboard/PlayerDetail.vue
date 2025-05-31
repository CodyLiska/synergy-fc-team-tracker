<template>
  <el-dialog :model-value="localVisible" title="Player Details" width="500px" @close="handleClose">
    <div class="player-basic">
      <div class="player-name">{{ player.name }}</div>
      <div><strong>Number:</strong> {{ player.number }}</div>
      <div><strong>Position:</strong> {{ player.position }}</div>
      <div v-for="(label, category) in skillLabels" :key="category" class="skill-category">
        <el-divider>{{ label }}</el-divider>
        <ul>
          <li v-for="skill in Object.keys(player[category] || {})" :key="skill">
            <span>{{ capitalize(skill.replace(/([A-Z])/g, ' $1')) }}:</span>
            <span class="stat-value">{{ player[category][skill] }}</span>
          </li>
        </ul>
      </div>
    </div>
    <template #footer>
      <el-button @click="handleClose">Close</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { watch, ref } from 'vue';

const props = defineProps({
  player: Object,
  visible: Boolean
});

const localVisible = ref(props.visible);
watch(() => props.visible, (val) => {
  localVisible.value = val;
});

const emit = defineEmits(["update:visible"]);

const skillLabels = {
  psychological: "Psychological",
  physical: "Physical",
  socialEmotional: "Social/Emotional",
  technical: "Technical",
};

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

function handleClose() {
  emit('update:visible', false);
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

.skill-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.skill-category li {
  display: flex;
  justify-content: space-between;
  padding: 2px 0;
}

.stat-value {
  font-weight: bold;
  margin-left: 0.5em;
}
</style>