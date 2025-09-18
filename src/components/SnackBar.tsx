import React from 'react';
import type { TransitionProps } from '@mui/material/transitions';
import { Snackbar, Alert, Slide } from '@mui/material';

export type SnackBarProps = {
  open: boolean;
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
  autoHideDuration?: number;
  onClose: () => void;
};

const Transition = (props: TransitionProps & { children: React.ReactElement }) => (
  <Slide {...props} direction='up'>
    {props.children}
  </Slide>
);

export const SnackBar: React.FC<SnackBarProps> = ({
  open,
  message,
  severity = 'info',
  autoHideDuration = 4000,
  onClose = () => {},
}) => (
  <Snackbar
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={onClose}
    TransitionComponent={Transition}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  >
    <Alert
      onClose={onClose}
      severity={severity}
      variant='filled'
      sx={{
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 500,
        fontSize: '1rem',
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      {message}
    </Alert>
  </Snackbar>
);
