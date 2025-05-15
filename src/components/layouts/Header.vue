<template>
  <div class="header-content">
    <router-link to="/" class="logo">Synergy FC Team Tracker</router-link>
    <el-menu mode="horizontal" :default-active="activeMenu" class="nav-menu">
      <el-menu-item v-for="item in navigationItems" :key="item.label" :index="item.path">
        <router-link :to="item.path">{{ item.label }}</router-link>
      </el-menu-item>
    </el-menu>
    <!-- <el-button class="theme-btn" @click="toggleTheme" circle>
  <i v-if="isDark" class="fas fa-moon"></i>
  <i v-else class="fas fa-sun"></i>
</el-button> -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const navigationItems = [
  { label: 'Home', path: '/' },
  { label: 'Coach Dashboard', path: '/coach' },
]

const route = useRoute()
const activeMenu = ref(route.path)

const isDark = ref(false)

// function toggleTheme() {
//   isDark.value = !isDark.value
//   if (isDark.value) {
//     document.body.classList.add('dark-theme')
//     document.documentElement.classList.add('dark-theme')
//   } else {
//     document.body.classList.remove('dark-theme')
//     document.documentElement.classList.remove('dark-theme')
//   }
// }

// Optional: Persist theme across reloads
// onMounted(() => {
//   const dark = localStorage.getItem('theme') === 'dark'
//   isDark.value = dark
//   if (dark) {
//     document.body.classList.add('dark-theme')
//     document.documentElement.classList.add('dark-theme')
//   } else {
//     document.body.classList.remove('dark-theme')
//     document.documentElement.classList.remove('dark-theme')
//   }
// })

// watch(isDark, (val) => {
//   localStorage.setItem('theme', val ? 'dark' : 'light')
// })
</script>

<style scoped>
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 24px;
  background: var(--header-bg);
  color: var(--text-main);
}

.logo {
  font-size: 1.2em;
  font-weight: bold;
  text-decoration: none;
  color: var(--text-main);
}

.nav-menu {
  flex: 1;
  margin: 0 24px;
  background: transparent;
  border-bottom: none;
}

.el-menu--horizontal {
  background: transparent !important;
  border-bottom: none !important;
}

.el-menu-item {
  color: var(--text-secondary) !important;
  background: transparent !important;
  transition: background 0.3s, color 0.3s
}

.el-menu-item:hover {
  color: var(--text-main) !important;
  background: var(--bg-secondary) !important;
}

.el-menu-item.is-active {
  color: var(--text-secondary) !important;
  background: transparent !important;
}

/* Override Element Plus default active styles */
:deep(.el-menu-item.is-active) {
  color: var(--text-secondary) !important;
  background: var(--bg-secondary) !important;
}

/* .theme-btn {
  margin-left: 16px;
  background: var(--bg-secondary);
  color: var(--text-main);
  border: none;
} */
</style>