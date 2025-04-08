import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/HomeView.vue'; // Import Home
import LoginView from '../components/LoginView.vue'; // Import Login
import RegisterView from '../components/RegisterView.vue'; // Import Register
import NotFoundView from '../components/NotFoundView.vue'; // Import NotFound

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        // Add Portfolio view route later
        // {
        //   path: '/portfolio/:slug', // Route param for slug
        //   name: 'portfolio-view',
        //   component: () => import('../views/PortfolioView.vue') // Lazy load
        // },
        // Add Dashboard route later (protected)
        // {
        //   path: '/dashboard',
        //   name: 'dashboard',
        //   component: () => import('../views/DashboardView.vue'),
        //   meta: { requiresAuth: true } // Example for route guard later
        // },

        // Catch-all 404 route - must be last
        {
            path: '/:pathMatch(.*)*', // Matches everything not matched above
            name: 'NotFound',
            component: NotFoundView
        }
    ]
})

// Add router guards later for authentication checks
// router.beforeEach((to, from, next) => { ... })

export default router