import { useState, useCallback } from 'react';

type SnackBarState = {
  open: boolean;
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
};

export const useSnackBar = () => {
  const [snackBar, setSnackBar] = useState<SnackBarState>({
    open: false,
    message: '',
    severity: 'info',
  });

  const showSnackBar = useCallback(
    (message: string, severity: SnackBarState['severity'] = 'info') => {
      setSnackBar({ open: true, message, severity });
    },
    [],
  );

  const handleClose = useCallback(() => {
    setSnackBar((prev) => ({ ...prev, open: false }));
  }, []);

  return {
    snackBar,
    showSnackBar,
    handleClose,
  };
};
