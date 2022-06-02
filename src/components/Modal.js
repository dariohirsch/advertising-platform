import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Modal({ handleCloseModal, handleCloseModalAndReset, open, platform }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleCloseModal} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>{'Continue with this form or create a new one?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Continue creating {platform} form?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseModalAndReset}>
            Create a new form
          </Button>
          <Button onClick={handleCloseModal} autoFocus>
            Continue with this form
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
