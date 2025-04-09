import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/HomeView.vue'; // Import Home
import LoginView from '../components/LoginView.vue'; // Import Login
import RegisterView from '../components/RegisterView.vue'; // Import Register
import NotFoundView from '../components/NotFoundView.vue';
import PortfolioSettingsView from "@/components/PortfolioSettingsView.vue"; // Import NotFound

const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    // --- Add Protected Route ---
    {
        path: '/me/settings', // Or '/dashboard/portfolio', etc.
        name: 'portfolio-settings',
        component: PortfolioSettingsView,
        meta: { requiresAuth: true } // Mark route as requiring authentication
    },
    // --- End of Protected Route ---
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

// --- Add Navigation Guard ---
router.beforeEach(async (to, from, next) => {
    const {useAuthStore} = await import('@/stores/auth'); // Dynamically import store inside guard
    const authStore = useAuthStore();

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    console.log(`Navigating to ${to.path}, requiresAuth: ${requiresAuth}, isAuthenticated: ${authStore.isAuthenticated}`);

    if (requiresAuth && !authStore.isAuthenticated) {
        // If route requires auth and user is not logged in, redirect to login
        console.log('Redirecting to login');
        next({name: 'login', query: {redirect: to.fullPath}}); // Optional: pass redirect query
    } else if ((to.name === 'login' || to.name === 'register') && authStore.isAuthenticated) {
        // Optional: If logged-in user tries to access login/register, redirect them away (e.g., home)
        console.log('User already logged in, redirecting from login/register to home');
        next({name: 'home'});
    } else {
        // Otherwise, allow navigation
        next();
    }
});
// --- End of Navigation Guard ---

export default router;