import React, { createContext, useState, useContext, useEffect } from 'react';

// --- Constants ---

// Define keys used for storing tutorial progress in the browser's Local Storage.
// Using constants helps prevent typos and makes it easier to manage these keys.
const LOCAL_STORAGE_KEYS = {
  CURRENT_STEP: 'tutorialCurrentStep',
  COMPLETED_STEPS: 'tutorialCompletedSteps',
  ACHIEVEMENTS: 'tutorialAchievements',
};

// --- Context Creation ---

// Create the actual React Context object.
// This object will hold the tutorial state and functions.
const TutorialContext = createContext();

// --- Custom Hook ---

// Create a custom hook `useTutorial` for easy access to the context's value.
// Components can call `useTutorial()` instead of `useContext(TutorialContext)` directly.
// This simplifies usage and encapsulates the context logic.
export const useTutorial = () => {
  return useContext(TutorialContext);
};

// --- Provider Component ---

// The TutorialProvider component wraps parts of the app that need access to the tutorial state.
// It manages the state internally and provides it to consuming components via the TutorialContext.
// - `children`: Represents the components wrapped by this provider (e.g., the entire App).
// - `tutorialSteps`: The array of step data objects passed down from main.jsx.
export const TutorialProvider = ({ children, tutorialSteps }) => {

  // --- State Variables ---

  // `currentStepIndex`: Stores the index (0, 1, 2, ...) of the currently active tutorial step.
  // Uses a function within useState for lazy initialization:
  // This function runs only once on initial render to load the value from Local Storage.
  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    const savedStep = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_STEP);
    // If a step index was saved, parse it as an integer; otherwise, default to 0 (the first step).
    return savedStep ? parseInt(savedStep, 10) : 0;
  });

  // `completedSteps`: Stores a Set of IDs for the steps the user has completed.
  // Using a Set is efficient for checking if a step ID exists (O(1) lookup).
  // Loads the initial set from Local Storage.
  const [completedSteps, setCompletedSteps] = useState(() => {
    const savedCompleted = localStorage.getItem(LOCAL_STORAGE_KEYS.COMPLETED_STEPS);
    // If saved data exists, parse the JSON string (which stores an array) and create a Set from it.
    // Otherwise, start with an empty Set.
    return savedCompleted ? new Set(JSON.parse(savedCompleted)) : new Set();
  });

  // `achievements`: Stores a Set of IDs for the achievements the user has earned.
  // Loads the initial set from Local Storage.
  const [achievements, setAchievements] = useState(() => {
    const savedAchievements = localStorage.getItem(LOCAL_STORAGE_KEYS.ACHIEVEMENTS);
    // If saved data exists, parse the JSON string and create a Set. Otherwise, start empty.
    return savedAchievements ? new Set(JSON.parse(savedAchievements)) : new Set();
  });

  // `lastAwardedAchievement`: Stores the ID of the most recently awarded achievement.
  // This state is specifically used to trigger the notification popup via the AchievementNotifier component.
  // It's set briefly when an achievement is awarded and then cleared.
  const [lastAwardedAchievement, setLastAwardedAchievement] = useState(null);

  // --- Persistence Effects ---
  // These useEffect hooks run whenever their dependency array values change.
  // They handle saving the current state to Local Storage.

  // Save `currentStepIndex` whenever it changes.
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_STEP, currentStepIndex.toString());
  }, [currentStepIndex]); // Dependency: run only when currentStepIndex changes

  // Save `completedSteps` whenever the Set changes.
  useEffect(() => {
    // Convert the Set to an Array before saving, as Local Storage only stores strings.
    localStorage.setItem(LOCAL_STORAGE_KEYS.COMPLETED_STEPS, JSON.stringify(Array.from(completedSteps)));
  }, [completedSteps]); // Dependency: run only when completedSteps changes

  // Save `achievements` whenever the Set changes.
  useEffect(() => {
    // Convert the Set to an Array before saving.
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(Array.from(achievements)));
  }, [achievements]); // Dependency: run only when achievements changes

  // --- Actions ---
  // These functions modify the state and are provided to consuming components via the context value.

  /**
   * Marks a specific tutorial step as completed by adding its ID to the completedSteps Set.
   * @param {string} stepId - The unique ID of the step to mark as complete.
   */
  const markStepComplete = (stepId) => {
    // Update the completedSteps state by adding the new stepId.
    // It uses the functional update form `setCompletedSteps(prev => ...)`
    // to ensure it works correctly even with potential batching of state updates.
    setCompletedSteps((prevCompleted) => {
      const newCompleted = new Set(prevCompleted); // Create a new Set based on the previous one
      newCompleted.add(stepId); // Add the new ID
      return newCompleted; // Return the new Set
    });
    // Note: Awarding achievements is handled in goToNextStep now.
  };

  /**
   * Awards a specific achievement if it hasn't been earned already.
   * Updates the achievements Set and triggers the notification mechanism.
   * @param {string} achievementId - The unique ID of the achievement to award.
   */
  const awardAchievement = (achievementId) => {
    // Only award (and trigger notification) if the achievement hasn't been earned before.
    if (!achievements.has(achievementId)) {
        setAchievements((prevAchievements) => {
            const newAchievements = new Set(prevAchievements);
            newAchievements.add(achievementId);
            console.log(`Achievement Unlocked: ${achievementId}`); // Log for debugging
            // Set the last awarded achievement ID. This state change will be detected
            // by the AchievementNotifier component to display the popup.
            setLastAwardedAchievement(achievementId);
            // Clear the last awarded ID shortly after setting it. This prevents the
            // notification from re-appearing if the user navigates back and forth
            // causing the context value to update again. 50ms is usually enough.
            setTimeout(() => setLastAwardedAchievement(null), 50);
            return newAchievements;
        });
    }
  };

  /**
   * Navigates to the next tutorial step.
   * Marks the current step as complete and awards any associated achievement before advancing.
   */
  const goToNextStep = () => {
    // Get the ID of the *current* step before potentially changing the index.
    const currentStepId = tutorialSteps[currentStepIndex]?.id;
    if (currentStepId) {
        // Mark the current step as complete.
        markStepComplete(currentStepId);
        // Check if this step has an associated achievement defined in tutorialSteps.js.
        const achievementToAward = tutorialSteps[currentStepIndex]?.achievement;
        if (achievementToAward) {
            // If yes, attempt to award it.
            awardAchievement(achievementToAward);
        }
    }

    // Update the current step index, moving forward by one.
    // Use Math.min to prevent the index from going beyond the last step.
    setCurrentStepIndex((prevIndex) =>
      Math.min(prevIndex + 1, tutorialSteps.length - 1)
    );
  };

  /**
   * Navigates to the previous tutorial step.
   */
  const goToPreviousStep = () => {
    // Update the current step index, moving backward by one.
    // Use Math.max to prevent the index from going below 0 (the first step).
    setCurrentStepIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  /**
   * Navigates directly to a specific step index.
   * Ensures the index is within the valid range of steps.
   * @param {number} index - The index of the step to navigate to.
   */
  const goToStep = (index) => {
    // Ensure the target index is valid (between 0 and the last step index)
    const newIndex = Math.max(0, Math.min(index, tutorialSteps.length - 1));
    setCurrentStepIndex(newIndex);
    // Note: We don't automatically mark steps complete or award achievements when jumping directly.
    // This is typically handled by sequential progression via goToNextStep.
  };


  /**
   * Resets all tutorial progress, including the current step, completed steps,
   * earned achievements, and clears the corresponding data from Local Storage.
   * Useful for testing or allowing users to restart the tutorial.
   */
  const resetProgress = () => {
    // Reset all state variables to their initial values.
    setCurrentStepIndex(0);
    setCompletedSteps(new Set());
    setAchievements(new Set());
    setLastAwardedAchievement(null);
    // Clear the corresponding items from Local Storage.
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_STEP);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.COMPLETED_STEPS);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACHIEVEMENTS);
    console.log('Tutorial progress reset.'); // Log for confirmation
  };

  // --- Context Value ---

  // Create the 'value' object that will be provided to consuming components via the context.
  // This object contains the state variables and action functions needed by the UI.
  const value = {
    currentStepIndex,         // The index of the current step
    completedSteps,           // The Set of completed step IDs
    achievements,             // The Set of earned achievement IDs
    goToNextStep,             // Function to go to the next step
    goToPreviousStep,         // Function to go to the previous step
    goToStep,                 // Function to jump to a specific step index
    markStepComplete,         // Function to manually mark a step complete (exposed, but used internally by goToNextStep)
    awardAchievement,         // Function to manually award an achievement (exposed, but used internally by goToNextStep)
    resetProgress,            // Function to reset all progress
    totalSteps: tutorialSteps.length, // Total number of steps (for progress indicators)
    currentStepData: tutorialSteps[currentStepIndex] || null, // The data object for the current step
    lastAwardedAchievement,   // The ID of the last achievement awarded (for notifier),
    tutorialSteps: tutorialSteps, // Expose the full steps array for stepper generation
  };

  // --- Provider Return ---

  // Return the Context Provider component.
  // It wraps the `children` (the rest of the app) and makes the `value` object
  // available to any descendant component that uses the `useTutorial` hook.
  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
};
