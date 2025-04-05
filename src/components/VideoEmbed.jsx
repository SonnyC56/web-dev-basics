import React from 'react';
// Import Material UI components for layout and text
import { Box, Typography } from '@mui/material';

// --- Styling ---

// Styles for the outer container Box of the video embed.
// This uses the "padding-bottom" trick to maintain a 16:9 aspect ratio.
const videoContainerStyle = {
  position: 'relative',     // Establishes positioning context for the absolute iframe
  paddingBottom: '56.25%',  // Percentage of width for 16:9 aspect ratio (9 / 16 * 100)
  height: 0,                // Height is controlled by padding-bottom
  overflow: 'hidden',       // Hide anything that might spill out
  maxWidth: '100%',         // Ensure it doesn't exceed the width of its parent
  background: '#000',       // Black background while video loads or if there's an error
  margin: '16px 0',         // Add vertical margin for spacing
  borderRadius: '4px',      // Optional: slightly rounded corners
};

// Styles applied directly to the iframe element itself.
const iframeStyle = {
  position: 'absolute',     // Position absolutely within the relative container
  top: 0,                   // Align to top
  left: 0,                  // Align to left
  width: '100%',            // Take full width of the container
  height: '100%',           // Take full height of the container
  border: '0',              // Remove default iframe border
};

// --- Helper Function ---

/**
 * Extracts the YouTube video ID from various valid YouTube URL formats.
 * @param {string} url - The YouTube URL (e.g., watch, embed, youtu.be).
 * @returns {string|null} The 11-character YouTube video ID, or null if extraction fails.
 */
const getYouTubeId = (url) => {
  if (!url) return null; // Handle null or undefined input
  // Regular expression to capture the video ID from different URL patterns
  // Covers formats like:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  // - https://www.youtube.com/v/VIDEO_ID
  // - https://www.youtube.com/user/someuser#p/u/1/VIDEO_ID
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  // Check if a match was found and if the captured group (the ID) is 11 characters long
  if (match && match[2].length === 11) {
    return match[2]; // Return the extracted ID
  } else {
    // Log an error if the URL format is unrecognized or ID extraction fails
    console.error("Could not extract YouTube ID from URL:", url);
    return null;
  }
};

// --- VideoEmbed Component ---
// Renders an embedded YouTube video player within a responsive container.
// Props:
// - url: The URL of the YouTube video.
// - title: (Optional) A title for the iframe (good for accessibility). Defaults to "Embedded Video".
const VideoEmbed = ({ url, title = "Embedded Video" }) => {
  // Extract the video ID from the provided URL using the helper function
  const videoId = getYouTubeId(url);

  // --- Error Handling ---
  // If no valid video ID could be extracted, render an error message instead of the iframe.
  if (!videoId) {
    return (
      // Use a Box with modified styles to display the error message clearly
      <Box sx={{
        ...videoContainerStyle, // Base styles for consistency
        paddingBottom: 'auto', // Override paddingBottom as height is fixed
        height: '100px',       // Fixed height for the error box
        display: 'flex',       // Use flexbox for centering
        alignItems: 'center',  // Center vertically
        justifyContent: 'center', // Center horizontally
        background: '#ffebee', // Light red background for error indication
        border: '1px solid #e57373', // Red border
      }}>
        <Typography color="error" sx={{ color: '#c62828', textAlign: 'center', p: 1 }}> {/* Darker red text */}
          Error: Invalid YouTube URL provided. Cannot embed video. <br /> URL: {url || 'Not provided'}
        </Typography>
      </Box>
    );
  }

  // Construct the standard YouTube embed URL using the extracted video ID
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  // --- Component Return JSX ---
  return (
    // Render the responsive container Box using the defined styles
    <Box sx={videoContainerStyle}>
      {/* Render the iframe element */}
      <iframe
        style={iframeStyle} // Apply iframe-specific styles
        src={embedUrl}      // Set the source URL for the video player
        title={title}       // Set the iframe title (important for accessibility)
        // Standard 'allow' attributes for YouTube embeds, enabling necessary features
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen     // Allow the user to make the video fullscreen
      ></iframe>
    </Box>
  );
};

// Export the component for use in TutorialContainer
export default VideoEmbed;
