# portfolioforge-frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
# PortfolioForge - Frontend (Vue.js)

This repository contains the Vue.js 3 frontend application for PortfolioForge, built using Vite. It interacts with the [PortfolioForge Backend API](link-to-your-backend-repo) to provide a platform for users to create, manage, and showcase their personal portfolios.

## Features

*   User Registration & Login forms.
*   JWT Authentication handling (including storing access tokens and using refresh tokens via HttpOnly cookies).
*   Routing using Vue Router.
*   State management using Pinia (for auth status, user info, etc.).
*   Dark Mode toggle with localStorage persistence.
*   (Planned) Dashboard for authenticated users to manage their portfolio, projects, and skills.
*   (Planned) Public portfolio view pages based on user slugs.
*   (Planned) Contact form submission.

## Technology Stack

*   **Framework:** Vue.js 3 (Composition API with `<script setup>`)
*   **Build Tool:** Vite
*   **Routing:** Vue Router
*   **State Management:** Pinia
*   **HTTP Client:** Axios
*   **Styling:** Basic CSS with CSS Variables (Dark Mode supported) - (Can be replaced with Tailwind/Vuetify etc. later)
*   **Language:** JavaScript (or TypeScript if you used the `-ts` template)

## Prerequisites

*   **Node.js:** LTS version (e.g., 18.x or 20.x) recommended.
*   **npm** (usually comes with Node.js) or yarn/pnpm.
*   **Running Backend API:** The [PortfolioForge Backend](link-to-your-backend-repo) must be running locally (usually on `http://localhost:8080`) for the frontend to connect to.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YourUsername/portfolioforge-frontend.git
    cd portfolioforge-frontend
    ```
    *(Replace `YourUsername` with your actual GitHub username)*

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure API Base URL (Optional but Recommended):**
    You might want to configure the base URL for Axios requests. You can do this by creating an Axios instance or setting it globally. For development, ensure it points to your running backend (e.g., `http://localhost:8080/api/v1`). This can be set in environment variables (`.env` files) for different build modes.
    *(We will configure this when implementing API calls)*

## Running the Development Server

1.  **Start the server:**
    ```bash
    npm run dev
    ```
2.  **Open your browser:** Navigate to the URL provided by Vite (usually `http://localhost:5173` or similar).

## Building for Production

```bash
npm run build