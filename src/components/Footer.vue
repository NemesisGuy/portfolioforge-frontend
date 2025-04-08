<template>
  <footer class="footer">
    <div class="container">
      <p>© {{ currentYear }} PortfolioForge. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer {
  background-color: #f8f9fa; /* Match body background */
  border-top: 1px solid #e7e7e7; /* Subtle top border */
  padding: 1.5rem 1rem;
  margin-top: auto; /* Push footer down */
  color: #6c757d; /* Muted text color */
  font-size: 0.9em;
}
.container {
  width: 100%;
  max-width: 1140px; /* Same max-width */
  margin: 0 auto;
  text-align: center;
}
</style>