import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Container, Paper, Typography, Grid, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectStoreSettings } from '../../redux/slices/settingsSlice';

const AuthLayout = () => {
  const { t, i18n } = useTranslation('common');
  const storeSettings = useSelector(selectStoreSettings);
  const theme = useTheme();
  const isRTL = i18n.dir() === 'rtl';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)',
          zIndex: 0,
        },
      }}
    >
      {/* Content Wrapper */}
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* Header - Brand Name */}
        <Box
          sx={{
            p: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography 
            variant="h3" 
            component="div"
            sx={{
              fontFamily: '"Tajawal", sans-serif',
              fontWeight: 'bold',
              color: '#e3a575',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              letterSpacing: '1px',
            }}
          >
            {storeSettings?.name || 'Restaurant & Cafés Management'}
          </Typography>
        </Box>

        {/* Main content */}
        <Container component="main" maxWidth="sm" sx={{ mb: 4, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Paper
            elevation={24}
            sx={{
              p: { xs: 3, md: 5 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderTop: '4px solid #e3a575',
              width: '100%',
              maxWidth: '450px',
            }}
          >
            <Outlet />
          </Paper>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            {(storeSettings?.name || 'Restaurant & Cafés Management')} © {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
