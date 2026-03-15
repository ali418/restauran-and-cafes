import React, { useState } from 'react';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { saveAuthData } from '../../services/authService';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
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
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useEffect } from 'react';

// Redux actions
import { login } from '../../redux/slices/authSlice';
import apiService from '../../api/apiService';

const Login = () => {
  const { t, i18n } = useTranslation('auth');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
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

  const demoUsername = 'admin';
  const demoPassword = 'admin123';

  const fillDemo = () => {
    setFormData((prev) => ({
      ...prev,
      username: demoUsername,
      password: demoPassword,
    }));
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
      // Real API login
      const { token, refreshToken, user } = await apiService.login(
        formData.username,
        formData.password
      );

      // Persist auth data
      saveAuthData(token, refreshToken, user, formData.rememberMe);

      // Update Redux store
      dispatch(login(user));

      // Navigate to dashboard or POS for cashier
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
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: '#d4af37', width: 56, height: 56 }}>
        <LockOutlinedIcon sx={{ fontSize: 30, color: '#000' }} />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ fontFamily: '"Tajawal", sans-serif', fontWeight: 'bold', mb: 3 }}>
        {t('login')}
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
          {error}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
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
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#d4af37',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#d4af37',
            },
          }}
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
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#d4af37',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#d4af37',
            },
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={loading}
              sx={{
                color: '#d4af37',
                '&.Mui-checked': {
                  color: '#d4af37',
                },
              }}
            />
          }
          label={t('rememberMe')}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            bgcolor: '#d4af37',
            color: '#000',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            py: 1.2,
            '&:hover': {
              bgcolor: '#b89628',
            },
            fontFamily: '"Tajawal", sans-serif',
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : t('signIn')}
        </Button>

        <Box sx={{ mt: 1.5, mb: 0.5 }}>
          <Typography sx={{ fontWeight: 800, color: '#000' }}>
            {i18n.language && i18n.language.startsWith('ar') ? 'بيانات تجربة (اضغط للتعبئة):' : 'Demo credentials (click to fill):'}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 1 }}>
            <Chip
              onClick={fillDemo}
              clickable
              label={(i18n.language && i18n.language.startsWith('ar') ? 'اسم المستخدم: ' : 'Username: ') + demoUsername}
              sx={{ bgcolor: '#111', color: '#fff', fontWeight: 900 }}
            />
            <Chip
              onClick={fillDemo}
              clickable
              label={(i18n.language && i18n.language.startsWith('ar') ? 'كلمة المرور: ' : 'Password: ') + demoPassword}
              sx={{ bgcolor: '#111', color: '#fff', fontWeight: 900 }}
            />
          </Stack>
        </Box>
        <Grid container>
          <Grid item xs>
            <Link 
              component={RouterLink} 
              to="/forgot-password" 
              variant="body2"
              sx={{ color: '#d4af37', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              {t('forgotYourPassword')}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
