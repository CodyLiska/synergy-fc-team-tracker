<template>
  <div class="base-layout">
    <el-container style="min-height: 100vh; flex-direction: column;">
      <el-header height="60px">
        <Header />
      </el-header>
      <CoachSelector />
      <el-main>
        <div class="main-content-wrapper">
          <slot /> <!-- Page-specific content injected here -->
        </div>
      </el-main>
      <el-footer height="auto">
        <Footer />
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import Header from './Header.vue'
import CoachSelector from '../CoachSelector.vue' 
import Footer from './Footer.vue'
</script>

<style scoped>
.base-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
}

el-main {
  flex: 1;
  overflow: auto;
}

el-footer {
  flex-shrink: 0;
}

.main-content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
}
</style>