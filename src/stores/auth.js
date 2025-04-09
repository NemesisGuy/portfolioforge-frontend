// src/stores/auth.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import authService from '@/services/authService'; // Use @ for alias to src
import router from '@/router'; // Import router for redirection

// Helper function to decode JWT (basic, no verification needed here)
function decodeJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        console.error('Error decoding JWT:', e);
        return null;
    }
}


export const useAuthStore = defineStore('auth', () => {
    // --- State ---
    const accessToken = ref(localStorage.getItem('accessToken') || null); // Persist for page reloads initially
    const user = ref(null); // Store decoded user info (like username) if needed

    // --- Getters ---
    const isAuthenticated = computed(() => !!accessToken.value);

    // --- Actions ---

    function setToken(newToken) {
        accessToken.value = newToken;
        if (newToken) {
            localStorage.setItem('accessToken', newToken); // Save to local storage
            const decoded = decodeJwt(newToken);
            if (decoded) {
                user.value = { username: decoded.sub }; // Example: store username from 'sub' claim
            }
        } else {
            localStorage.removeItem('accessToken'); // Remove on logout/clear
            user.value = null;
        }
    }

    async function login(credentials) {
        try {
            const response = await authService.login(credentials);
            // Backend now sends only accessToken in body, refresh token is in HttpOnly cookie
            if (response.data && response.data.accessToken) {
                setToken(response.data.accessToken);
                console.log('Login successful, token set.');
                // Optional: Fetch user profile details here if needed immediately
                return true; // Indicate success
            } else {
                throw new Error('Login response did not contain access token.');
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            setToken(null); // Clear any old token on failure
            // Rethrow or handle specific error messages
            throw new Error(error.response?.data?.message || error.response?.data || 'Login failed. Please check credentials.');
        }
    }

    async function register(userData) {
        try {
            const response = await authService.register(userData);
            console.log('Registration successful:', response.data);
            // Registration successful, maybe return message or handle as needed
            return response.data; // Return success message from backend
        } catch (error) {
            console.error('Registration failed:', error.response?.data || error.message);
            // Rethrow or handle specific error messages
            throw new Error(error.response?.data || 'Registration failed. Please try again.');
        }
    }

    async function logout() {
        try {
            // TODO: Add Authorization header to logout request if backend requires it
            await authService.logout();
            console.log('Logout successful.');
        } catch(error) {
            console.error('Logout API call failed:', error.response?.data || error.message);
            // Still proceed with client-side cleanup even if API fails
        } finally {
            // Always clear client-side state and tokens
            setToken(null);
            console.log('Client-side logout complete.');
            // Redirect to login page after logout
            router.push({ name: 'login' });
        }
    }

    // NOTE: Refresh token logic will primarily be handled via Axios interceptors later
    // We don't call authService.refreshToken directly from components usually.


    // --- Initialization ---
    // Check token on store initialization (e.g., page reload)
    if (accessToken.value) {
        const decoded = decodeJwt(accessToken.value);
        if (decoded) {
            // Optional: Check expiry here - if expired, clear token immediately or try refresh
            if (decoded.exp * 1000 < Date.now()) {
                console.log('Initial access token expired, clearing.');
                setToken(null);
                // TODO: Optionally attempt background refresh here if refresh token likely exists
            } else {
                user.value = { username: decoded.sub };
                console.log('Auth store initialized with existing token.');
            }
        } else {
            // Invalid token found in storage
            setToken(null);
        }
    }


    return {
        accessToken,
        user,
        isAuthenticated,
        login,
        register,
        logout,
        setToken // Expose if needed externally
    };
});