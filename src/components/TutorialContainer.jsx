import React from 'react';
// Import Material UI components for layout and styling
import { Card, CardContent, Typography, Button, Box, Stepper, Step, StepLabel, Stack } from '@mui/material'; // Added Stack
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
    goToStep,            // Function to jump to a specific step index
    totalSteps,          // Total number of steps in the tutorial
    tutorialSteps,       // Full array of step data (needed for stepper)
    completedSteps,      // Set of completed step IDs (for stepper styling)
    // achievements,     // Could be used later if displaying achievements list here
  } = useTutorial();

  // Group steps by section for the Stepper
  const stepsBySection = tutorialSteps.reduce((acc, step, index) => {
    const section = step.section || 'General'; // Default section if none provided
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push({ ...step, originalIndex: index }); // Store original index
    return acc;
  }, {});

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
    // Reverted: Key application moved back outside this function
    switch (contentItem.type) {
      case 'text':
        return <Typography variant="body1" paragraph>{contentItem.value}</Typography>;
      case 'code':
        // Pass contentItem.code, not contentItem.value
        return <CodeBlock language={contentItem.language} code={contentItem.code} />;
      case 'list':
        return (
          // Inner list items still need keys
          <ul style={{ paddingLeft: '20px', margin: 0 }}> {/* Remove marginTop/marginBottom */}
            {contentItem.items.map((item, i) => (
              <li key={`list-item-${index}-${i}`}><Typography variant="body1" component="span" dangerouslySetInnerHTML={{ __html: item }} /></li>
            ))}
          </ul>
        );
      case 'simulated-terminal':
        return <SimulatedTerminal command={contentItem.command} output={contentItem.output} />;
      case 'file-structure': // Fixed extra space before 'case'
        return <FileStructure structure={contentItem.structure} />;
      case 'video': // Handle the 'video' content type
        return <VideoEmbed url={contentItem.url} title={contentItem.title || currentStepData.title} />;
      default:
        // Log a warning if an unknown content type is encountered
        console.warn(`Unsupported content type: ${contentItem.type}`);
        return null; // Don't render anything for unknown types
    }
  };

  // --- Defensive Checks for Imported Components ---
  // Log warnings if any imported components are undefined, helping debug potential import/export issues.
  if (!CodeBlock) console.warn("TutorialContainer: CodeBlock component is undefined.");
  if (!SimulatedTerminal) console.warn("TutorialContainer: SimulatedTerminal component is undefined.");
  if (!FileStructure) console.warn("TutorialContainer: FileStructure component is undefined.");
  if (!VideoEmbed) console.warn("TutorialContainer: VideoEmbed component is undefined.");

  // --- Explicit Check for Undefined Components ---
  // If any required component is missing, render an error message instead of crashing.
  if (!CodeBlock || !SimulatedTerminal || !FileStructure || !VideoEmbed) {
    const missing = [
      !CodeBlock && "CodeBlock",
      !SimulatedTerminal && "SimulatedTerminal",
      !FileStructure && "FileStructure",
      !VideoEmbed && "VideoEmbed"
    ].filter(Boolean).join(", ");
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography color="error">
            Error: Required component(s) are undefined: {missing}. Please check imports/exports.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // --- Debugging Logs ---
  console.log('TutorialContainer rendering. currentStepData:', currentStepData);
  console.log('TutorialContainer rendering. stepsBySection:', stepsBySection);
  console.log('TutorialContainer rendering. tutorialSteps:', tutorialSteps); // Log the raw steps too

  // Check MUI components
  if (!Card || !CardContent || !Typography || !Button || !Box || !Stepper || !Step || !StepLabel || !Stack) {
      console.error("CRITICAL: One or more MUI components are undefined! Check imports and installation.", {
          Card, CardContent, Typography, Button, Box, Stepper, Step, StepLabel, Stack
      });
      // Render an error message if MUI components are missing
      return (
          <div style={{ color: 'red', padding: '20px', border: '1px solid red' }}>
              Critical Error: Material UI components failed to load. Check console for details.
          </div>
      );
  }


  // --- Component Return JSX ---
  return (
    // Use MUI Card component for styled framing of the content
    <Card variant="outlined">
      <CardContent>
        {/* Display the title of the current step and the progress (e.g., "Step 3 of 15") */}
        <Typography variant="h5" component="h2" gutterBottom>
          {currentStepData.title} (Step {currentStepIndex + 1} of {totalSteps})
        </Typography>

        {/* Use Stack to manage layout and spacing of content items */}
        <Stack spacing={2}> {/* spacing={2} adds consistent vertical space */}
          {/* Reverted: Map over the content array and wrap in Fragment with key */}
          {currentStepData.content.map((item, index) => {
            const renderedItem = renderContent(item, index);
            // Wrap the rendered item in a React Fragment with a key for proper list rendering
            return renderedItem ? <React.Fragment key={`content-${index}`}>{renderedItem}</React.Fragment> : null;
          })}
        </Stack>

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

        {/* --- Section Navigation Stepper --- */}
        <Box sx={{ mt: 4 }}> {/* Add margin top for spacing */}
          <Typography variant="h6" gutterBottom>Tutorial Progress</Typography>
          {Object.entries(stepsBySection).map(([section, stepsInSection]) => {
            // Find the active step index within this section
            const activeSectionStepIndex = stepsInSection.findIndex(
              step => step.originalIndex === currentStepIndex
            );
            
            return (
              <Box key={`section-${section}`} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>{section}</Typography>
                <Stepper 
                  key={`stepper-${section}`} 
                  activeStep={activeSectionStepIndex} 
                  nonLinear 
                  alternativeLabel
                >
                  {stepsInSection.map((step) => (
                    <Step 
                      key={`step-${step.id}`} 
                      completed={completedSteps.has(step.id) && step.originalIndex !== currentStepIndex}
                      active={step.originalIndex === currentStepIndex}
                    >
                      <StepLabel
                        onClick={() => goToStep(step.originalIndex)}
                        sx={{ 
                          cursor: 'pointer', 
                          '& .MuiStepLabel-label': { 
                            fontSize: '0.8rem',
                            fontWeight: step.originalIndex === currentStepIndex ? 'bold' : 'normal'
                          } 
                        }}
                      >
                        {step.title.split(':')[0]}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            );
          })}
        </Box>

        {/* Optional: Placeholder for displaying earned achievements directly in the container */}
        {/* <AchievementPopup /> */}

      </CardContent>
    </Card>
  );
};

// Export the component for use in other parts of the application (like App.jsx)
export default TutorialContainer;
