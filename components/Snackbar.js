import { Snackbar, Alert } from "@mui/material";

const SnackbarComponent = (props) => {
  const { type, message, show, onDismiss } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={3000}
      open={show}
      onClose={onDismiss}
    >
      <Alert severity={type}>{message}</Alert>
    </Snackbar >
  )
};

SnackbarComponent.defaultProps = {
  type: 'success',
  message: '',
  show: false,
  onDismiss: () => { }
};

export default SnackbarComponent;