import React, { useState, useEffect } from 'react';
// Import Material UI components for the notification popup (Snackbar and Alert)
import { Snackbar, Alert, AlertTitle } from '@mui/material';
// Import the custom hook to access the tutorial context
import { useTutorial } from '../context/TutorialContext';
// Import the predefined list of achievement details (name, description, icon) from tutorialSteps.js
import { achievementsList } from '../tutorialSteps.js';

// --- AchievementNotifier Component ---
// This component listens for newly awarded achievements in the TutorialContext
// and displays a temporary notification (Snackbar with Alert) at the bottom of the screen.
const AchievementNotifier = () => {
  // Get the ID of the most recently awarded achievement from the context.
  // This value (`lastAwardedAchievement`) is briefly set in the context when an achievement
  // is awarded (in the `awardAchievement` function) and then cleared shortly after via setTimeout.
  const { lastAwardedAchievement } = useTutorial();

  // State to control the visibility (open/closed) of the Snackbar notification.
  const [open, setOpen] = useState(false);
  // State to store the details (name, description, icon) of the achievement currently being displayed.
  const [achievementDetails, setAchievementDetails] = useState(null);

  // --- Effect Hook ---
  // This useEffect hook runs whenever the `lastAwardedAchievement` value from the context changes.
  useEffect(() => {
    // Check if `lastAwardedAchievement` has a value (is not null) and if that ID
    // exists as a key in our `achievementsList` object.
    if (lastAwardedAchievement && achievementsList[lastAwardedAchievement]) {
      // If a valid new achievement ID is received, look up its details.
      setAchievementDetails(achievementsList[lastAwardedAchievement]);
      // Set the 'open' state to true, which triggers the Snackbar to appear.
      setOpen(true);
    }
    // The dependency array `[lastAwardedAchievement]` ensures this effect only re-runs
    // when the `lastAwardedAchievement` value actually changes.
  }, [lastAwardedAchievement]);

  // --- Event Handler ---
  /**
   * Handles the closing of the Snackbar notification.
   * This function is passed to both the Snackbar's `onClose` prop and the Alert's `onClose` prop.
   * It can be triggered by the Snackbar's autoHideDuration timeout or by clicking the close button on the Alert.
   * @param {React.SyntheticEvent | Event} event - The event source of the callback.
   * @param {string} [reason] - Can be: 'timeout', 'clickaway', etc. (provided by Snackbar).
   */
  const handleClose = (event, reason) => {
    // Prevent closing the Snackbar if the user clicks outside of it ('clickaway').
    // We generally want it to close only on timeout or explicit close action (like the 'x' button).
    if (reason === 'clickaway') {
      return;
    }
    // Set 'open' state to false to hide the Snackbar (triggers closing animation).
    setOpen(false);
    // Optional: Could reset achievementDetails here after a delay matching the Snackbar's
    // closing animation, but it's not strictly necessary as the effect hook handles updates
    // when a *new* lastAwardedAchievement comes in.
    // setTimeout(() => setAchievementDetails(null), 300);
  };

  // --- Conditional Rendering ---
  // If there are no achievement details currently set (meaning no new achievement to notify about,
  // or the notification has already closed), render nothing (null). This prevents rendering
  // an empty Snackbar or Alert.
  if (!achievementDetails) {
    return null;
  }

  // --- Component Return JSX ---
  // Render the MUI Snackbar component, which provides the popup container.
  return (
    <Snackbar
      open={open} // Control visibility with the 'open' state.
      autoHideDuration={6000} // Automatically hide the Snackbar after 6000ms (6 seconds).
      onClose={handleClose} // Function to call when Snackbar tries to close (e.g., on timeout).
      // Position the Snackbar at the bottom center of the screen.
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      {/*
        Render an MUI Alert component *inside* the Snackbar.
        Using Alert provides better styling and standard features for notifications,
        including severity levels (success, error, etc.), icons, titles, and an optional close button.
      */}
      <Alert
        onClose={handleClose} // Allow closing via the Alert's built-in close button (if displayed).
        severity="success"    // Use 'success' styling (typically green).
        variant="filled"      // Use a filled background style for better visibility.
        sx={{ width: '100%' }} // Ensure the Alert fills the width of the Snackbar container.
        // Use the icon defined in achievementsList for this achievement,
        // or fall back to a default trophy emoji if no icon is specified.
        icon={achievementDetails.icon || '🏆'}
      >
        {/* Use AlertTitle for a standard, slightly bolder title text. */}
        <AlertTitle>Achievement Unlocked!</AlertTitle>
        {/* Display the achievement name (using <strong> for emphasis) and its description. */}
        <strong>{achievementDetails.name}</strong> - {achievementDetails.description}
      </Alert>
    </Snackbar>
  );
};

// Export the component for use in App.jsx
export default AchievementNotifier;
