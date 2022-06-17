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
  FormGroup,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useAppDispatch, useAppSelector } from '../reducer/hooks';
import {
  selectCollection,
  addAnime,
} from '../reducer/collection.slice';
import AddCollection from './AddCollection';
import SnackBarComponent from './Snackbar';
import config from './component.config';

const { snackbarInitialState } = config;

const renderSnackbar = (snackbar, setSnackbar) => (
  <SnackBarComponent
    show={snackbar.show}
    type={snackbar.type}
    message={snackbar.message}
    onDismiss={() => setSnackbar(snackbarInitialState)}
  />
);

const AddToCollectionDialog = (props) => {
  const { open, setOpen, data, collectionInfo, successCallback } = props;

  const collection = useAppSelector(selectCollection);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();
  const [selectedCollection, setSelectedCollection] = useState({});
  const [snackbar, setSnackbar] = useState(snackbarInitialState);

  const handleCheck = (event) => {
    setSelectedCollection({
      ...selectedCollection,
      [event.target.value]: event.target.checked
    });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCollection({});
  };

  const setErrorSnackbar = message => {
    setSnackbar({
      show: true,
      type: 'error',
      message
    });
  };

  const setSuccessSnackbar = message => {
    setSnackbar({
      show: true,
      type: 'success',
      message
    });
  };

  const handleSaveAnime = () => {
    let payload = [];
    const anyChecked = Object.entries(selectedCollection).find(item => item[1] === true);

    if (!anyChecked) {
      setErrorSnackbar('Please select collection!');
      return;
    };

    Object.entries(selectedCollection).map(item => {
      if (item[1]) {
        if (Array.isArray(data)) {
          data.map(v => {
            payload.push({
              collectionId: parseInt(item[0]),
              id: v.id,
              title: v.title,
              coverImage: v.coverImage,
              averageScore: v.averageScore
            });
          });
          return;
        }

        payload.push({
          collectionId: parseInt(item[0]),
          id: data.id,
          title: data.title,
          coverImage: data.coverImage,
          averageScore: data.averageScore
        });
      }
    });

    dispatch(addAnime(payload));
    setSuccessSnackbar('Saved to collection!');
    setSelectedCollection({});
    setOpen(false);
    successCallback && successCallback();
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
          {collection.length === 0 && <Typography css={{ marginTop: 40 }}>Please Add Collection to Save Anime</Typography>}
          {collection.length > 0 &&
            <FormGroup>
              <Typography>Please Choose Collection to Save Anime</Typography>
              {collection.map(({ id, name }) => {
                const collected = collectionInfo.find(v => v.collectionId === id);

                return (<FormControlLabel
                  key={id}
                  value={id}
                  control={
                    <Checkbox onChange={handleCheck} defaultChecked={false} />
                  }
                  label={name}
                  disabled={collected}
                />)
              }
              )}
            </FormGroup>
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
      {renderSnackbar(snackbar, setSnackbar)}
    </div >
  );
};

export default AddToCollectionDialog;