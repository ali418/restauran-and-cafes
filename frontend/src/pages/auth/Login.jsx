import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { saveAuthData } from '../../services/authService';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Chip,
  Stack,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Login as LoginIcon,
  FlashOn,
} from '@mui/icons-material';

// Redux actions
import { login } from '../../redux/slices/authSlice';
import apiService from '../../api/apiService';

const Login = () => {
  const { t, i18n } = useTranslation('auth');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isRTL = i18n.language && i18n.language.startsWith('ar');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Update document title based on current language
  useEffect(() => {
    document.title = t('cafesundus.login', { ns: 'cafesundus' });
  }, [i18n.language, t]);

  useEffect(() => {
    const params = new URLSearchParams(location.search || '');
    const u = params.get('u') || params.get('username');
    const p = params.get('p') || params.get('password');
    if (!u && !p) return;
    setFormData((prev) => ({
      ...prev,
      username: typeof u === 'string' ? u : prev.username,
      password: typeof p === 'string' ? p : prev.password,
    }));
  }, [location.search]);

  const demoAccounts = [
    { username: 'admin', password: 'admin123', label: isRTL ? 'مدير' : 'Admin', color: '#e3a575' },
    { username: 'team', password: 'admin', label: isRTL ? 'فريق' : 'Team', color: '#114188' },
  ];

  const fillDemo = (username, password) => {
    setFormData((prev) => ({ ...prev, username, password }));
    setError('');
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rememberMe' ? checked : value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { token, refreshToken, user } = await apiService.login(
        formData.username,
        formData.password
      );
      saveAuthData(token, refreshToken, user, formData.rememberMe);
      dispatch(login(user));
      if (user && user.role === 'cashier') {
        navigate('/pos');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || t('invalidCredentials'));
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '14px',
      background: 'rgba(255,255,255,0.07)',
      color: '#fff',
      transition: 'all 0.3s ease',
      '& fieldset': {
        borderColor: 'rgba(255,255,255,0.15)',
        transition: 'border-color 0.3s ease',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(227, 165, 117, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#e3a575',
        borderWidth: 2,
      },
      '&.Mui-focused': {
        background: 'rgba(255,255,255,0.1)',
        boxShadow: '0 0 0 4px rgba(227, 165, 117, 0.1)',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255,255,255,0.5)',
      fontFamily: '"Tajawal", sans-serif',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#e3a575',
    },
    '& .MuiInputBase-input': {
      color: '#fff',
      fontFamily: '"Tajawal", sans-serif',
    },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
      color: 'rgba(255,255,255,0.4)',
    },
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 64,
          height: 64,
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #e3a575 0%, #c98b57 100%)',
          boxShadow: '0 12px 40px rgba(227, 165, 117, 0.4)',
          mb: 2,
          animation: 'pulse 3s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { boxShadow: '0 12px 40px rgba(227, 165, 117, 0.4)' },
            '50%': { boxShadow: '0 12px 60px rgba(227, 165, 117, 0.7)' },
          },
        }}>
          <LoginIcon sx={{ fontSize: 32, color: '#fff' }} />
        </Box>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontFamily: '"Tajawal", sans-serif',
            fontWeight: 800,
            color: '#fff',
            mb: 0.5,
          }}
        >
          {isRTL ? 'مرحباً بعودتك!' : 'Welcome back!'}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontFamily: '"Tajawal", sans-serif', fontSize: '0.9rem' }}>
          {isRTL ? 'سجل الدخول لإدارة نظامك' : 'Sign in to manage your system'}
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            borderRadius: '12px',
            background: 'rgba(211, 47, 47, 0.15)',
            border: '1px solid rgba(211, 47, 47, 0.3)',
            color: '#ff8a80',
            '& .MuiAlert-icon': { color: '#ff8a80' },
            fontFamily: '"Tajawal", sans-serif',
          }}
        >
          {error}
        </Alert>
      )}

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label={t('username')}
          name="username"
          autoComplete="username"
          autoFocus
          value={formData.username}
          onChange={handleChange}
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
          sx={inputStyles}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label={t('password')}
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#e3a575' } }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={inputStyles}
        />

        {/* Remember Me & Forgot Password */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={loading}
                size="small"
                sx={{
                  color: 'rgba(255,255,255,0.3)',
                  '&.Mui-checked': { color: '#e3a575' },
                }}
              />
            }
            label={
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontFamily: '"Tajawal", sans-serif' }}>
                {t('rememberMe')}
              </Typography>
            }
          />
          <Link
            component={RouterLink}
            to="/forgot-password"
            sx={{
              color: '#e3a575',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontFamily: '"Tajawal", sans-serif',
              fontWeight: 600,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {t('forgotYourPassword')}
          </Link>
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            py: 1.6,
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #e3a575 0%, #c98b57 100%)',
            color: '#fff',
            fontWeight: 800,
            fontSize: '1.05rem',
            fontFamily: '"Tajawal", sans-serif',
            letterSpacing: '0.5px',
            boxShadow: '0 8px 32px rgba(227, 165, 117, 0.4)',
            border: 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #f0b890 0%, #d4975e 100%)',
              boxShadow: '0 12px 40px rgba(227, 165, 117, 0.6)',
              transform: 'translateY(-2px)',
            },
            '&:active': { transform: 'translateY(0)' },
            '&.Mui-disabled': {
              background: 'rgba(227, 165, 117, 0.3)',
              color: 'rgba(255,255,255,0.5)',
            },
          }}
          disabled={loading}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} sx={{ color: 'rgba(255,255,255,0.8)' }} />
              <span>{isRTL ? 'جاري تسجيل الدخول...' : 'Signing in...'}</span>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LoginIcon fontSize="small" />
              <span>{t('signIn')}</span>
            </Box>
          )}
        </Button>

        {/* Demo Accounts Section */}
        <Box
          sx={{
            mt: 1,
            p: 2.5,
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(227,165,117,0.5), transparent)',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <FlashOn sx={{ color: '#e3a575', fontSize: 18 }} />
            <Typography sx={{
              color: 'rgba(255,255,255,0.8)',
              fontFamily: '"Tajawal", sans-serif',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}>
              {isRTL ? 'بيانات ديمو (اضغط للتعبئة التلقائية)' : 'Demo accounts (click to auto-fill)'}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {demoAccounts.map((acc) => (
              <Chip
                key={acc.username}
                onClick={() => fillDemo(acc.username, acc.password)}
                clickable
                icon={<Person sx={{ fontSize: '16px !important', color: '#fff !important' }} />}
                label={
                  <span style={{ fontFamily: '"Tajawal", sans-serif', fontSize: '0.8rem' }}>
                    {acc.label}: <strong>{acc.username}</strong>
                  </span>
                }
                sx={{
                  background: `${acc.color}22`,
                  border: `1px solid ${acc.color}44`,
                  color: '#fff',
                  fontWeight: 600,
                  py: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: `${acc.color}44`,
                    borderColor: acc.color,
                    transform: 'scale(1.05)',
                    boxShadow: `0 4px 16px ${acc.color}44`,
                  },
                  '& .MuiChip-icon': { color: `${acc.color} !important` },
                }}
              />
            ))}
          </Stack>
          <Typography sx={{
            color: 'rgba(255,255,255,0.3)',
            fontFamily: '"Tajawal", sans-serif',
            fontSize: '0.75rem',
            mt: 1,
          }}>
            {isRTL
              ? '🔑 admin: كلمة المرور admin123 | team: كلمة المرور admin'
              : '🔑 admin: password admin123 | team: password admin'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
