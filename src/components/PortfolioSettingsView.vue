<template>
  <div>
    <h2>Portfolio Settings</h2>
    <!-- Show different text based on whether creating or updating -->
    <p v-if="!isCreating">Manage your public portfolio details here.</p>
    <p v-else>Create your initial portfolio details.</p>
    <hr style="margin: 1.5rem 0;">

    <!-- Loading State -->
    <div v-if="portfolioStore.isLoading && !portfolioStore.portfolio" class="loading-state">
      Loading portfolio data...
    </div>

    <!-- Error State -->
    <div v-else-if="portfolioStore.error && !portfolioStore.portfolio" class="error-state">
      <p style="color: red;">Error loading portfolio: {{ portfolioStore.error }}</p>
      <button @click="retryFetch" class="button">Retry</button>
    </div>

    <!-- Data Loaded or Ready for Creation -->
    <div v-else> <!-- This should render if error is null and loading is false -->
      <PortfolioForm
          :initial-data="currentPortfolioData"
          :is-creating="isCreating"
          :is-submitting="isSaving"
          :save-error="saveError"
          :save-success="saveSuccess"
          @save-portfolio="handleSave"
      />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';
import PortfolioForm from '@/components/PortfolioForm.vue';

const portfolioStore = usePortfolioStore();

const isSaving = ref(false);
const saveError = ref('');
const saveSuccess = ref(false);

// Computed: Determine if we are creating (no existing portfolio after load attempt)
const isCreating = computed(() => {
  // True if not loading, no error preventing load, and portfolio is still null/undefined
  console.log(`isCreating Check: isLoading=${portfolioStore.isLoading}, error=${portfolioStore.error}, portfolio=${portfolioStore.portfolio}`);
  const result = !portfolioStore.isLoading && portfolioStore.error === null && portfolioStore.portfolio === null;
  console.log(`isCreating Result: ${result}`);
  return result;
});

// Computed: Provide default empty object for creation mode
const currentPortfolioData = computed(() => {
  return portfolioStore.portfolio || {
    aboutMeText: '', publicSlug: '', contactEmail: '',
    resumeUrl: '', linkedInUrl: '', githubUrl: ''
  };
});

const handleSave = async (formData) => {
  isSaving.value = true;
  saveError.value = '';
  saveSuccess.value = false;
  console.log(`View: Saving portfolio (${isCreating.value ? 'create' : 'update'})...`, formData);
  try {
    await portfolioStore.saveMyPortfolio(formData); // Store action handles create/update
    saveSuccess.value = true;
    // If creating, we might want to trigger a re-fetch or rely on store update
    if (isCreating.value) {
      console.log("Creation successful, portfolio state should update.");
      // Optionally force a fetch if store doesn't update reactive reference correctly
      await portfolioStore.fetchMyPortfolio();
    }
    setTimeout(() => saveSuccess.value = false, 3500); // Slightly longer timeout
  } catch (err) {
    saveError.value = err.message || 'Failed to save portfolio.';
    // Clear success message on error
    saveSuccess.value = false;
  } finally {
    isSaving.value = false;
  }
};

const retryFetch = () => {
  portfolioStore.fetchMyPortfolio();
};

onMounted(() => {
  // Attempt to fetch data if it's not already loaded and not currently loading
  // This handles the case where the user navigates directly to the page
  if (!portfolioStore.portfolio && !portfolioStore.isLoading) {
    console.log('PortfolioSettingsView mounted, fetching portfolio...');
    portfolioStore.fetchMyPortfolio();
  } else {
    console.log('PortfolioSettingsView mounted, portfolio data already in store or loading.');
  }
});
</script>

<style scoped>
.loading-state, .error-state {
  padding: 2rem;
  text-align: center;
  color: var(--color-text-secondary);
}
hr {
  border: none;
  border-top: 1px solid var(--color-border);
}
/* Add margin to retry button if needed */
.error-state button {
  margin-top: 1rem;
}
</style>