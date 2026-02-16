import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Typography,
} from '@mui/material';
import type { ConfirmationModalProps } from '../types/components';
import { buttonSx } from '../../styles/buttonSx';

const ConfirmationModal = ({ open, onClose, onSubmit, loading }: ConfirmationModalProps) => {
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
          {loading ? (
            <IconButton>
              <CircularProgress color='error' />
            </IconButton>
          ) : (
            <Button onClick={onSubmit} variant='contained' sx={buttonSx.defaultSmall}>
              Yes
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export { ConfirmationModal };
