<template>
  <PageWrapper>
    <div class="add-game-outcome-container">
      <h2>Add Game Outcome</h2>
      <el-form :model="form" label-width="120px" @submit.prevent="submitForm">
        <el-form-item label="Date" required>
          <el-date-picker v-model="form.date" type="date" placeholder="Select date" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="Opponent" required>
          <el-input v-model="form.opponent" placeholder="Opponent name" />
        </el-form-item>
        <el-form-item label="Result" required>
          <el-select v-model="form.result" placeholder="Select result">
            <el-option label="Win" value="win" />
            <el-option label="Loss" value="loss" />
            <el-option label="Draw" value="draw" />
          </el-select>
        </el-form-item>
        <el-form-item label="Score (Us)" required>
          <el-input-number v-model="form.score.us" :min="0" />
        </el-form-item>
        <el-form-item label="Score (Them)" required>
          <el-input-number v-model="form.score.them" :min="0" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>
  </PageWrapper>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import PageWrapper from '../../components/ui/PageWrapper.vue';

const router = useRouter();

const form = ref({
  date: '',
  opponent: '',
  result: '',
  score: {
    us: 0,
    them: 0,
  },
});

const submitForm = async () => {
  try {
    // Format date as ISO string for backend
    const payload = {
      ...form.value,
      date: form.value.date ? new Date(form.value.date).toISOString() : '',
    };
    await axios.post('http://localhost:5000/api/games', payload);
    ElMessage.success('Game outcome added!');
    router.push('/coach');
  } catch (err) {
    ElMessage.error('Failed to add game outcome.');
  }
};
</script>

<style scoped>
.add-game-outcome-container {
  max-width: 500px;
  margin: 40px auto;
  background: #fff;
  padding: 32px 24px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
</style>