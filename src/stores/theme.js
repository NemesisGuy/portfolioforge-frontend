// src/stores/theme.js
import { ref, onMounted } from 'vue' // Removed 'watch'
import { defineStore } from 'pinia'

// No need for TypeScript 'Theme' type definition

export const useThemeStore = defineStore('theme', () => {
    // --- State ---
    const currentTheme = ref('light') // Initialize with 'light'

    // --- Actions ---

    const applyTheme = (theme) => {
        const root = document.documentElement
        root.classList.remove('light', 'dark')

        if (theme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.add('light') // Or rely on :root defaults
        }

        currentTheme.value = theme

        try {
            localStorage.setItem('portfolio-theme', theme)
            console.log(`Theme set to ${theme} and saved.`)
        } catch (e) {
            console.error("Failed to save theme preference to localStorage:", e)
        }
    }

    const toggleTheme = () => {
        const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
        applyTheme(newTheme)
    }

    const setTheme = (theme) => {
        if (theme === 'light' || theme === 'dark') {
            applyTheme(theme)
        } else {
            console.warn(`Invalid theme value provided: ${theme}. Defaulting to light.`);
            applyTheme('light');
        }
    }

    // --- Initialization Logic ---
    onMounted(() => {
        let initialTheme = 'light';
        console.log('Theme store mounted, determining initial theme...');

        try {
            const savedTheme = localStorage.getItem('portfolio-theme');

            if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
                console.log(`Found saved theme: ${savedTheme}`);
                initialTheme = savedTheme
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                console.log('No saved theme, detecting system preference: dark');
                initialTheme = 'dark'
            } else {
                console.log('No saved theme or system preference for dark, defaulting to light.');
            }
        } catch(e) {
            console.error("Failed to load theme preference:", e)
            initialTheme = 'light';
        }
        applyTheme(initialTheme)

        const matcher = window.matchMedia('(prefers-color-scheme: dark)');
        const systemThemeListener = (e) => { // No type annotation for 'e'
            try {
                if (!localStorage.getItem('portfolio-theme')) {
                    console.log('System theme changed, updating application theme.');
                    applyTheme(e.matches ? 'dark' : 'light');
                } else {
                    console.log('System theme changed, but user preference exists, not changing application theme.');
                }
            } catch (error) {
                console.error('Error handling system theme change:', error);
            }
        };

        if (matcher.addEventListener) {
            matcher.addEventListener('change', systemThemeListener);
        } else if (matcher.addListener) {
            matcher.addListener(systemThemeListener);
        }
    })

    // --- Return state and actions ---
    return {
        currentTheme,
        toggleTheme,
        setTheme
    }
})