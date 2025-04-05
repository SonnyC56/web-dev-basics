# Tech Context: Interactive Web Dev Tutorial App

## 1. Core Technologies

*   **Build Tool:** Vite (`latest` version at project start)
*   **UI Library:** React (`latest` version via Vite template)
*   **Language:** JavaScript (ES6+)
*   **Package Manager:** npm (comes with Node.js)
*   **Styling/Component Library:** Material UI (`@mui/material`, `@emotion/react`, `@emotion/styled`, `@mui/icons-material`)
*   **Version Control (Guidance):** Git
*   **Hosting Platform (Guidance):** Netlify

## 2. Development Environment Setup

*   **Required:**
    *   Node.js (LTS version recommended) - Includes npm. Installation will be covered conceptually in the tutorial.
    *   A modern web browser (Chrome, Firefox, Edge, Safari).
    *   A text editor (VS Code recommended, but not strictly required to follow the tutorial's simulated steps).
*   **Project Setup Command (Simulated & Explained):**
    ```bash
    npm create vite@latest web-dev-tutorial -- --template react
    cd web-dev-tutorial
    npm install
    npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
    npm run dev
    ```
    *(Note: The tutorial app itself will be pre-built, but it will guide the user through understanding these commands as if they were running them).*

## 3. Key Dependencies (Initial)

*   `react`, `react-dom`: Core React libraries.
*   `@vitejs/plugin-react`: Vite plugin for React support.
*   `@mui/material`, `@emotion/react`, `@emotion/styled`: Material UI core and styling engine.
*   `@mui/icons-material`: Material UI icons.
*   *(Potentially `react-router-dom` if multi-page navigation is implemented later)*

## 4. Technical Constraints & Considerations

*   **Beginner Focus:** Code complexity must be kept to a minimum. Concepts should be introduced gradually. Avoid advanced JavaScript features or complex React patterns unless necessary and well-explained.
*   **Client-Side Only:** All logic runs in the browser. No backend development is involved in building the app itself.
*   **Local Storage Limits:** Local storage has size limitations (usually 5-10MB), which is more than sufficient for storing progress strings/numbers but not suitable for large amounts of data.
*   **Simulation vs. Reality:** The app simulates terminal commands (with copyable commands) and file structures. While aiming for accuracy, it's a representation, not a live terminal or file system interaction within the user's actual machine *by the app itself*. The goal is to teach the *concepts* so the user can perform them for real later.
*   **External Dependencies:** The tutorial relies on external services (Node.js installation, GitHub, Netlify) and external video content (YouTube). Availability of these external resources is assumed.
*   **Video Embedding:** Uses standard `iframe` embedding for YouTube videos via the `VideoEmbed` component. Assumes videos remain available at the provided URLs.

## 5. Build & Deployment (Guidance)

*   **Build Command:** `npm run build` (Creates a production-ready build in the `dist` folder).
*   **Deployment:** Guide users through connecting a GitHub repository to Netlify for continuous deployment. Explain the concept of build commands and publish directories within Netlify's UI. Potentially include creating a `netlify.toml` file if specific configurations are needed.
