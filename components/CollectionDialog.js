/* eslint-disable react-hooks/rules-of-hooks */
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppDispatch, useAppSelector } from '../reducer/hooks';
import {
  selectCollection,
  addAnime,
} from '../reducer/collection.slice';
import AddCollection from './AddCollection';
import SnackBarComponent from './Snackbar';

const initialState = {
  show: false,
  type: '',
  selectedCollection: '',
  message: ''
};

const handleSelectRadio = (event, state, setState) => {
  if (event.target.value === state.selectedCollection) {
    setState({ selectedCollection: '' });
    return;
  };

  setState({ selectedCollection: event.target.value });
};

const CollectionDialog = (props) => {
  const { open, setOpen, media, collectionInfo } = props;
  const collection = useAppSelector(selectCollection);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();

  const [state, setState] = useState(initialState);
  const { show, selectedCollection, message, type } = state;
  const handleSetState = (value) => setState({ ...state, ...value })

  const handleClose = () => {
    setOpen(false);
    setState(initialState);
  };

  const setErrorSnackbar = message => {
    handleSetState({
      show: true,
      type: 'error',
      message
    });
  };

  const setSuccessSnackbar = message => {
    handleSetState({
      show: true,
      type: 'success',
      message
    });
  };

  const handleSaveAnime = () => {
    const collected = collectionInfo.find(v => v.collection === selectedCollection);
    if (collected) {
      const message = 'Already saved in the selected collection!';
      setErrorSnackbar(message);
      return;
    }

    if (!selectedCollection) {
      setErrorSnackbar('Please select collection!');
      return;
    };

    const payload = {
      collectionId: selectedCollection,
      animeId: media.id,
      title: media.title,
      cover: media.coverImage.large
    };

    dispatch(addAnime(payload));
    setSuccessSnackbar('Saved to collection!');
    setOpen(false);
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
          <AddCollection collection={collection} />
          {collection.length === 0 && <Typography>Please Add Collection to Save Anime</Typography>}
          {collection.length > 0 &&
            <RadioGroup value={selectedCollection}>
              <Typography>Please Choose Collection to Save Anime</Typography>
              {collection.map(({ id, name }) =>
                <FormControlLabel
                  key={id}
                  value={id}
                  control={<Radio onClick={(e) => handleSelectRadio(e, state, setState)} />}
                  label={name}
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
            close
          </Button>
        </DialogActions>
      </Dialog>
      <SnackBarComponent
        show={show}
        type={type}
        message={message}
        onDismiss={() => handleSetState({ show: false })}
      />
    </div >
  );
};

export default CollectionDialog;