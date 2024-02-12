import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const AlertConfirmDialog = ({ show, title, children, action, handleClose }) => {
  return (
    <div>
      <Dialog open={show} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontSize: '25px'
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{children}</DialogContentText>
        </DialogContent>
        <DialogActions>{action}</DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertConfirmDialog;
