<template>
  <footer class="footer">
    <el-row justify="center" class="footer-links">
      <el-link href="#" target="_blank">About</el-link>
      <el-link href="#" target="_blank">Contact</el-link>
      <el-link href="#" target="_blank">Privacy Policy</el-link>
    </el-row>
    <el-row justify="center" class="footer-social">
      <el-link href="#" target="_blank"><i class="fab fa-twitter"></i></el-link>
      <el-link href="#" target="_blank"><i class="fab fa-github"></i></el-link>
      <el-link href="#" target="_blank"><i class="fab fa-linkedin"></i></el-link>
    </el-row>
    <el-row justify="center">
      <span>© 2025 Synergy FC Player Tracker. All rights reserved</span>
    </el-row>
  </footer>
</template>

<script setup>
// No script needed for static footer
</script>

<style scoped>
.footer {
  text-align: center;
  background: var(--footer-bg);
  color: var(--text-main);
}

.footer-links,
.footer-social {
  margin-bottom: 8px;
  gap: 16px;
}

.footer-social i {
  font-size: 1.5em;
}
</style>