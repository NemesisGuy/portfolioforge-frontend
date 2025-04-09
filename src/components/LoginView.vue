<template>
  <div>
    <h2>Login</h2>
    <!-- Prevent form submission if login is in progress -->
    <form @submit.prevent="handleLogin" :disabled="loading">
      <div>
        <label for="usernameOrEmail">Username or Email:</label>
        <input type="text" id="usernameOrEmail" v-model="usernameOrEmail" required :disabled="loading">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required :disabled="loading">
      </div>
      <!-- Disable button during login attempt -->
      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
      <p v-if="errorMessage" style="color: red; margin-top: 1rem;">{{ errorMessage }}</p>
    </form>
    <p style="margin-top: 1rem;">Don't have an account? <router-link to="/register">Register here</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router'; // Import RouterLink
import { useAuthStore } from '@/stores/auth'; // Import auth store

const usernameOrEmail = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false); // Add loading state
const router = useRouter();
const authStore = useAuthStore(); // Use the store

const handleLogin = async () => {
  errorMessage.value = ''; // Reset error
  loading.value = true; // Set loading true
  console.log('Attempting login via store...');
  try {
    await authStore.login({ usernameOrEmail: usernameOrEmail.value, password: password.value });
    // Redirect to a protected route (e.g., dashboard) on successful login
    // We'll create dashboard later, let's redirect home for now
    router.push('/'); // Or router.push({ name: 'dashboard' });
  } catch (error) {
    errorMessage.value = error.message || 'Login failed.'; // Display error from store/service
    console.error('Login component error:', error);
  } finally {
    loading.value = false; // Set loading false regardless of outcome
  }
};
</script>