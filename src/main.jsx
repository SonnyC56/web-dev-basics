import React, { StrictMode } from 'react'; // Import React and StrictMode for checks
import { createRoot } from 'react-dom/client'; // Import createRoot for modern React rendering
import App from './App.jsx'; // Import the main application component
import { TutorialProvider } from './context/TutorialContext.jsx'; // Import the context provider
import { tutorialSteps } from './tutorialSteps.js'; // Import the tutorial steps data
import './index.css'; // Import global styles

// --- Application Entry Point ---

// Find the specific HTML element in index.html where our React app will be attached.
// By convention, this is often a div with the ID 'root'.
const rootElement = document.getElementById('root');

// Create a React root attached to the DOM element.
// This is the starting point for rendering the React component tree.
const root = createRoot(rootElement);

// Render the main application component tree into the root.
root.render(
  // StrictMode is a development tool that helps identify potential problems
  // by enabling extra checks and warnings for its descendants. It does not
  // render any visible UI and only runs in development mode.
  <StrictMode>
    {/*
      Wrap the entire App component with the TutorialProvider.
      This makes the tutorial's state (current step, achievements, etc.)
      and functions (goToNextStep, etc.) available to any component
      within the App using the `useTutorial` hook (defined in TutorialContext.jsx).
      We pass the `tutorialSteps` data array (imported from tutorialSteps.js)
      to the provider so it knows about all the steps and their content.
    */}
    <TutorialProvider tutorialSteps={tutorialSteps}>
      {/* App is the root component of our application UI */}
      <App />
    </TutorialProvider>
  </StrictMode>
);
