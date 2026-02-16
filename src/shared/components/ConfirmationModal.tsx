import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material';
import type { ConfirmationModalProps } from '../types/components';
import { buttonSx } from '../../styles/buttonSx';

const ConfirmationModal = ({ open, onClose, onSubmit }: ConfirmationModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      fullWidth={true}
    >
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <Typography>Are you sure?</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button onClick={onClose} variant='outlined' sx={buttonSx.greyOutlinedSmall}>
            No
          </Button>
          <Button onClick={onSubmit} variant='contained' sx={buttonSx.defaultSmall}>
            Yes
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export { ConfirmationModal };
