<template>
  <div class="home-container">
    <h1 class="main-title">
      <span class="gradient-text">Soccer Player Tracker</span>
    </h1>
    <p class="subtitle">
      Comprehensive player management and performance tracking platform
    </p>
    <el-row :gutter="24" class="card-row">
      <el-col :xs="24" :sm="12" :md="12" :lg="12">
        <el-card class="dashboard-card" @click="$router.push('/coach')">
          <div class="card-icon blue"><i class="fas fa-user-tie"></i></div>
          <div>
            <div class="card-title">Coach Dashboard</div>
            <div class="card-desc">Manage teams, track performance, and plan training sessions</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12">
        <el-card class="dashboard-card" disabled>
          <div class="card-icon green"><i class="fas fa-user-friends"></i></div>
          <div>
            <div class="card-title">Parent Dashboard</div>
            <div class="card-desc">Monitor your child's progress and stay updated with team activities</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12">
        <el-card class="dashboard-card" disabled>
          <div class="card-icon purple"><i class="fas fa-users"></i></div>
          <div>
            <div class="card-title">Players</div>
            <div class="card-desc">View detailed player profiles, statistics, and development tracking</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12">
        <el-card class="dashboard-card" disabled>
          <div class="card-icon orange"><i class="fas fa-futbol"></i></div>
          <div>
            <div class="card-title">Games</div>
            <div class="card-desc">Access match schedules and results</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
// No logic required for this static landing page
</script>

<style scoped>
.home-container {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: var(--bg-main);
  padding-top: 48px;
}

.main-title {
  color: var(--text-main);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 36px;
  text-align: center;
}

.card-row {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
}

.dashboard-card {
  border: none;
  border-radius: 16px;
  margin-bottom: 24px;
  min-height: 120px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: box-shadow 0.2s, background 0.2s;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.dashboard-card[disabled] {
  cursor: not-allowed;
  opacity: 0.7;
}

.dashboard-card:hover:not([disabled]) {
  background: var(--border);
  box-shadow: 0 4px 24px rgba(52, 152, 253, 0.12);
}

.card-icon {
  font-size: 2rem;
  margin-right: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.card-icon.blue {
  background: #3498fd20;
  color: #3498fd;
}

.card-icon.green {
  background: #2ecc4020;
  color: #2ecc40;
}

.card-icon.purple {
  background: #a259f720;
  color: #a259f7;
}

.card-icon.orange {
  background: #f39c1220;
  color: #f39c12;
}

.card-title {
  color: var(--text-main);
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 2px;
}

.card-desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 400;
}
</style>