import { Box, Grid, List, ListItemButton, ListItemText, Typography, useTheme } from '@mui/material';
import { FW } from '../../../theme';

const SIDE_BAR = [
  {
    label: 'Manage My Account',
    children: [{ label: 'My Profile' }, { label: 'Address Book' }],
  },
  {
    label: 'My Orders',
    children: [{ label: 'My Orders' }, { label: 'My Wishlist' }],
  },
];

interface SideBarProps {
  activeList: string;
  setActiveList: (value: string) => void;
}

export const SideBar = ({ activeList, setActiveList }: SideBarProps) => {
  const theme = useTheme();

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
                  <ListItemButton key={childIndex}>
                    <ListItemText
                      primary={child.label}
                      onClick={() => {
                        setActiveList(child.label);
                      }}
                      sx={{
                        color: activeList === child.label ? theme.palette.secondary.main : '#000',
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
