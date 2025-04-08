<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Register</button>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      <p v-if="successMessage" style="color: green;">{{ successMessage }}</p>
    </form>
    <p>Already have an account? <router-link to="/login">Login here</router-link></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// Import auth store later

const username = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter();
// const authStore = useAuthStore(); // Use later

const handleRegister = async () => {
  errorMessage.value = ''; // Reset errors
  successMessage.value = '';
  console.log('Attempting registration...');
  // TODO: Call backend API via auth store
  // try {
  //   await authStore.register({ username: username.value, email: email.value, password: password.value });
  //   successMessage.value = 'Registration successful! Redirecting to login...';
  //   setTimeout(() => router.push('/login'), 2000);
  // } catch (error: any) {
  //   errorMessage.value = error.message || 'Registration failed.';
  // }
};
</script>