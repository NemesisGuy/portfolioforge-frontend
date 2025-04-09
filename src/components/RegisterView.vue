<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleRegister" :disabled="loading">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required :disabled="loading">
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required :disabled="loading">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required :disabled="loading">
      </div>
      <!-- Disable button during registration attempt -->
      <button type="submit" :disabled="loading">
        {{ loading ? 'Registering...' : 'Register' }}
      </button>
      <p v-if="errorMessage" style="color: red; margin-top: 1rem;">{{ errorMessage }}</p>
      <p v-if="successMessage" style="color: green; margin-top: 1rem;">{{ successMessage }}</p>
    </form>
    <p style="margin-top: 1rem;">Already have an account? <router-link to="/login">Login here</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router'; // Import RouterLink
import { useAuthStore } from '@/stores/auth'; // Import auth store

const username = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const loading = ref(false); // Add loading state
console.log('Initial loading state:', loading.value); // <<< ADD THIS
const router = useRouter();
const authStore = useAuthStore(); // Use the store

const handleRegister = async () => {
  console.log('handleRegister function CALLED!'); // <<< ADD THIS LINE

  errorMessage.value = ''; // Reset messages
  successMessage.value = '';
  loading.value = true; // Set loading true
  console.log('Attempting registration via store...');

  if (password.value.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters long.';
    loading.value = false;
    return; // Prevent API call if basic client validation fails
  }

  try {
    const responseMessage = await authStore.register({
      username: username.value,
      email: email.value,
      password: password.value
    });
    successMessage.value = responseMessage + ' Redirecting to login...';
    // Redirect to login after a short delay
    setTimeout(() => router.push({ name: 'login' }), 2500);
  } catch (error) {
    errorMessage.value = error.message || 'Registration failed.'; // Display error from store/service
    console.error('Register component error:', error);
  } finally {
    // Only set loading to false if not redirecting immediately
    if (!successMessage.value) {
      loading.value = false;
    }
  }
};
</script>