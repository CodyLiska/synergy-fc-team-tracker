<!-- <template>
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
</template> -->

<template>
  <PageWrapper>
    <div class="add-activity-page">
      <h2>Add Activity</h2>
      <el-form :model="form" label-width="120px" @submit.prevent="handleAddActivity">
        <el-form-item label="Player">
          <el-input v-model="form.player" placeholder="Enter player name" />
        </el-form-item>

        <el-form-item label="Activity">
          <el-input v-model="form.activity" placeholder="Enter activity" />
        </el-form-item>

        <el-form-item label="Date">
          <el-date-picker v-model="form.date" type="date" placeholder="Pick a date" />
        </el-form-item>

        <el-form-item label="Details">
          <el-input type="textarea" v-model="form.details" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleAddActivity">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>
  </PageWrapper>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PageWrapper from '@/components/ui/PageWrapper.vue'
import { recentActivityService } from '@/services/recentActivityService';

const router = useRouter();

const activity = ref({
  date: '',
  player: '',
  activity: '',
  details: ''
});

const handleAddActivity = async () => {
  try {
    await recentActivityService.addActivity(form.value)
    router.push('/coach')
  } catch (error) {
    console.error('Error adding activity:', error)
  }
};
</script>

<style scoped>
.add-activity-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

/* .add-activity-page {
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
} */
</style>