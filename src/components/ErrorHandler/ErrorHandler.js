import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  errorAlert: {
    minWidth: '400px',
    maxWidth: '600px',
  },
  errorTitle: {
    fontWeight: 600,
  },
  errorMessage: {
    marginTop: '8px',
  }
}));

export default function ErrorHandler({ 
  open, 
  onClose, 
  error, 
  severity = "error",
  autoHideDuration = 6000,
  showRecoveryAction = false,
  onRetry 
}) {
  const classes = useStyles();

  const getErrorMessage = (error) => {
    if (typeof error === 'string') {
      return error;
    }
    
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    
    if (error?.message) {
      return error.message;
    }
    
    return "An unexpected error occurred. Please try again.";
  };

  const getErrorTitle = (error) => {
    if (error?.response?.status === 401) {
      return "Authentication Error";
    }
    if (error?.response?.status === 403) {
      return "Access Denied";
    }
    if (error?.response?.status === 404) {
      return "Not Found";
    }
    if (error?.response?.status >= 500) {
      return "Server Error";
    }
    if (error?.name === 'NetworkError') {
      return "Connection Error";
    }
    return "Error";
  };

  const getRecoveryAction = (error) => {
    if (error?.response?.status === 401) {
      return "Please log in again to continue.";
    }
    if (error?.response?.status >= 500) {
      return "Please try again in a few moments.";
    }
    if (error?.name === 'NetworkError') {
      return "Check your internet connection and try again.";
    }
    return "Please try again or contact support if the problem persists.";
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert 
        onClose={onClose} 
        severity={severity}
        variant="filled"
        className={classes.errorAlert}
        action={
          showRecoveryAction && onRetry ? (
            <button 
              onClick={onRetry}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'white', 
                textDecoration: 'underline',
                cursor: 'pointer' 
              }}
            >
              Retry
            </button>
          ) : null
        }
      >
        <AlertTitle className={classes.errorTitle}>
          {getErrorTitle(error)}
        </AlertTitle>
        <div className={classes.errorMessage}>
          {getErrorMessage(error)}
        </div>
        {showRecoveryAction && (
          <div style={{ marginTop: '8px', fontSize: '0.875rem', opacity: 0.9 }}>
            {getRecoveryAction(error)}
          </div>
        )}
      </Alert>
    </Snackbar>
  );
}