<template>
  <div class="coach-selector">
    <label for="coach-select">Select Coach:</label>
    <select id="coach-select" v-model="selectedCoachId" @change="setCoach">
      <option disabled value="">-- Choose --</option>
      <option v-for="coach in coaches" :key="coach.id" :value="coach.id">
        {{ coach.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { COACH_LIST, setCoachId, getCoachId } from "@/services/coachService";

export default {
  name: "CoachSelector",
  data() {
    return {
      coaches: COACH_LIST,
      selectedCoachId: getCoachId() || ""
    };
  },
  methods: {
    setCoach() {
      setCoachId(this.selectedCoachId);
      window.location.reload(); // optional: refresh app state
    }
  }
};
</script>

<style scoped>
.coach-selector {
  margin-bottom: 1rem;
}
</style>
