<template>
  <Bar :data="chartData" :options="options" :key="themeKey" />
</template>

<script setup>
import { Bar } from 'vue-chartjs';
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
    required: false,
  },
  themeKey: {
    type: String,
    required: false,
  },
});
</script>

<style scoped></style>
