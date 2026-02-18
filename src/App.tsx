import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import ScrollToTop from './shared/utils/scrollToTop';
import theme from './theme';
import './App.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/300.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/400.css';
import { useAuthListener } from './store/authListener';
import { Box } from '@mui/material';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { AccountPage } from './pages/AccountPage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { DashboardPage } from './pages/DashboardPage';
import { LogInPage } from './pages/LogInPage';
import { SignUpPage } from './pages/SignUpPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CartPage } from './pages/CartPage';

function AuthListenerWrapper() {
  useAuthListener();
  return null;
}

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <AuthListenerWrapper />
          <ScrollToTop />
          <Header />
          <Box className='main-content' sx={{ textAlign: 'center' }}>
            <Routes>
              <Route path='/' element={<DashboardPage />} />
              <Route path='/products' element={<ProductsPage />} />
              <Route path='/product/:id' element={<ProductDetailPage />} />
              <Route path='/contact' element={<ContactPage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/login' element={<LogInPage />} />
              <Route path='/signup' element={<SignUpPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/checkout' element={<CheckoutPage />} />
            </Routes>
            <ProtectedRoute>
              <Routes>
                <Route path='/account/*' element={<AccountPage />} />
              </Routes>
            </ProtectedRoute>
          </Box>
          <Footer />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
