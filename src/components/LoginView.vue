<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="usernameOrEmail">Username or Email:</label>
        <input type="text" id="usernameOrEmail" v-model="usernameOrEmail" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </form>
    <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// Import auth store later

const usernameOrEmail = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
// const authStore = useAuthStore(); // Use later

const handleLogin = async () => {
  errorMessage.value = ''; // Reset error
  console.log('Attempting login...');
  // TODO: Call backend API via auth store
  // try {
  //   await authStore.login({ usernameOrEmail: usernameOrEmail.value, password: password.value });
  //   router.push('/dashboard'); // Redirect to dashboard on success
  // } catch (error: any) {
  //   errorMessage.value = error.message || 'Login failed.';
  // }
};
</script>