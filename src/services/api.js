// src/services/api.js
import axios from 'axios';
// Dynamically import store ONLY inside the interceptor to avoid circular dependencies at startup
// import { useAuthStore } from '@/stores/auth'; // <-- DO NOT import at top level

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json',
    }
});

// --- Request Interceptor ---
// Add Authorization header to requests if a token exists
apiClient.interceptors.request.use(
    async (config) => {
        const { useAuthStore } = await import('@/stores/auth');
        const authStore = useAuthStore();
        const token = authStore.accessToken;

        // --- Add Detailed Logging ---
        console.log('Interceptor: Running for request to:', config.url);
        if (token) {
            console.log('Interceptor: Found token:', token.substring(0, 15) + '...'); // Log beginning of token
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Interceptor: Authorization header ADDED.');
        } else {
            console.log('Interceptor: No token found in auth store.');
        }
        // --- End of Logging ---

        return config;
    },
    (error) => {
        console.error('Interceptor: Request error:', error); // Log request errors too
        return Promise.reject(error);
    }
);


// --- Response Interceptor (Placeholder for Refresh Token Logic later) ---
// apiClient.interceptors.response.use(
//   (response) => {
//     // If request successful, just return response
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     // Check if it's a 401 error and not a retry attempt already
//     if (error.response?.status === 401 && !originalRequest._retry) {
//        originalRequest._retry = true; // Mark as retry attempt
//        console.log('Interceptor: Detected 401, attempting token refresh...');
//        try {
//           const { useAuthStore } = await import('@/stores/auth'); // Dynamic import
//           const authStore = useAuthStore();
//           // Call a refresh action in your auth store (which calls the refresh API)
//           const newAccessToken = await authStore.attemptRefreshToken();
//           if (newAccessToken) {
//               console.log('Interceptor: Refresh successful, retrying original request.');
//               // Update the header for the original request and retry
//               originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//               return apiClient(originalRequest); // Retry with the original config (now with new token)
//           } else {
//                console.log('Interceptor: Refresh attempt failed (no new token). Logging out.');
//                await authStore.logout(); // Logout if refresh fails definitively
//                return Promise.reject(error); // Reject original error
//           }
//        } catch (refreshError) {
//            console.error('Interceptor: Error during token refresh:', refreshError);
//            const { useAuthStore } = await import('@/stores/auth'); // Dynamic import
//            const authStore = useAuthStore();
//            await authStore.logout(); // Logout on refresh error
//            return Promise.reject(refreshError); // Reject with refresh error
//        }
//     }
//     // For other errors, just reject
//     return Promise.reject(error);
//   }
// );


export default apiClient;