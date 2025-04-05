import React from 'react';
// Import Material UI components for layout and text display
import { Box, Typography } from '@mui/material';

// --- Styling ---
// Styles for the container displaying the file structure
const fileStructureStyle = {
  backgroundColor: '#f9f9f9', // Very light grey background for slight contrast
  border: '1px solid #eee',   // Subtle border
  borderRadius: '4px',        // Slightly rounded corners
  padding: '16px',            // Internal spacing
  overflowX: 'auto',          // Add horizontal scrollbar if structure is wide
  fontFamily: 'monospace',    // Monospace font is crucial for alignment
  fontSize: '0.9rem',         // Slightly smaller font size
  whiteSpace: 'pre',          // IMPORTANT: Preserves whitespace, indentation, and line breaks from the input string
  marginTop: '16px',          // Margin above the block
  marginBottom: '16px',       // Margin below the block
  lineHeight: '1.4',          // Adjust line spacing for readability
};

// --- FileStructure Component ---
// Displays a textual representation of a file/directory structure.
// Props:
// - structure: An array of strings, where each string represents one line
//              of the file structure diagram (including indentation).
const FileStructure = ({ structure }) => {
  // Join the array of strings into a single multi-line string,
  // using newline characters (\n) to separate the lines.
  const structureString = structure.join('\n');

  // --- Component Return JSX ---
  return (
    // Use MUI Box component with the defined styles
    <Box sx={fileStructureStyle}>
      {/*
        Use MUI Typography, but render it as a `<code>` HTML element
        for semantic correctness when displaying code or code-like structures.
        The `whiteSpace: 'pre'` style on the parent Box ensures the formatting
        of the structureString (including line breaks and spaces) is preserved.
      */}
      <Typography component="code">
        {/* Render the multi-line string representing the file structure */}
        {structureString}
      </Typography>
    </Box>
  );
};

// Export the component for use in TutorialContainer
export default FileStructure;
