import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useAppDispatch } from '../reducer/hooks';
import { editCollection } from '../reducer/collection.slice';
import SnackbarComponent from './Snackbar';

const snackbarState = {
  show: false,
  type: '',
  messasge: ''
};

export default function EditCollectionDialog(props) {
  const { open, onDismiss, collection, selectedCollection } = props;
  const [input, setInput] = useState('');
  const [snackbar, setSnackbar] = useState(snackbarState);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (!input) {
      setSnackbar({
        show: true,
        type: 'error',
        message: 'Please Input Collection Name'
      });
      return;
    };

    if (collection.find(v => v.name.toLowerCase() === input.toLowerCase())) {
      setSnackbar({
        show: true,
        type: 'error',
        message: 'Collection Name Already Exist'
      });
      return;
    };

    const array = [...collection];
    const index = collection.findIndex(v => v.id === selectedCollection);
    array.splice(index, 1, { id: selectedCollection, name: input })

    dispatch(editCollection(array));

    setSnackbar({
      show: true,
      type: 'success',
      message: 'Collection Edited!'
    });
    onDismiss();
    setInput('');
  };

  return (
    <div>
      <Dialog open={open} onClose={onDismiss}>
        <DialogTitle>Edit Collection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Input Collection Name
          </DialogContentText>
          <TextField
            autoFocus
            value={input}
            margin="dense"
            id="name"
            label="collection name"
            fullWidth
            variant="standard"
            onChange={(e) => setInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Save</Button>
          <Button onClick={onDismiss}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <SnackbarComponent
        show={snackbar.show}
        type={snackbar.type}
        message={snackbar.message}
        onDismiss={() => setSnackbar(snackbarState)}
      />
    </div>
  );
}
