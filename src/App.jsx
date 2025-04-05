import React from 'react';
// MUI Components: Import necessary components from Material UI library
import { Container, Typography, CssBaseline, Box } from '@mui/material';
// Custom Components: Import components created for this tutorial app
import TutorialContainer from './components/TutorialContainer.jsx'; // Component that displays the current tutorial step
import AchievementNotifier from './components/AchievementNotifier.jsx'; // Component that shows achievement popups
// import { useTutorial } from './context/TutorialContext.jsx'; // Context hook is used within TutorialContainer/AchievementNotifier now
import './App.css'; // Import styles specific to the App component

// --- Main Application Component ---

// This is the root component of our application's UI.
// It sets up the overall layout and renders the main content areas.
function App() {
  // State or context data needed directly in App could be accessed here,
  // but currently, the main logic is delegated to child components like TutorialContainer.
  // Example: const { someValue } = useTutorial();

  return (
    // React.Fragment is used to group multiple elements without adding an extra node to the DOM.
    // Useful here because we have the main content Container and the AchievementNotifier side-by-side.
    <React.Fragment>
      {/*
        CssBaseline is an MUI component that applies a consistent baseline styling
        across browsers, resetting margins, setting background colors, etc.
        It's good practice to include it once at the root of an MUI application.
      */}
      <CssBaseline />

      {/*
        Container is an MUI component that centers content horizontally and sets a max-width.
        'maxWidth="md"' sets the maximum width to MUI's medium breakpoint (adjust as needed).
        'className="app-container"' applies any custom styles defined in App.css for this container.
      */}
      <Container maxWidth="md" className="app-container">
        {/*
          Box is a generic MUI container component, useful for applying styling props directly via the 'sx' prop.
          'sx={{ my: 4 }}' adds vertical margin (margin-top and margin-bottom) using MUI's theme spacing scale (4 units = 32px by default).
        */}
        <Box sx={{ my: 4 }}>
          {/*
            Typography is used for rendering text elements with MUI's theme styles (font family, size, weight).
            'variant="h4"' applies heading level 4 styles.
            'component="h1"' renders it semantically as an <h1> HTML tag (important for accessibility and SEO).
            'gutterBottom' adds some standard margin below the text element.
          */}
          <Typography variant="h4" component="h1" gutterBottom>
            Interactive Web Dev Tutorial
          </Typography>

          {/*
            Render the TutorialContainer component. This component is responsible
            for fetching the current step data from the TutorialContext and
            displaying the appropriate content (text, code, video, etc.) and
            navigation buttons (Previous/Next).
          */}
          <TutorialContainer />
        </Box>
      </Container>

      {/*
        Render the AchievementNotifier component. This component listens to the
        TutorialContext for newly awarded achievements. When an achievement is awarded,
        it displays a Snackbar notification at the bottom of the screen.
        It's placed outside the main Container so the notification appears overlaid
        on top of the content, rather than being constrained by the Container's width.
      */}
      <AchievementNotifier />
    </React.Fragment>
  );
}

// Export the App component so it can be imported and used in main.jsx (the application entry point).
export default App;
