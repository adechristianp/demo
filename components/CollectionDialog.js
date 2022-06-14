/* eslint-disable react-hooks/rules-of-hooks */
/** @jsxImportSource @emotion/react */
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppDispatch, useAppSelector } from '../reducer/hooks';
import { addCollection, selectCollection, selectState } from '../reducer/counter.slice';
import { useState } from 'react';


const CollectionDialog = (props) => {
  const { open, setOpen, media } = props;
  const dispatch = useAppDispatch();
  const collections = useAppSelector(selectCollection);
  const [input, setInput] = useState('');
  const [show, setShow] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState('')

  console.log('collections', collections);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  const useAddCollection = (input) => {
    if (collections.find(data => data === input)) {
      setShow(true);
      return;
    }

    dispatch(addCollection(input));
    setInput('');
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Collection List
        </DialogTitle>
        <DialogContent>
          <div
            css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <TextField
              css={{ width: '100%' }}
              label="input collection name"
              variant="filled"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" aria-label="search" onClick={() => useAddCollection(input)}>
              <AddCircleIcon fontSize='large' />
            </Button>
          </div>
          {collections.length === 0 && <Typography>Please Add Collection to Save Anime</Typography>}
          {collections.length > 0 &&
            <RadioGroup
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
            >
              <Typography>Please Choose Collection to Save Anime</Typography>
              {collections.map((data, i) =>
                <FormControlLabel
                  key={i}
                  value={data}
                  control={<Radio />}
                  label={data}
                />
              )}
            </RadioGroup>
          }

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Save
          </Button>
        </DialogActions>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={3000}
          open={show}
          onClose={() => setShow(false)}
        >
          <Alert severity="error">This is an error message!</Alert>
        </Snackbar>
      </Dialog>
    </div>
  );
};

export default CollectionDialog;
