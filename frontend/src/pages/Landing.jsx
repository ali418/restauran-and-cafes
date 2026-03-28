import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import {
  BarChart,
  Category,
  Inventory2,
  People,
  PointOfSale,
  QrCode2,
  Settings as SettingsIcon,
  ShoppingCartCheckout,
  Storefront,
  VerifiedUser,
} from '@mui/icons-material';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Landing = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  React.useEffect(() => {
    if (!isAuthenticated) return;
    if (user?.role?.toLowerCase() === 'cashier') {
      navigate('/pos', { replace: true });
      return;
    }
    navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate, user?.role]);

  const isArabic = Boolean(i18n.language && i18n.language.startsWith('ar'));

  const demoAccounts = [
    { username: 'team', password: 'admin' },
    { username: 'admin', password: 'admin123' },
  ];

  const goToLoginWithDemo = (username, password) => {
    const u = encodeURIComponent(username);
    const p = encodeURIComponent(password);
    navigate(`/auth/login?u=${u}&p=${p}`);
  };

  const features = [
    {
      title: isArabic ? 'نقطة بيع (POS)' : 'Point of Sale (POS)',
      desc: isArabic ? 'بيع سريع، خصومات، ضريبة، وطباعة إيصالات.' : 'Fast sales, discounts, tax, and receipt printing.',
      icon: <PointOfSale sx={{ fontSize: 28 }} />,
    },
    {
      title: isArabic ? 'إدارة المنتجات' : 'Products',
      desc: isArabic ? 'إضافة/تعديل، باركود، صور، وتصنيفات.' : 'Create/edit, barcode, images, and categories.',
      icon: <Storefront sx={{ fontSize: 28 }} />,
    },
    {
      title: isArabic ? 'المخزون والتنبيهات' : 'Inventory & Alerts',
      desc: isArabic ? 'متابعة الكميات والتنبيه عند انخفاض المخزون.' : 'Track quantities and low-stock alerts.',
      icon: <Inventory2 sx={{ fontSize: 28 }} />,
    },
    {
      title: isArabic ? 'العملاء' : 'Customers',
      desc: isArabic ? 'ملفات العملاء وإدارة بيانات التواصل.' : 'Customer profiles and contact management.',
      icon: <People sx={{ fontSize: 28 }} />,
    },
    {
      title: isArabic ? 'التقارير' : 'Reports',
      desc: isArabic ? 'تقارير مبيعات وربحية ومؤشرات أداء.' : 'Sales, revenue, and KPI reporting.',
      icon: <BarChart sx={{ fontSize: 28 }} />,
    },
    {
      title: isArabic ? 'إدارة الصلاحيات' : 'Roles & Permissions',
      desc: isArabic ? 'أدوار متعددة وتحكم بالصلاحيات.' : 'Multiple roles and access control.',
      icon: <VerifiedUser sx={{ fontSize: 28 }} />,
    },
    {
      title: isArabic ? 'الطلبات أونلاين' : 'Online Orders',
      desc: isArabic ? 'استقبال الطلبات والإشعارات وإدارة الحالة.' : 'Receive orders, notifications, and status control.',
      icon: <ShoppingCartCheckout sx={{ fontSize: 28 }} />,
    },
    {
      title: isArabic ? 'QR للطلبات' : 'QR Orders',
      desc: isArabic ? 'روابط وQR لطلب أونلاين بسهولة.' : 'Share links and QR for easy online ordering.',
      icon: <QrCode2 sx={{ fontSize: 28 }} />,
    },
    {
      title: isArabic ? 'إعدادات المتجر' : 'Store Settings',
      desc: isArabic ? 'تخصيص البيانات العامة وإعدادات النظام.' : 'Customize store info and system configuration.',
      icon: <SettingsIcon sx={{ fontSize: 28 }} />,
    },
    {
      title: isArabic ? 'الفئات' : 'Categories',
      desc: isArabic ? 'تنظيم المنتجات ضمن فئات واضحة.' : 'Organize products into clear categories.',
      icon: <Category sx={{ fontSize: 28 }} />,
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0d2f62 0%, #114188 45%, #ffffff 45%)' }}>
      <Box sx={{ pt: { xs: 8, md: 10 }, pb: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 1 }}>
            <Button
              component="a"
              href="https://www.key4infotech.com/frontend/index.php"
              target="_blank"
              rel="noreferrer"
              sx={{
                color: '#fff',
                textTransform: 'none',
                fontWeight: 800,
                gap: 1,
                px: 1.5,
                py: 0.8,
                borderRadius: 999,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.12)' },
              }}
            >
              <Box
                component="img"
                alt="Key For Information Technology"
                src="https://www.key4infotech.com/frontend/images/logo/logo%20keytt.png"
                sx={{ height: 28, width: 'auto', display: 'block', filter: 'brightness(0) invert(1)' }}
              />
              {isArabic ? 'موقع الشركة' : 'Company Website'}
            </Button>
            <LanguageSwitcher />
          </Box>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Stack spacing={2}>
                <Chip
                  label={isArabic ? 'حل متكامل لإدارة المطاعم والمقاهي' : 'All‑in‑one system for restaurants & cafés'}
                  sx={{
                    alignSelf: 'flex-start',
                    bgcolor: 'rgba(227,165,117,0.22)',
                    color: '#ffffff',
                    border: '1px solid rgba(227,165,117,0.35)',
                    fontWeight: 700,
                  }}
                />
                <Typography
                  variant="h2"
                  sx={{
                    color: '#fff',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    fontSize: { xs: '2.1rem', md: '3.2rem' },
                  }}
                >
                  {isArabic ? 'نظام إدارة المطاعم والمقاهي' : 'Restaurant & Cafés Management'}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.78)', fontSize: { xs: '1rem', md: '1.1rem' } }}>
                  {isArabic
                    ? 'منصة واحدة لإدارة المبيعات، المنتجات، المخزون، العملاء والتقارير — بتصميم مرن يتناغم مع هوية مطعمك أو مقهاك البصرية.'
                    : 'Manage sales, products, inventory, customers, and reports in one place — with a brand‑consistent blue theme.'}
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 1 }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/auth/login')}
                    sx={{
                      bgcolor: '#e3a575',
                      color: '#1b1b1b',
                      fontWeight: 800,
                      py: 1.3,
                      px: 3,
                      '&:hover': { bgcolor: '#c98b57' },
                    }}
                  >
                    {isArabic ? 'تسجيل الدخول' : 'Login'}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/online-order')}
                    sx={{
                      bgcolor: '#ffffff',
                      color: '#114188',
                      fontWeight: 900,
                      py: 1.3,
                      px: 3,
                      '&:hover': { bgcolor: '#f2f5fb' },
                    }}
                  >
                    {isArabic ? 'الطلب أونلاين' : 'Online Order'}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const el = document.getElementById('features');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    sx={{
                      borderColor: 'rgba(227,165,117,0.85)',
                      color: '#ffffff',
                      fontWeight: 700,
                      py: 1.3,
                      px: 3,
                      '&:hover': { borderColor: '#e3a575', bgcolor: 'rgba(227,165,117,0.10)' },
                    }}
                  >
                    {isArabic ? 'عرض الميزات' : 'View Features'}
                  </Button>
                </Stack>
                <Box sx={{ pt: 2 }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700, mb: 1 }}>
                    {isArabic ? 'حساب تجربة (اضغط للتعبئة تلقائياً):' : 'Demo account (click to auto-fill):'}
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    {demoAccounts.map((acc) => (
                      <React.Fragment key={acc.username}>
                        <Chip
                          onClick={() => goToLoginWithDemo(acc.username, acc.password)}
                          clickable
                          label={(isArabic ? 'اسم المستخدم: ' : 'Username: ') + acc.username}
                          sx={{ bgcolor: '#ffffff', color: '#114188', fontWeight: 900 }}
                        />
                        <Chip
                          onClick={() => goToLoginWithDemo(acc.username, acc.password)}
                          clickable
                          label={(isArabic ? 'كلمة المرور: ' : 'Password: ') + acc.password}
                          sx={{ bgcolor: '#ffffff', color: '#114188', fontWeight: 900 }}
                        />
                      </React.Fragment>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card
                elevation={0}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem' }}>
                      {isArabic ? 'لماذا هذا النظام؟' : 'Why this system?'}
                    </Typography>
                    <Stack spacing={1.3}>
                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <Box sx={{ color: '#e3a575' }}><VerifiedUser /></Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                          {isArabic ? 'صلاحيات وأدوار متعددة' : 'Multiple roles & permissions'}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <Box sx={{ color: '#e3a575' }}><PointOfSale /></Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                          {isArabic ? 'POS سريع وعملي' : 'Fast, practical POS'}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <Box sx={{ color: '#e3a575' }}><BarChart /></Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                          {isArabic ? 'تقارير واضحة لاتخاذ القرار' : 'Clear reports for decisions'}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <Box sx={{ color: '#e3a575' }}><QrCode2 /></Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                          {isArabic ? 'طلبات أونلاين عبر QR' : 'Online orders via QR'}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />
                    <Typography sx={{ color: 'rgba(255,255,255,0.65)' }}>
                      {isArabic
                        ? 'ابدأ فورًا وسجّل الدخول، أو استخدم حساب التجربة لعرض النظام.'
                        : 'Start now, login, or use the demo account to explore.'}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box id="features" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#fff' }}>
        <Container maxWidth="lg">
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#111' }}>
              {isArabic ? 'ميزات النظام' : 'System Features'}
            </Typography>
            <Typography sx={{ color: '#555' }}>
              {isArabic
                ? 'كل ما تحتاجه لتشغيل وإدارة مطعمك أو مقهاك بكفاءة.'
                : 'Everything you need to run your restaurant or café efficiently.'}
            </Typography>
          </Stack>

          <Grid container spacing={2.5}>
            {features.map((f) => (
              <Grid item xs={12} sm={6} md={4} key={f.title}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    border: '1px solid #eee',
                    transition: 'transform 150ms ease, box-shadow 150ms ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack spacing={1.2}>
                      <Box
                        sx={{
                          width: 46,
                          height: 46,
                          borderRadius: 2,
                          bgcolor: 'rgba(17,65,136,0.12)',
                          color: '#114188',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {f.icon}
                      </Box>
                      <Typography sx={{ fontWeight: 900, color: '#111' }}>{f.title}</Typography>
                      <Typography sx={{ color: '#555' }}>{f.desc}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: '1px solid #eee',
                background: 'linear-gradient(135deg, rgba(17,65,136,0.06) 0%, rgba(227,165,117,0.10) 100%)',
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Typography sx={{ fontWeight: 900, color: '#111', fontSize: '1.1rem' }}>
                      {isArabic ? 'صفحة الطلب أونلاين' : 'Online Order Page'}
                    </Typography>
                    <Typography sx={{ color: '#555', mt: 0.5 }}>
                      {isArabic
                        ? 'صفحة عامة للطلبات: عرض المنتجات، إدخال بيانات العميل، وتأكيد الطلب.'
                        : 'Public page for ordering: browse products, enter customer details, and confirm the order.'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                    <Button
                      variant="contained"
                      onClick={() => navigate('/online-order')}
                      sx={{
                        bgcolor: '#114188',
                        color: '#fff',
                        fontWeight: 900,
                        px: 3,
                        py: 1.1,
                        borderRadius: 999,
                        '&:hover': { bgcolor: '#0d2f62' },
                      }}
                    >
                      {isArabic ? 'فتح صفحة الطلب' : 'Open Online Order'}
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={() => navigate('/auth/login')}
              sx={{
                bgcolor: '#e3a575',
                color: '#1b1b1b',
                fontWeight: 900,
                px: 4,
                py: 1.4,
                borderRadius: 999,
                '&:hover': { bgcolor: '#c98b57' },
              }}
            >
              {isArabic ? 'اذهب لتسجيل الدخول' : 'Go to Login'}
            </Button>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: 3, bgcolor: '#0d2f62' }}>
        <Container maxWidth="lg">
          <Typography sx={{ color: 'rgba(255,255,255,0.65)', textAlign: 'center' }}>
            {isArabic ? 'نظام إدارة المطاعم والمقاهي' : 'Restaurant & Cafés Management'} © {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
