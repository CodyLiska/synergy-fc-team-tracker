<template>
  <el-container style="text-align: center; padding: 40px 24px;">
    <el-row justify="center">
      <el-col :span="24">
        <el-text tag="h2" type="danger" size="large">Oops!</el-text>
      </el-col>
      <el-col :span="24" style="margin: 16px 0;">
        <el-text>{{ error.message }}</el-text>
      </el-col>
      <el-col :span="24" style="margin-bottom: 24px;">
        <el-text type="info">Something went wrong. Please try again later.</el-text>
      </el-col>
      <el-col :span="24">
        <el-button type="danger" @click="reset">Try again</el-button>
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup>
defineProps({
  error: Object,
  reset: Function
});
</script>