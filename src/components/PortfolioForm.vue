<template>
  <form @submit.prevent="submitForm" :aria-busy="isSubmitting">
    <div class="form-field">
      <label for="aboutMe">About Me:</label>
      <textarea id="aboutMe" v-model="editablePortfolio.aboutMeText" rows="6" :disabled="isSubmitting"></textarea>
    </div>

    <div class="form-field">
      <label for="slug">Public Slug:</label>
      <input type="text" id="slug" v-model.trim="editablePortfolio.publicSlug" :disabled="isSubmitting" placeholder="e.g., your-unique-name" required> <!-- Added .trim and required -->
      <small>Unique identifier for your public portfolio URL (lowercase letters, numbers, hyphens).</small>
    </div>

    <div class="form-field">
      <label for="contactEmail">Contact Email:</label>
      <input type="email" id="contactEmail" v-model.trim="editablePortfolio.contactEmail" :disabled="isSubmitting" required> <!-- Added .trim and required -->
    </div>

    <div class="form-field">
      <label for="resumeUrl">Resume URL:</label>
      <input type="url" id="resumeUrl" v-model.trim="editablePortfolio.resumeUrl" :disabled="isSubmitting" placeholder="https://...">
    </div>

    <div class="form-field">
      <label for="linkedinUrl">LinkedIn URL:</label>
      <input type="url" id="linkedinUrl" v-model.trim="editablePortfolio.linkedInUrl" :disabled="isSubmitting" placeholder="https://linkedin.com/in/...">
    </div>

    <div class="form-field">
      <label for="githubUrl">GitHub URL:</label>
      <input type="url" id="githubUrl" v-model.trim="editablePortfolio.githubUrl" :disabled="isSubmitting" placeholder="https://github.com/...">
    </div>

    <div class="form-actions">
      <!-- Disable save if submitting OR if it's NOT creating AND no changes made -->
      <button type="submit" :disabled="isSubmitting || (!props.isCreating && !isChanged)">
        <span v-if="isSubmitting">{{ props.isCreating ? 'Creating...' : 'Saving...' }}</span>
        <span v-else>{{ props.isCreating ? 'Create Portfolio' : 'Save Changes' }}</span>
      </button>
      <!-- Only show Discard button if NOT creating AND changes have been made -->
      <button v-if="!props.isCreating && isChanged" type="button" @click="resetForm" :disabled="isSubmitting">
        Discard Changes
      </button>
    </div>
    <p v-if="saveError" style="color: red; margin-top: 1rem;">{{ saveError }}</p>
    <!-- Show different success message for create vs update -->
    <p v-if="saveSuccess" style="color: green; margin-top: 1rem;">
      {{ props.isCreating ? 'Portfolio created successfully!' : 'Portfolio updated successfully!' }}
    </p>
  </form>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

// Props definition
const props = defineProps({
  initialData: {
    type: Object,
    required: true // Make initialData required for clarity
  },
  isCreating: {
    type: Boolean,
    default: false
  },
  isSubmitting: {
    type: Boolean,
    default: false
  },
  saveError: {
    type: String,
    default: ''
  },
  saveSuccess: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['save-portfolio']);

// Local state, deep copy initial data to avoid modifying prop directly
const editablePortfolio = ref(JSON.parse(JSON.stringify(props.initialData)));

// Track changes compared to the initial data *passed in the current render*
const isChanged = computed(() => {
  return JSON.stringify(editablePortfolio.value) !== JSON.stringify(props.initialData);
});

// Watch for external changes to initialData (e.g., after fetch completes)
// and update the local form state *only if it hasn't been changed by the user yet*
// or if we are forcing a reset (like after successful save)
watch(() => props.initialData, (newData) => {
  console.log('Form: initialData prop changed.', newData);
  // Only reset form if it hasn't been changed by user compared to the NEW incoming data
  // This prevents overwriting edits if fetch finishes while user is typing
  if (JSON.stringify(editablePortfolio.value) === JSON.stringify(newData)) {
    console.log('Form: New initialData matches current form, no reset needed.');
  } else if (!isChanged.value) {
    // If user hasn't made changes relative to the *old* initialData, safe to update
    console.log('Form: Resetting form to new initialData (no user changes detected).');
    editablePortfolio.value = JSON.parse(JSON.stringify(newData));
  } else {
    console.log('Form: User changes detected, not overwriting with new initialData.');
  }

}, { deep: true, immediate: true }); // immediate: true helps set initial editable state


const resetForm = () => {
  console.log('Form: Discarding changes.');
  // Reset local state back to the current initialData prop
  editablePortfolio.value = JSON.parse(JSON.stringify(props.initialData));
};

const submitForm = () => {
  // Basic client-side check for required fields if needed
  if (props.isCreating && (!editablePortfolio.value.publicSlug || !editablePortfolio.value.contactEmail)) {
    alert('Public Slug and Contact Email are required to create a portfolio.');
    return;
  }
  console.log('Form: Emitting save-portfolio event.');
  emit('save-portfolio', JSON.parse(JSON.stringify(editablePortfolio.value)));
};

</script>

<style scoped>
/* Styles remain the same */
.form-field { margin-bottom: 1.5rem; }
label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
input[type="text"], input[type="email"], input[type="url"], textarea { min-height: 40px; }
textarea { resize: vertical; }
small { display: block; margin-top: 0.25rem; font-size: 0.85em; color: var(--color-text-secondary); }
.form-actions { margin-top: 2rem; display: flex; gap: 1rem; }
</style>