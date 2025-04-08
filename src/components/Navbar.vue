<template>
  <nav class="navbar">
    <div class="container">
      <router-link to="/" class="brand">PortfolioForge</router-link>
      <div class="links">
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
        <!-- Theme Toggle Button -->
        <button @click="themeStore.toggleTheme" class="theme-toggle">
          Toggle {{ themeStore.currentTheme === 'light' ? 'Dark' : 'Light' }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useThemeStore } from '@/stores/theme'; // Import the theme store

const themeStore = useThemeStore(); // Initialize the store

// No need to call setTheme here if onMounted in store handles initialization
</script>

<style scoped>
/* ... existing navbar styles ... */

.theme-toggle {
  margin-left: 1rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.85rem;
  /* Adjust button colors if needed, or let global button styles apply */
  background-color: var(--color-text-secondary); /* Example subtle background */
  border-color: var(--color-text-secondary);
  color: var(--color-background-content);
}
.theme-toggle:hover {
  opacity: 0.8;
  background-color: var(--color-text-secondary);
  border-color: var(--color-text-secondary);
}
</style>