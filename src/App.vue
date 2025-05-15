<template>
  <BaseLayout>
    <router-view :key="$route.fullPath" />
  </BaseLayout>
</template>

<script setup>
import BaseLayout from './components/layouts/BaseLayout.vue' 
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* Optional: Dark theme styles */
/* body.dark-theme {
  background: #131622 !important;
  color: #bfc9d7 !important;
}

body.dark-theme .el-header,
body.dark-theme .el-footer,
body.dark-theme .footer,
body.dark-theme .header-content {
  background: #181a23 !important;
  color: #bfc9d7 !important;
  border-color: #23263a !important;
} */
</style>