import { Snackbar, Alert } from "@mui/material"

export default function SnackbarComponent(props) {
  const { type, message, show, onDismiss } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={2000}
      open={show}
      onClose={onDismiss}
    >
      <Alert severity={type}>{message}</Alert>
    </Snackbar >
  )
};
