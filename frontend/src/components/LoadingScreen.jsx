import React from 'react';
import { Box, Typography, CircularProgress, keyframes } from '@mui/material';

// Define keyframes for animations
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const LoadingScreen = () => {
  // Hardcoded colors to ensure it works outside ThemeProvider (e.g. in index.js)
  const colors = {
    accent: '#e3a575',
    brand: '#114188',
    text: '#212529',
    background: '#ffffff',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: colors.background,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: `${pulse} 2s infinite ease-in-out`,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: colors.brand,
            fontWeight: 'bold',
            fontFamily: '"Tajawal", "Roboto", "Helvetica", "Arial", sans-serif',
            marginBottom: 2,
            letterSpacing: '1px',
            textShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Restaurant & Cafés Management
        </Typography>
        
        <CircularProgress 
          size={50}
          thickness={4}
          sx={{
            color: colors.accent,
            marginBottom: 2,
          }}
        />
        
        <Typography
          variant="body1"
          sx={{
            color: colors.text,
            fontFamily: '"Tajawal", "Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 500,
            opacity: 0.7,
          }}
        >
          جاري التحميل...
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingScreen;
