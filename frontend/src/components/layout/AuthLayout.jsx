import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { Restaurant, Coffee, Star } from '@mui/icons-material';

const AuthLayout = () => {
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.dir() === 'rtl';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1b3e 40%, #1a0a2e 100%)',
      }}
    >
      {/* Animated floating orbs */}
      <Box sx={{
        position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0,
        '& .orb': {
          position: 'absolute',
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.15,
          animation: 'float 8s ease-in-out infinite',
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-30px) scale(1.1)' },
        },
        '@keyframes floatReverse': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(30px) scale(0.9)' },
        },
        '@keyframes pulse': {
          '0%, 100%': { opacity: 0.1 },
          '50%': { opacity: 0.25 },
        },
      }}>
        <Box className="orb" sx={{ width: 500, height: 500, background: '#114188', top: '-20%', left: '-10%', animationDuration: '10s' }} />
        <Box className="orb" sx={{ width: 400, height: 400, background: '#e3a575', bottom: '-15%', right: '-10%', animationDuration: '12s', animationName: 'floatReverse' }} />
        <Box className="orb" sx={{ width: 300, height: 300, background: '#7c3aed', top: '40%', left: '50%', animationDuration: '8s' }} />
        <Box className="orb" sx={{ width: 200, height: 200, background: '#0891b2', top: '10%', right: '20%', animationDuration: '14s', animationName: 'floatReverse' }} />
      </Box>

      {/* Grid pattern overlay */}
      <Box sx={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }} />

      {/* Left Panel - Branding (only on large screens) */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '45%',
          position: 'relative',
          zIndex: 1,
          p: 6,
          gap: 4,
        }}
      >
        {/* Logo */}
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 100,
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #e3a575 0%, #c98b57 100%)',
            boxShadow: '0 20px 60px rgba(227, 165, 117, 0.4)',
            mb: 3,
            transform: 'rotate(-5deg)',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'rotate(0deg) scale(1.05)' },
          }}>
            <Coffee sx={{ fontSize: 50, color: '#fff' }} />
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Tajawal", sans-serif',
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '-1px',
              lineHeight: 1.1,
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            {t('appName')}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.6)',
              fontFamily: '"Tajawal", sans-serif',
              fontWeight: 400,
              mt: 1,
            }}
          >
            {isRTL ? 'نظام إدارة متكامل للمطاعم والكافيهات' : 'Complete Restaurant & Café Management'}
          </Typography>
        </Box>

        {/* Feature Cards */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 380 }}>
          {[
            { icon: '🧾', title: isRTL ? 'نقاط البيع' : 'Point of Sale', desc: isRTL ? 'إدارة الطلبات بسرعة وكفاءة' : 'Fast & efficient order management' },
            { icon: '📊', title: isRTL ? 'التقارير والتحليلات' : 'Reports & Analytics', desc: isRTL ? 'رؤى مفصلة عن أداء عملك' : 'Detailed business performance insights' },
            { icon: '🛒', title: isRTL ? 'الطلبات الأونلاين' : 'Online Orders', desc: isRTL ? 'استقبل الطلبات عبر الإنترنت' : 'Receive orders online easily' },
          ].map((feature, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255,255,255,0.1)',
                  transform: 'translateX(8px)',
                  borderColor: '#e3a575',
                },
              }}
            >
              <Box sx={{ fontSize: 32, minWidth: 48, textAlign: 'center' }}>{feature.icon}</Box>
              <Box>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontFamily: '"Tajawal", sans-serif', fontSize: '0.95rem' }}>
                  {feature.title}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontFamily: '"Tajawal", sans-serif' }}>
                  {feature.desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Stars */}
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} sx={{ color: '#e3a575', fontSize: 20 }} />
          ))}
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', ml: 1, fontSize: '0.85rem', fontFamily: '"Tajawal", sans-serif' }}>
            {isRTL ? 'موثوق به من أكثر من 500 مطعم' : 'Trusted by 500+ restaurants'}
          </Typography>
        </Box>
      </Box>

      {/* Right Panel - Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          p: { xs: 2, sm: 4 },
        }}
      >
        {/* Mobile logo */}
        <Box sx={{ display: { xs: 'flex', lg: 'none' }, alignItems: 'center', gap: 2, mb: 4 }}>
          <Box sx={{
            width: 50, height: 50, borderRadius: '14px',
            background: 'linear-gradient(135deg, #e3a575 0%, #c98b57 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(227, 165, 117, 0.4)',
          }}>
            <Coffee sx={{ color: '#fff', fontSize: 28 }} />
          </Box>
          <Typography sx={{
            fontFamily: '"Tajawal", sans-serif',
            fontWeight: 800, fontSize: '1.5rem', color: '#fff',
          }}>
            {t('appName')}
          </Typography>
        </Box>

        {/* Form Card */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '460px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '28px',
            p: { xs: 3, sm: 5 },
            boxShadow: '0 32px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0, left: '20%', right: '20%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #e3a575, transparent)',
              borderRadius: '100%',
            },
          }}
        >
          <Outlet />
        </Box>

        {/* Footer */}
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.3)',
            mt: 4,
            fontSize: '0.8rem',
            fontFamily: '"Tajawal", sans-serif',
          }}
        >
          {t('appName')} © {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthLayout;
