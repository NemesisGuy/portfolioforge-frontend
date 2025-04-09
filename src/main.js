// src/main.js
import './assets/main.css' // Import CSS with variables

import { createApp } from 'vue'
import { createPinia } from 'pinia' // Import Pinia

import App from './App.vue'
import router from './router/index.js' // Import Router (ensure router/index.js exists)

const app = createApp(App)

app.use(createPinia()) // Use Pinia - this makes stores available
app.use(router)      // Use Router

app.mount('#app')    // Mount to the element with id="app" in index.html