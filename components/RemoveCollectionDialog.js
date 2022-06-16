import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import SnackbarComponent from './Snackbar';
import { editCollection } from '../reducer/collection.slice';
import { useAppDispatch } from '../reducer/hooks';

const snackbarState = {
  show: false,
  type: '',
  messasge: ''
};

export default function RemoveCollectionDialog(props) {
  const { open, onDismiss, collection, selectedCollection } = props;
  const [snackbar, setSnackbar] = useState(snackbarState);
  const dispath = useAppDispatch()

  const handleRemoveCollection = () => {
    const array = collection.filter(v => v.name !== selectedCollection);

    dispath(editCollection(array));

    setSnackbar({
      show: true,
      type: 'success',
      message: 'Collection Removed!'
    });

    onDismiss();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onDismiss}
      >
        <DialogTitle>
          Delete Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure want to delete {selectedCollection} collection?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDismiss}>Nope</Button>
          <Button onClick={handleRemoveCollection} autoFocus>
            Yes
          </Button>
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
