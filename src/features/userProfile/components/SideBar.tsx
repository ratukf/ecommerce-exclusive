import { Box, Grid, List, ListItemButton, ListItemText, Typography, useTheme } from '@mui/material';
import { FW } from '../../../theme';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';

const SIDE_BAR = [
  {
    label: 'Manage My Account',
    children: [
      { label: 'My Profile', key: 'profile' },
      { label: 'Address Book', key: 'address' },
    ],
  },
  {
    label: 'My Items',
    children: [
      { label: 'My Orders', key: 'orders' },
      { label: 'My Wishlist', key: 'wishlist' },
    ],
  },
];

export const SideBar = () => {
  const theme = useTheme();
  const nav = useNavigate();
  const param = useParams();
  const tab = param['*'];

  useEffect(() => {
    console.log('🚀 ~ SideBar ~ tab:', tab);
  }, [tab]);

  return (
    <Grid size={3}>
      <Box
        width='100%'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          textAlign: 'left',
        }}
      >
        <List sx={{ width: '100%' }}>
          {SIDE_BAR.map((item, index) => (
            <Box key={index} sx={{ padding: '0.5rem 0' }}>
              <Box sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                <Typography variant='subtitle1' sx={{ fontWeight: FW.medium }}>
                  {item.label}
                </Typography>
              </Box>
              <List>
                {item.children.map((child, childIndex) => (
                  <ListItemButton
                    key={childIndex}
                    onClick={() => {
                      nav(`/account/${child.key}`);
                    }}
                  >
                    <ListItemText
                      primary={child.label}
                      sx={{
                        color: tab === child.key ? theme.palette.secondary.main : '#000',
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          ))}
        </List>
      </Box>
    </Grid>
  );
};
