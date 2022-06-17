import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const RemoveConfirmDialog = (props) => {
  const { open, onDismiss, handleConfirm, item } = props;

  return (
    <Dialog
      open={open}
      onClose={onDismiss}
    >
      <DialogTitle>
        Remove Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure want to remove {item} from the collection?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDismiss}>Nope</Button>
        <Button onClick={handleConfirm} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RemoveConfirmDialog;