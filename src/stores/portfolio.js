// src/stores/portfolio.js
import { ref } from 'vue';
import { defineStore } from 'pinia';
import portfolioService from '@/services/portfolioService'; // Adjust path if needed

export const usePortfolioStore = defineStore('portfolio', () => {
    // --- State ---
    const portfolio = ref(null); // Holds the user's portfolio data object (null if not fetched or doesn't exist)
    const isLoading = ref(false); // Tracks loading state for fetch/save operations
    const error = ref(null); // Holds error messages from API calls

    // --- Actions ---

    /**
     * Fetches the portfolio data for the currently logged-in user from the backend.
     * Handles 404 specifically to indicate the portfolio needs creation.
     */
    async function fetchMyPortfolio() {
        // Only fetch if not already loading to prevent concurrent requests
        if (isLoading.value) {
            console.warn('Store: fetchMyPortfolio called while already loading.');
            return;
        }

        isLoading.value = true;
        error.value = null; // Clear previous errors
        // Don't clear portfolio.value here, let the catch block handle it on error
        console.log('Store: Fetching my portfolio...');

        try {
            const response = await portfolioService.getMyPortfolio(); // Assumes interceptor adds auth header
            portfolio.value = response.data; // Store fetched data
            error.value = null; // Clear error on success
            console.log('Store: Portfolio fetched successfully:', portfolio.value);

        } catch (err) {
            console.error('Store: Error fetching portfolio:', err.response?.status, err.response?.data || err.message);
            portfolio.value = null; // Clear portfolio data on any fetch error

            // Check specifically for 404 status code (Portfolio not found)
            if (err.response?.status === 404) {
                console.log('Store: Portfolio not found (404). Setting error state to null (indicates creation needed).');
                error.value = null; // Ensure error is null, signaling "create" mode to the view
            } else {
                // Set error state for all other kinds of errors (e.g., 401, 500, network error)
                error.value = err.response?.data?.message || // Try getting message from backend JSON error details
                    (err.response?.data?.error ? `${err.response.data.error}: ${err.response.data.message || ''}` : null) || // Try other common error structures
                    err.message || // Fallback to Axios error message if no response body
                    'Failed to fetch portfolio data.'; // Generic fallback
                console.log('Store: Set error state:', error.value);
            }
            // Note: We don't re-throw the error from here unless necessary for the calling component,
            // the component should react based on isLoading/error/portfolio state.

        } finally {
            // Ensure loading is always set to false after the operation completes
            isLoading.value = false;
            console.log('Store: fetchMyPortfolio finished.');
        }
    }

    /**
     * Updates or Creates portfolio data for the logged-in user.
     * The backend PUT endpoint handles both create and update.
     * @param {object} portfolioData - The portfolio data object from the form.
     * @returns {Promise<object>} The saved portfolio data from the backend.
     * @throws {Error} If the save operation fails.
     */
    async function saveMyPortfolio(portfolioData) {
        if (isLoading.value) {
            console.warn('Store: saveMyPortfolio called while already processing.');
            // Optionally throw an error or return early
            throw new Error("Save operation already in progress.");
        }
        isLoading.value = true;
        error.value = null; // Clear previous errors
        console.log('Store: Saving portfolio data...', portfolioData);

        try {
            // Use the update service method - backend PUT handles create or update
            const response = await portfolioService.updateMyPortfolio(portfolioData);
            portfolio.value = response.data; // Update state with saved data (includes new timestamp etc)
            error.value = null; // Clear error on success
            console.log('Store: Portfolio saved successfully:', portfolio.value);
            return portfolio.value; // Return saved data

        } catch (err) {
            console.error('Store: Error saving portfolio:', err.response?.data || err.message);
            // Set error state based on the response or Axios error
            error.value = err.response?.data?.message || // Specific message from backend (e.g., slug conflict)
                err.response?.data || // Raw error data from backend if no message field
                err.message || // Axios error message
                'Failed to save portfolio data.'; // Generic fallback
            portfolio.value = null; // Optionally clear portfolio state on save error, or keep old state? Decide based on UX.
            // Let's keep the old state for now so the form doesn't clear unexpectedly on error.
            // portfolio.value = null;
            throw new Error(error.value); // Re-throw the error message so the component can display it

        } finally {
            isLoading.value = false;
            console.log('Store: saveMyPortfolio finished.');
        }
    }

    /**
     * Clears the portfolio state, typically used on logout.
     */
    function clearPortfolio() {
        console.log('Store: Clearing portfolio state.');
        portfolio.value = null;
        isLoading.value = false;
        error.value = null;
    }

    // --- Return reactive state and actions ---
    return {
        portfolio,
        isLoading,
        error,
        fetchMyPortfolio,
        saveMyPortfolio,
        clearPortfolio
    };
});