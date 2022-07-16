import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

const Toast = ({ text, severity, open, handleClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
