import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase';
import { Box, Button, Typography } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = auth.currentUser;
  const location = useLocation();
  const nav = useNavigate();

  if (!user) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10, mb: 10 }}>
        <Typography variant='h6' fontFamily='Poppins, sans-serif' fontWeight={500}>
          You need to log in.
        </Typography>
        <Button
          variant='outlined'
          sx={{
            mt: 2,
            borderColor: '#DB4444',
            color: '#DB4444',
            borderWidth: '1.5px',
            fontFamily: 'Poppins, sans-serif',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#DB4444', color: '#fafafa' },
          }}
          onClick={() => nav('/signup', { state: { from: location } })}
        >
          Go to Login
        </Button>
      </Box>
    );
  }

  return <>{children}</>;
};
