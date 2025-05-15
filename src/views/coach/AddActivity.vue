<template>
  <div class="add-activity-page">
    <h2>Add Activity</h2>
    <form @submit.prevent="handleAddActivity">
      <div>
        <label for="player">Player:</label>
        <input v-model="activity.player" id="player" required />
      </div>
      <div>
        <label for="activity">Activity:</label>
        <input v-model="activity.activity" id="activity" required />
      </div>
      <div>
        <label for="details">Details:</label>
        <input v-model="activity.details" id="details" required />
      </div>
      <button type="submit">Add Activity</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { recentActivityService } from '../../services/recentActivityService';

const router = useRouter();
const activity = ref({
  date: '',
  player: '',
  activity: '',
  details: ''
});

const handleAddActivity = async () => {
  const now = new Date();
  activity.value.date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
  await recentActivityService.addActivity(activity.value);
  router.push('/coach');
};
</script>

<style scoped>
.add-activity-page {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
}

.add-activity-page div {
  margin-bottom: 1rem;
}

.add-activity-page label {
  display: block;
  font-weight: bold;
}

.add-activity-page input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
}

.add-activity-page button {
  padding: 0.5rem 1rem;
  background-color: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
}

.add-activity-page button:hover {
  background-color: var(--secondary);
}
</style>