import { List, ListItemButton, ListItemIcon, ListItemText, Popover } from '@mui/material';
import { ACCOUNT } from '../constants/account';
import { useNavigate } from 'react-router';
import { PersonOutlineOutlined, ShopOutlined } from '@mui/icons-material';

interface AccountPopUpProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
}

export const AccountPopUp: React.FC<AccountPopUpProps> = ({ anchorEl, setAnchorEl }) => {
  const nav = useNavigate();

  const renderIcon = (label: string) => {
    switch (label) {
      case 'Manage My Account':
        return (
          <ListItemIcon>
            <PersonOutlineOutlined sx={{ color: '#fff' }} />
          </ListItemIcon>
        );
      case 'My Orders':
        return (
          <ListItemIcon>
            <ShopOutlined sx={{ color: '#fff' }} />
          </ListItemIcon>
        );
      // case 'My Cancellations':
      //   return (
      //     <ListItemIcon>
      //       <CancelOutlined sx={{ color: '#fff' }} />
      //     </ListItemIcon>
      //   );
      // case 'My Reviews':
      //   return (
      //     <ListItemIcon>
      //       <StarBorderOutlined sx={{ color: '#fff' }} />
      //     </ListItemIcon>
      //   );
      default:
        return null;
    }
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          background: 'rgba(45,45,45,0.6)',
          backdropFilter: 'blur(12px)',
          borderRadius: '4px',
          color: 'white',
          minWidth: 220,
          boxShadow: 6,
        },
      }}
    >
      <List>
        {ACCOUNT.map((item, index) => (
          <ListItemButton
            key={index}
            onClick={() => {
              nav(item.path);
              setAnchorEl(null);
            }}
          >
            {renderIcon(item.label)}
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Popover>
  );
};
