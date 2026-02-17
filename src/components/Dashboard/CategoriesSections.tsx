import React from 'react';
import { Box, Grid, Icon, Typography } from '@mui/material';
import { CATEGORIES } from '../../shared/constants/categories';
import {
  CameraAltOutlined,
  HeadphonesOutlined,
  MonitorOutlined,
  SmartphoneOutlined,
  SportsEsportsOutlined,
  WatchOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const categoryIcons: Record<string, React.ReactNode> = {
  Phones: <SmartphoneOutlined sx={{ fontSize: '2rem' }} />,
  Computers: <MonitorOutlined sx={{ fontSize: '2rem' }} />,
  SmartWatch: <WatchOutlined sx={{ fontSize: '2rem' }} />,
  Camera: <CameraAltOutlined sx={{ fontSize: '2rem' }} />,
  Headphones: <HeadphonesOutlined sx={{ fontSize: '2rem' }} />,
  Gaming: <SportsEsportsOutlined sx={{ fontSize: '2rem' }} />,
};

export const CategoriesSection = () => {
  const navigate = useNavigate();

  return (
    <>
      {CATEGORIES.map((category) => (
        <Grid size={2} key={category.label}>
          <Box
            onClick={() => navigate(category.path)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              border: '1px solid rgba(0,0,0,0.2)',
              paddingY: '5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.2s, color 0.2s',
              '&:hover': {
                backgroundColor: '#DB4444',
                color: '#fff',
                '& .MuiSvgIcon-root': { color: '#fff' },
              },
            }}
          >
            <Icon sx={{ width: '100%', height: '100%' }}>
              {categoryIcons[category.label] || null}
            </Icon>
            <Typography variant='subtitle1' sx={{ marginTop: '1rem' }}>
              {category.label}
            </Typography>
          </Box>
        </Grid>
      ))}
    </>
  );
};
