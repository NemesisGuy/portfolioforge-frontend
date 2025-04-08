// src/main.js

// --- CSS Import ---
import './assets/main.css' // Or your CSS entry point path

// --- Vue Core Import ---
import { createApp } from 'vue' // <<< Keep ONE of these

// --- Pinia Import ---
import { createPinia } from 'pinia' // Keep this (you just installed it)

// --- Root Component Import ---
import App from './App.vue' // <<< Keep ONE of these

// --- Router Import ---
import router from './router' // Keep this

// --- Create App Instance ---
const app = createApp(App)

// --- Use Plugins ---
app.use(createPinia())
app.use(router)

// --- Mount App ---
app.mount('#app')