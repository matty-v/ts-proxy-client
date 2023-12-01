import CloseIcon from '@mui/icons-material/Close';
import { Alert, AlertColor, IconButton, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NotificationPayload } from '../types';
import { Events, on } from '../utils/Broadcaster';

export default function Notification() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  useEffect(() => {
    on<NotificationPayload>(Events.Notify).subscribe((payload: any) => {
      setMessage(payload.Message);
      setSeverity(payload.Severity);
      setOpen(true);
    });
  }, []);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          data-testid="snackbar-message"
          onClose={handleClose}
          severity={severity as AlertColor}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
