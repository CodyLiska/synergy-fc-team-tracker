<template>
  <div class="header-content">
    <router-link to="/" class="logo">Synergy FC Team Tracker</router-link>
    <el-menu mode="horizontal" :default-active="activeMenu" class="nav-menu">
      <el-menu-item v-for="item in navigationItems" :key="item.label" :index="item.path">
        <router-link :to="item.path">{{ item.label }}</router-link>
      </el-menu-item>
      <el-menu-item v-if="coachName" disabled>
        👤 {{ coachName }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isAuthenticated, logout } from '@/services/authService'
const coachRole = localStorage.getItem("coachRole")

const navigationItems = [
  { label: 'Home', path: '/' },
  { label: 'Coach Dashboard', path: '/coach' },
]

if (coachRole === 'admin') {
  navigationItems.push({ label: 'Admin Panel', path: '/admin' })
}

const coachName = ref('')
const route = useRoute()
const router = useRouter()
const activeMenu = ref(route.path)

watch(() => route.path, (newPath) => {
  activeMenu.value = newPath
})

onMounted(() => {
  const name = localStorage.getItem('coachName')
  if (name) coachName.value = name
})

function handleLogout() {
  logout()
  router.push('/login')
}

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
  width: 100vw;
  margin-left: calc(50% - 50vw);
  box-sizing: border-box;
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
</style>