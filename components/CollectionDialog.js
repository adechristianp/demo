/* eslint-disable react-hooks/rules-of-hooks */
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  TextField,
  Snackbar,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppDispatch, useAppSelector } from '../reducer/hooks';
import {
  addCollection,
  selectCollection,
  addAnime
} from '../reducer/collection.slice';

const initialState = {
  input: '',
  show: false,
  errorMessage: '',
  selectedCollection: ''
};

const handleSelectRadio = (event, state, setState) => {
  if (event.target.value === state.selectedCollection) {
    setState({ selectedCollection: '' });
    return;
  };

  setState({ selectedCollection: event.target.value });
};

const CollectionDialog = (props) => {
  const { open, setOpen, media } = props;
  const dispatch = useAppDispatch();
  const [state, setState] = useState(initialState);
  const { input, show, selectedCollection, errorMessage } = state;

  const handleSetState = (value) => setState({ ...state, ...value })
  const collections = useAppSelector(selectCollection);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveAnime = () => {
    if (!selectedCollection) {
      handleSetState({
        show: true,
        errorMessage: 'Please select collection'
      });
      return;
    };

    const payload = {
      collection: selectedCollection,
      animeId: media.id,
      title: media.title
    };

    dispatch(addAnime(payload));
    setOpen(false);
  };

  const useAddCollection = (input) => {
    if (collections.find(data => data === input)) {
      handleSetState({
        show: true,
        errorMessage: 'Collection Name Already Exist'
      });
      return;
    };

    dispatch(addCollection(input));
    handleSetState({ input: '' })
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
              onChange={(e) => handleSetState({ input: e.target.value })}
            />
            <Button type="submit" aria-label="search" onClick={() => useAddCollection(input)}>
              <AddCircleIcon fontSize='large' />
            </Button>
          </div>
          {collections.length === 0 && <Typography>Please Add Collection to Save Anime</Typography>}
          {collections.length > 0 &&
            <RadioGroup value={selectedCollection}>
              <Typography>Please Choose Collection to Save Anime</Typography>
              {collections.map((data, i) =>
                <FormControlLabel
                  key={i}
                  value={data}
                  control={<Radio onClick={(e) => handleSelectRadio(e, state, setState)} />}
                  label={data}
                />
              )}
            </RadioGroup>
          }

        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSaveAnime}
          >
            Save
          </Button>
          <Button
            onClick={handleClose}
          >
            cancel
          </Button>
        </DialogActions>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={3000}
          open={show}
          onClose={() => handleSetState({ show: false })}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
      </Dialog>
    </div >
  );
};

export default CollectionDialog;
