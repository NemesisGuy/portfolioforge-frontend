<template>
  <nav class="navbar">
    <div class="container">
      <!-- Brand Link -->
      <router-link to="/" class="brand">PortfolioForge</router-link>

      <!-- Links Container -->
      <div class="links">
        <!-- Always Visible Links -->
        <router-link to="/">Home</router-link>
        <!-- Add public portfolio browse link later? -->

        <!-- Links for Logged-OUT Users -->
        <template v-if="!authStore.isAuthenticated">
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Register</router-link>
        </template>

        <!-- Links/Actions for Logged-IN Users -->
        <template v-if="authStore.isAuthenticated">
          <!-- Link to Portfolio Settings -->
          <router-link :to="{ name: 'portfolio-settings' }">Settings</router-link>
          <!-- Add other dashboard links later -->

          <!-- Logout Button with Username -->
          <div class="user-menu">
             <span class="username" v-if="authStore.user?.username">
                Hi, {{ authStore.user.username }}
             </span>
            <button @click="handleLogout" class="logout-button button" title="Logout">
              Logout
            </button>
          </div>
        </template>

        <!-- Theme Toggle Button (Always Visible) -->
        <button @click="themeStore.toggleTheme" class="theme-toggle button" aria-label="Toggle theme">
          <span v-if="themeStore.currentTheme === 'light'">🌙</span>
          <span v-else>☀️</span>
          <!-- Or use text: Toggle {{ themeStore.currentTheme === 'light' ? 'Dark' : 'Light' }} -->
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useThemeStore } from '@/stores/theme';
import { useAuthStore } from '@/stores/auth'; // Import auth store

const themeStore = useThemeStore();
const authStore = useAuthStore(); // Use auth store
const router = useRouter(); // Get router instance

const handleLogout = () => {
  console.log('Logout button clicked');
  authStore.logout(); // Call the logout action in the store
  // Redirect is handled within the logout action now
};
</script>

<style scoped>
.navbar {
  background-color: var(--color-background-nav);
  padding: 0.8rem 1rem;
  color: white;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky; /* Make navbar sticky */
  top: 0;
  z-index: 1000; /* Ensure it's above other content */
}

.container {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  color: var(--color-text-nav-hover);
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: bold;
}

.links {
  display: flex;
  align-items: center;
  gap: 1rem; /* Add space between link items */
}

.links a {
  color: var(--color-text-nav);
  text-decoration: none;
  /* margin-left: 1rem; Removed margin, using gap now */
  transition: color 0.15s ease-in-out;
  padding: 0.2rem 0; /* Add some vertical padding for easier clicking */
}

.links a:hover,
.links a.router-link-exact-active {
  color: var(--color-text-nav-hover);
}

/* User Menu Styling */
.user-menu {
  display: flex;
  align-items: center;
  gap: 0.75rem; /* Space between username and button */
  margin-left: 1rem; /* Space before user menu */
}

.username {
  color: var(--color-text-nav);
  font-size: 0.9em;
}

/* Specific styling for logout button if needed */
.logout-button {
  /* Inherits base button styles */
  padding: 0.25rem 0.5rem; /* Smaller padding */
  font-size: 0.85rem;
  background-color: var(--color-text-secondary); /* Example different color */
  border-color: var(--color-text-secondary);
  color: var(--color-background-content);
}
.logout-button:hover {
  opacity: 0.9;
  background-color: var(--color-text-secondary);
  border-color: var(--color-text-secondary);
}

/* Theme toggle button styling */
.theme-toggle {
  /* margin-left: 1.5rem; Removed margin, using gap now */
  padding: 0.3rem 0.6rem;
  font-size: 1.1rem; /* Make icon slightly larger */
  background-color: transparent; /* Make background transparent */
  border: 1px solid var(--color-text-nav); /* Use nav text color for border */
  color: var(--color-text-nav); /* Use nav text color */
  line-height: 1; /* Adjust line height for icon */
}
.theme-toggle:hover {
  opacity: 0.8;
  background-color: rgba(255, 255, 255, 0.1); /* Slight background on hover */
  border-color: var(--color-text-nav-hover);
  color: var(--color-text-nav-hover);
}
</style>