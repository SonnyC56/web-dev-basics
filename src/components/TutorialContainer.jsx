import React from 'react';
// Import Material UI components for layout and styling
import { Card, CardContent, Typography, Button, Box, Stepper, Step, StepLabel } from '@mui/material';
// Import the custom hook to access the tutorial context
import { useTutorial } from '../context/TutorialContext';
// Import specific components used to render different types of content within a step
import CodeBlock from './CodeBlock';
import SimulatedTerminal from './SimulatedTerminal';
import FileStructure from './FileStructure';
import VideoEmbed from './VideoEmbed'; // Import the new video component
// import AchievementPopup from './AchievementPopup'; // Optional: Could be added later

// --- Tutorial Container Component ---
// This component is the main view for the tutorial steps.
// It fetches the current step's data from the context and renders its content.
// It also provides navigation buttons (Previous/Next).
const TutorialContainer = () => {
  // Use the custom hook to get state and actions from the TutorialContext
  const {
    currentStepIndex,    // Index of the currently displayed step (e.g., 0, 1, 2...)
    currentStepData,     // The full data object for the current step from tutorialSteps.js
    goToNextStep,        // Function from context to advance to the next step
    goToPreviousStep,    // Function from context to go back to the previous step
    totalSteps,          // Total number of steps in the tutorial
    // achievements,     // Could be used later if displaying achievements list here
    // completedSteps    // Could be used later for styling (e.g., marking steps in a Stepper)
  } = useTutorial();

  // Loading state: If the step data hasn't loaded yet (e.g., initial render), display a message.
  if (!currentStepData) {
    return <Typography>Loading tutorial step...</Typography>;
  }

  // --- Content Rendering Logic ---
  /**
   * Renders a specific piece of content based on its type defined in tutorialSteps.js.
   * @param {object} contentItem - The content object (e.g., { type: 'text', value: '...' }).
   * @param {number} index - The index of the content item within the step's content array (used for React keys).
   * @returns {JSX.Element|null} The React element to render or null if type is unsupported.
   */
  const renderContent = (contentItem, index) => {
    switch (contentItem.type) {
      case 'text':
        // Render simple text paragraphs using MUI Typography
        return <Typography key={index} paragraph>{contentItem.value}</Typography>;
      case 'code':
        // Render code blocks using the CodeBlock component
        return <CodeBlock key={index} language={contentItem.language} code={contentItem.value} />;
      case 'list':
        // Render unordered lists
        return (
          // Apply some basic styling for indentation and spacing
          <ul key={index} style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '16px' }}>
            {contentItem.items.map((item, i) => (
              // Use dangerouslySetInnerHTML to allow basic HTML like `<code>` tags within list items
              // Be cautious with this if the source of `item` is not trusted. Here it's safe as it comes from our own `tutorialSteps.js`.
              <li key={i}><Typography component="span" dangerouslySetInnerHTML={{ __html: item }} /></li>
            ))}
          </ul>
        );
      case 'simulated-terminal':
        // Render simulated terminal output using the SimulatedTerminal component
        return <SimulatedTerminal key={index} command={contentItem.command} output={contentItem.output} />;
       case 'file-structure':
         // Render file structure diagrams using the FileStructure component
        return <FileStructure key={index} structure={contentItem.structure} />;
      case 'video': // Handle the 'video' content type
        // Render embedded videos using the VideoEmbed component
        return <VideoEmbed key={index} url={contentItem.url} title={contentItem.title || currentStepData.title} />;
      default:
        // Log a warning if an unknown content type is encountered
        console.warn(`Unsupported content type: ${contentItem.type}`);
        return null; // Don't render anything for unknown types
    }
  };

  // --- Component Return JSX ---
  return (
    // Use MUI Card component for styled framing of the content
    <Card variant="outlined">
      <CardContent>
        {/* Display the title of the current step and the progress (e.g., "Step 3 of 15") */}
        <Typography variant="h5" component="h2" gutterBottom>
          {currentStepData.title} (Step {currentStepIndex + 1} of {totalSteps})
        </Typography>

        {/* Map over the content array of the current step and render each item using renderContent */}
        {currentStepData.content.map(renderContent)}

        {/* Navigation Buttons Section */}
        {/* Use Box with flex display for layout */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}> {/* mt: 3 adds margin-top */}
          {/* Previous Button */}
          <Button
            variant="contained" // Contained style button
            onClick={goToPreviousStep} // Call context function on click
            disabled={currentStepIndex === 0} // Disable the button if it's the first step
          >
            Previous
          </Button>
          {/* Next Button */}
          <Button
            variant="contained" // Contained style button
            color="primary" // Use primary theme color
            onClick={goToNextStep} // Call context function on click
            disabled={currentStepIndex === totalSteps - 1} // Disable the button if it's the last step
          >
            Next
          </Button>
        </Box>

         {/* --- Optional Enhancements (Commented Out) --- */}

         {/* Optional: Display Stepper for visual progress indication */}
         {/*
         <Stepper activeStep={currentStepIndex} alternativeLabel sx={{ mt: 3 }}>
            {Array.from({ length: totalSteps }).map((_, index) => (
              <Step key={index}>
                <StepLabel></StepLabel> // Could add step titles here later
              </Step>
            ))}
          </Stepper>
         */}

         {/* Optional: Placeholder for displaying earned achievements directly in the container */}
         {/* <AchievementPopup /> */}

      </CardContent>
    </Card>
  );
};

// Export the component for use in other parts of the application (like App.jsx)
export default TutorialContainer;
