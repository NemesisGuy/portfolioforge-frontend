// src/services/portfolioService.js
import apiClient from './api'; // Assuming api.js sets up the base Axios instance

export default {
    getMyPortfolio() {
        // Axios interceptor will add the Authorization header
        return apiClient.get('/me/portfolio');
    },

    updateMyPortfolio(portfolioData) {
        // portfolioData = { aboutMeText, resumeUrl, linkedInUrl, ... }
        // Axios interceptor will add the Authorization header
        return apiClient.put('/me/portfolio', portfolioData);
    },

    // --- Public endpoint (Doesn't need auth header) ---
    getPublicPortfolio(slugOrUsername) {
        return apiClient.get(`/portfolios/${slugOrUsername}`);
    }

    // Add methods for public projects/skills later if needed in this service
    // getPublicProjects(slugOrUsername) { ... }
    // getPublicSkills(slugOrUsername) { ... }
};