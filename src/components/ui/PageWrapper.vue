<template>
  <div class="page-wrapper">
    <slot /> <!-- Page-specific content will be injected here -->
  </div>
</template>

<style scoped>
.page-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  width: 100%;
  overflow-x: hidden;
}
</style>