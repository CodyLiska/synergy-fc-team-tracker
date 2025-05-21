<template>
  <div class="create-player">
    <h2>Add New Player</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Name:</label>
        <input v-model="player.name" id="name" required pattern="^[a-zA-Z\s'\-]{1,50}$"
          title="Only letters, spaces, hyphens, or apostrophes (max 50 characters)" />
      </div>
      <div>
        <label for="number">Number:</label>
        <input v-model="player.number" id="number" type="number" min="0" max="99" required />
      </div>
      <div>
        <label for="position">Position:</label>
        <select v-model="player.position" id="position" required>
          <option value="" disabled>Select position</option>
          <option value="Forward">Forward</option>
          <option value="Midfielder">Midfielder</option>
          <option value="Defender">Defender</option>
          <option value="Goalkeeper">Goalkeeper</option>
        </select>
      </div>
      <button type="submit">Add Player</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { playerService } from '../../services/playerService';
import { ElNotification } from 'element-plus'

const router = useRouter();

const player = ref({
  name: '',
  number: '',
  position: '',
});

const handleSubmit = async () => {
  const payload = {
    name: player.value.name.trim(),
    number: Number(player.value.number),
    position: player.value.position.trim(),
  }
  console.log('Sending player payload:', payload)
  try {
    await playerService.createPlayer(payload);
    ElNotification({
      title: 'Success',
      message: 'Player created successfully!',
      type: 'success',
    });
    router.push('/coach');
  } catch (error) {
    ElNotification({
      title: 'Error',
      message: 'Failed to create player. Please try again.',
      type: 'error',
    });
  }
};
</script>

<style scoped>
.create-player {
  max-width: 400px;
  margin: 0 auto;
}

form div {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: var(--secondary);
}
</style>