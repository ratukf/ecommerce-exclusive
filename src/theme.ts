import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#ffffff', 
            contrastText: '#363738',
        },
        secondary: {
            main: '#DB4444',
            light: '#FEFAF1',
            dark: '#F5F5F5',
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
        text: {
            primary: '#fafafa',
            secondary: '#7D8184',
        },
        grey: {
            900: '#0A0A23', // Title-Active
            800: '#3F3D56', // Body
            700: '#5C5A75', // Label
            600: '#8E8CA7', // Placeholder
            400: '#C7C5DB', // Line
            200: '#E5E4F2', // Input Background
            100: '#F5F4FA', // Background
            50: '#FBFAFF',  // Off-white
        }
    },
    typography: {
        h1: {
            fontFamily: 'Inter, sans-serif',
            fontSize: '3rem',
            fontWeight: 700,
        },
        h2: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '2.25rem',
            fontWeight: 700,
        },
        h3: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '16px',
            fontWeight: 500,
        },
        body1: {
            fontWeight: 400,
            fontSize: '1rem',
        },
        body2: {
            fontWeight: 400,
            fontSize: '0.875rem',
        },
        subtitle1: {
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '36px',
            color: '#000'
        },
        subtitle2: {
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            color: '#DB4444',
    }
    },
    components: {
        MuiButton: {
            defaultProps: {
                className: 'main-button',
                style: {
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '16px',
                    textAlign: 'center',
                    color: '#fafafa',
                    textTransform: 'none'
                }
            },
            styleOverrides: {
                contained: {
                    padding: '16px 48px',
                    borderRadius: '4px',
                    fontWeight: 400,
                    backgroundColor: '#DB4444',
                    textTransform: 'none'
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                }
            }
        }
    }
})

export default theme;