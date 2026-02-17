import { Box, List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAV_LIST } from '../../shared/constants/navigation';

export const SideBar = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleClick = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <Box sx={{ width: '100%', borderRight: '1px solid rgba(0,0,0,0.2)' }}>
      <List>
        {NAV_LIST.map((item, idx) => (
          <Box key={item.label}>
            {item.children ? (
              <>
                <ListItemButton onClick={() => handleClick(idx)} sx={{ pl: 0 }}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
                <Collapse in={openIndex === idx} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    {item.children.map((child) => (
                      <ListItemButton
                        key={child.label}
                        sx={{ pl: 4 }}
                        onClick={() => navigate(child.path)}
                      >
                        <ListItemText primary={child.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItemButton sx={{ pl: 0 }} onClick={() => item.path && navigate(item.path)}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );
};
