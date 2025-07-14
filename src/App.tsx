import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
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
import { Box } from '@mui/material';
import { Header } from './components/Header';
import { Footer } from './components/Footer';


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <Box className="main-content" sx={{ textAlign: 'center' }}>
          Container goes here
        </Box>
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default App
