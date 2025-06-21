<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Coach Login</h2>

      <el-form :model="form" label-position="top" @submit.prevent="handleLogin" class="space-y-4">
        <el-form-item label="Email">
          <el-input v-model="form.email" placeholder="coach@example.com" />
        </el-form-item>

        <el-form-item label="Password">
          <el-input v-model="form.password" type="password" placeholder="••••••••" show-password />
        </el-form-item>

        <div class="flex items-center justify-between mb-4">
          <label class="flex items-center space-x-2 text-sm text-gray-600">
            <el-checkbox v-model="rememberMe" />
            <span>Remember Me</span>
          </label>
          <!-- <router-link to="/" class="text-sm text-blue-600 hover:underline">
            Back to Home
          </router-link> -->
        </div>

        <el-button type="primary" class="w-full" @click="handleLogin">Login</el-button>
      </el-form>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/services/axiosInstance'
import { setAccessToken } from '@/services/authService'

const router = useRouter()
const form = ref({ email: '', password: '' })
const rememberMe = ref(false)

const handleLogin = async () => {
  try {
    const { data } = await axios.post("/auth/login", form.value);
    setAccessToken(data.accessToken);
    localStorage.setItem("coachId", data.coachId);
    localStorage.setItem("coachName", data.name || form.value.email);
    localStorage.setItem("coachRole", data.role);
    router.push("/coach");
  } catch (err) {
    alert("Invalid login");
  }
};
</script>

<style scoped></style>
