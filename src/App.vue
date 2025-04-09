<template>
  <div id="app-wrapper">
    <Navbar />
    <main> <!-- Rely on global styles for padding/margin/width -->
      <RouterView /> <!-- This is where the routed component will be displayed -->
    </main>
    <Footer />
  </div>
</template>

<script setup> // Remove lang="ts"
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue'; // Import Navbar
import Footer from './components/Footer.vue'; // Import Footer

// No specific logic needed here for theme, handled by store and Navbar
</script>

<style>
/* Global styles are in src/assets/main.css */
/* You can add specific overrides here if needed */
</style>