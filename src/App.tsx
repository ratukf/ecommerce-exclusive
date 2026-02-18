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
import { Dashboard } from './pages/Dashboard';
import { ProductDetail } from './pages/ProductDetail';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { LogIn } from './pages/LogIn';
import { SignUp } from './pages/SignUp';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { AccountPage } from './pages/AccountPage';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { ProductsPage } from './pages/ProductsPage';

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
              <Route path='/' element={<Dashboard />} />
              <Route path='/products' element={<ProductsPage />} />
              <Route path='/product/:id' element={<ProductDetail />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<LogIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
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
