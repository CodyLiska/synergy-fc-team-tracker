<template>
  <div class="base-layout">
    <el-container style="min-height: 100vh; flex-direction: column;">
      <el-header height="60px">
        <Header />
      </el-header>
      <el-main>
        <slot /> <!-- Page-specific content will be injected here -->
      </el-main>
      <el-footer height="auto">
        <Footer />
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>

<style scoped>
.base-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden; /* Prevent horizontal scrolling */
}

el-main {
  flex: 1;
  overflow: auto; /* Enable scrolling for content inside the main area if needed */
  padding: 1rem;
  max-width: 1280px;
  margin: 0 auto; /* Center the content horizontally */
}

el-footer {
  flex-shrink: 0; /* Prevent the footer from shrinking */
}
</style>