import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = ({
  open,
  severity,
  message,
  onClose,
  duration = 3000,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
