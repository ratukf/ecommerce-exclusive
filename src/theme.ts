import { createTheme } from "@mui/material";

export const FW = {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
}

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
        // Our story section
        h2: {
            fontFamily: 'Inter, sans-serif',
            fontWeight: FW.semiBold,
            textAlign: 'left',
        },
        // Banner & image slider
        h3: {
            fontFamily: 'Inter, sans-serif',
            fontWeight: FW.bold,
            color: '#fff',
            mb: 2,
            wordBreak: 'break-word',
            maxWidth: '40%',
            textAlign: 'left',
        },
        // Flash sale timer, about us, products header, ecommerce name
        h4: {
            fontFamily: 'Inter, sans-serif',
            fontWeight: FW.semiBold,
        },
        // New arrival header
        h5: {
            fontFamily: 'Inter, sans-serif',
            fontWeight: FW.semiBold,
        },
        // Footer header, benefits header, whishlist header, cart total, card header
        h6: {
            fontFamily: 'Poppins, sans-serif',
        },
        // Products detail, categories header, banner header, imager slider header, navbar
        subtitle1: {
            fontFamily: 'Poppins, sans-serif',
        },
        // Announcement bar, review count, product description, benefits description, breadcrumbs, contact us, variants
        body2: {
            fontFamily: 'Poppins, sans-serif',
        },
        // Banner section, flash sale timmer, discount tag, account dropdown
        caption: {
            fontFamily: 'Poppins, sans-serif',
            textAlign: 'left',
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                className: 'main-button',
                style: {
                    fontFamily: 'Poppins, sans-serif',
                    textAlign: 'center',
                    textTransform: 'none'
                }
            },
            styleOverrides: {
                contained: {
                    borderRadius: '4px',
                    fontWeight: FW.regular,
                },
                outlined: {
                    borderRadius: '4px',
                    fontWeight: FW.regular,
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: FW.regular,
                    fontSize: '1rem',
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                variant: 'filled',
                InputProps: {
                    style: {
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1rem',
                        fontWeight: FW.regular,
                        color: '#000',
                    }
                },
                InputLabelProps: {
                    style: {
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1rem',
                        fontWeight: FW.regular,
                        color: '#000',
                        opacity: 0.5,
                    }
                }
            },
        },
    }
})

export default theme;