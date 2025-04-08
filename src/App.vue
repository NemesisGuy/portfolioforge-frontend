<template>
  <div id="app-wrapper">
    <Navbar />
    <main> <!-- Rely on global styles for padding/margin/width -->
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<style>
/* Keep global styles from main.css */
/* You can add specific overrides here if needed */
</style>