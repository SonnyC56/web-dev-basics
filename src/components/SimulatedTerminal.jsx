import React, { useState } from 'react';
// Import Material UI components for layout, text, tooltips, and icons
import { Box, Typography, Tooltip, IconButton } from '@mui/material';
// Import specific icons used for the copy button
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // Copy icon
import CheckIcon from '@mui/icons-material/Check'; // Checkmark icon (shown after copy)

// --- Styling ---
// Styles for the main terminal container box
const terminalStyle = {
  backgroundColor: '#2d2d2d', // Dark grey background, common for terminals
  color: '#00ff00',           // Bright green text, classic terminal look
  fontFamily: 'monospace',    // Monospace font is essential for terminal output
  fontSize: '0.9rem',         // Slightly smaller font size
  padding: '16px',            // Internal spacing
  paddingTop: '40px',         // Extra top padding to avoid overlap with copy button
  borderRadius: '4px',        // Slightly rounded corners
  overflowX: 'auto',          // Add horizontal scrollbar if content is too wide
  marginTop: '16px',          // Margin above the block
  marginBottom: '16px',       // Margin below the block
  position: 'relative',       // Needed for positioning the absolute copy button
};

// Styles for the command prompt symbol ($)
const promptStyle = {
  color: '#ffffff',           // White color for the prompt symbol
  marginRight: '8px',         // Space between prompt and command text
};

// --- SimulatedTerminal Component ---
// Displays a simulated terminal window showing a command and its output.
// Includes a button to copy the command text.
// Props:
// - command: String containing the command that was "run".
// - output: Array of strings, where each string is a line of output from the command.
const SimulatedTerminal = ({ command, output }) => {
  // State to track whether the command has just been copied (for visual feedback)
  const [copied, setCopied] = useState(false);

  // --- Event Handler ---
  /**
   * Handles the click event for the copy button.
   * Copies the `command` string to the clipboard.
   * Updates the `copied` state for visual feedback.
   */
  const handleCopy = async () => {
    // Check for Clipboard API availability
    if (!navigator.clipboard) {
      console.error('Clipboard API not available. Copying failed.');
      return;
    }
    try {
      // Attempt to copy the command string
      await navigator.clipboard.writeText(command);
      // Set copied state to true (shows checkmark)
      setCopied(true);
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Log error if copying fails
      console.error('Failed to copy command: ', err);
    }
  };

  // --- Component Return JSX ---
  return (
    // Use MUI Box with the defined terminal styles
    <Box sx={terminalStyle}>
       {/* Copy Button positioned absolutely in the top right */}
       <Tooltip title={copied ? 'Command Copied!' : 'Copy command'} placement="top">
        <IconButton
          onClick={handleCopy} // Attach the handler
          size="small"
          // Position and style the button (grey icon color for better contrast on dark background)
          sx={{ position: 'absolute', top: 8, right: 8, color: '#bdbdbd' }} // Slightly lighter grey
          aria-label="copy command" // Accessibility label
        >
          {/* Show Check icon if copied, otherwise show Copy icon */}
          {copied ? <CheckIcon fontSize="small" color="success" /> : <ContentCopyIcon fontSize="small" />}
        </IconButton>
      </Tooltip>

      {/* Display the command prompt line */}
      {/* Use Typography with component="div" to avoid default paragraph margins */}
      <Typography component="div" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        {/* The '$' prompt symbol */}
        <Box component="span" sx={promptStyle}>$</Box>
        {/* The command text itself (styled white for contrast) */}
        <Box component="span" sx={{ color: '#ffffff' }}>{command}</Box>
      </Typography>

      {/* Display the output lines */}
      {/* Map over the output array and render each line as a Typography component */}
      {output.map((line, index) => (
        <Typography component="div" key={index}>
          {line}
        </Typography>
      ))}
    </Box>
  );
};

// Export the component for use in TutorialContainer
export default SimulatedTerminal;
