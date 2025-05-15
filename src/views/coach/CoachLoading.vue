<!-- src/views/coach/CoachLoading.vue -->
<template>
  <el-container style="height: 100vh;">
    <el-row type="flex" justify="center" align="middle" style="height: 100%;">
      <el-col>
        <el-icon>
          <Loading />
        </el-icon>
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup>
import { Loading } from '@element-plus/icons-vue'
</script>