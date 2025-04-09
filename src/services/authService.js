// src/services/authService.js
import apiClient from './api';

export default {
    register(userData) {
        // userData = { username, email, password }
        return apiClient.post('/auth/register', userData);
    },

    login(credentials) {
        // credentials = { usernameOrEmail, password }
        // Axios automatically handles JSON stringification
        return apiClient.post('/auth/login', credentials);
    },

    refreshToken() {
        // IMPORTANT: For this endpoint, we rely on the HttpOnly cookie being sent by the browser.
        // We might need to configure axios `withCredentials: true` globally or per-request
        // if CORS issues arise or cookies aren't sent automatically in certain scenarios.
        // Let's try without it first.
        return apiClient.post('/auth/refresh');
    },

    logout() {
        // We might need to send the current access token for the backend logout endpoint
        // This requires an interceptor or getting the token from the store.
        // For now, just call the endpoint. The backend primarily relies on clearing the refresh token state.
        // We'll add token handling later.
        return apiClient.post('/auth/logout');
    }
};