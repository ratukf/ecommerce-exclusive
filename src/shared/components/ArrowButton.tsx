import { ArrowBackOutlined, ArrowForwardOutlined } from '@mui/icons-material';
import { Box, IconButton, useTheme } from '@mui/material';

export const ArrowButton = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'inline', gap: 1 }}>
      <Box
        sx={{
          backgroundColor: theme.palette.grey[100],
          width: '40px',
          height: '40px',
          borderRadius: '50%',
        }}
      >
        <IconButton>
          <ArrowBackOutlined sx={{ color: theme.palette.grey[900] }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.grey[100],
          width: '40px',
          height: '40px',
          borderRadius: '50%',
        }}
      >
        <IconButton>
          <ArrowForwardOutlined sx={{ color: theme.palette.grey[900] }} />
        </IconButton>
      </Box>
    </Box>
  );
};
