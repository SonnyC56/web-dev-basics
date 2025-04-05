import React, { useState } from 'react';
// Import Material UI components needed for styling and icons
import { Box, Tooltip, IconButton } from '@mui/material'; // Removed unused Button import
// Import specific icons used for the copy button
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // Copy icon
import CheckIcon from '@mui/icons-material/Check'; // Checkmark icon (shown after copy)

// --- Styling ---
// Define styles for the code block container using a JavaScript object.
// This uses MUI's sx prop system for inline styling.
const codeBlockStyle = {
  backgroundColor: '#f5f5f5', // Light grey background for contrast
  border: '1px solid #ddd',   // Subtle border
  borderRadius: '4px',        // Slightly rounded corners
  padding: '16px',            // Internal spacing
  paddingTop: '40px',         // Add extra top padding to avoid overlap with copy button
  overflowX: 'auto',          // Add horizontal scrollbar if code is too wide
  position: 'relative',       // Set position context for the absolute positioned copy button
  fontFamily: 'monospace',    // Use a monospace font for code
  fontSize: '0.9rem',         // Slightly smaller font size
  whiteSpace: 'pre',          // Preserve whitespace and line breaks from the code string
  marginTop: '16px',          // Add margin above the block
  marginBottom: '16px',       // Add margin below the block
};

// --- CodeBlock Component ---
// Displays a block of code with a copy-to-clipboard button.
// Props:
// - language: (Optional) String indicating the code language (e.g., 'javascript', 'html'). Not used currently but useful for syntax highlighting later.
// - code: String containing the code to display.
const CodeBlock = ({ language, code }) => {
  // State to track whether the code has just been copied (for showing feedback)
  const [copied, setCopied] = useState(false);

  // --- Event Handler ---
  /**
   * Handles the click event for the copy button.
   * Uses the browser's Clipboard API to copy the code text.
   * Updates the `copied` state to provide visual feedback.
   */
  const handleCopy = async () => {
    // Check if Clipboard API is available (it requires a secure context - HTTPS or localhost)
    if (!navigator.clipboard) {
      console.error('Clipboard API not available. Copying failed.');
      // Optionally show a message to the user that copy failed
      return;
    }
    try {
      // Attempt to write the code string to the clipboard
      await navigator.clipboard.writeText(code);
      // If successful, set copied state to true (shows checkmark icon)
      setCopied(true);
      // Reset the copied state (back to copy icon) after 2 seconds (2000 milliseconds)
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Log error if copying fails
      console.error('Failed to copy code: ', err);
      // Optionally show an error message to the user
    }
  };

  // --- Component Return JSX ---
  return (
    // Use MUI Box component with the defined styles
    <Box sx={codeBlockStyle}>
      {/* Copy Button positioned absolutely in the top right corner */}
      {/* Tooltip provides text label on hover */}
      <Tooltip title={copied ? 'Copied!' : 'Copy code'} placement="top">
        {/* IconButton provides accessible button behavior for the icon */}
        <IconButton
          onClick={handleCopy} // Call handleCopy when clicked
          size="small" // Use smaller button size
          // Apply absolute positioning styles via sx prop
          sx={{ position: 'absolute', top: 8, right: 8 }}
          aria-label="copy code" // Accessibility label
        >
          {/* Conditionally render the icon: Checkmark if copied, Copy icon otherwise */}
          {copied ? <CheckIcon fontSize="small" color="success" /> : <ContentCopyIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
      {/* The `code` tag is semantically correct for displaying code */}
      <code>
        {/*
          Placeholder comment: Syntax highlighting could be added here.
          Libraries like 'react-syntax-highlighter' can be used to parse the `code` string
          and apply styles based on the `language` prop.
          Example: <SyntaxHighlighter language={language} style={docco}>{code}</SyntaxHighlighter>
        */}
        {/* Render the raw code string */}
        {code}
      </code>
    </Box>
  );
};

// Export the component for use in TutorialContainer
export default CodeBlock;
