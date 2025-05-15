<template>
  <div class="create-player">
    <h2>Add New Player</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Name:</label>
        <input v-model="player.name" id="name" required />
      </div>
      <div>
        <label for="number">Number:</label>
        <input v-model="player.number" id="number" type="number" required />
      </div>
      <div>
        <label for="position">Position:</label>
        <input v-model="player.position" id="position" required />
      </div>
      <button type="submit">Add Player</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { playerService } from '../../services/playerService';

const router = useRouter();
const player = ref({
  name: '',
  number: '',
  position: '',
});

const handleSubmit = async () => {
  try {
    await playerService.createPlayer(player.value);
    alert('Player created successfully!');
    router.push('/coach');
  } catch (error) {
    alert('Failed to create player. Check the console for details.');
    console.error(error);
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