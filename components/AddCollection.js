/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TextField } from '@material-ui/core';
import { Button, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import SnackbarComponent from './Snackbar';
import { useAppDispatch } from '../reducer/hooks';
import { addCollection } from '../reducer/collection.slice';

const wrapper = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  gap: 10,
  marginBottom: 40
});

const snackbarState = {
  show: false,
  type: '',
  messasge: ''
};

export default function AddCollection({ collection }) {
  const [input, setInput] = useState('');
  const [snackbar, setSnackbar] = useState(snackbarState);
  const dispatch = useAppDispatch();

  const handleAddCollection = () => {
    if (!input) {
      setSnackbar({
        show: true,
        type: 'error',
        message: 'Please Input Collection Name'
      });
      return;
    };

    if (collection.find(v => v.name.toLowerCase() == input.toLowerCase())) {
      setSnackbar({
        show: true,
        type: 'error',
        message: 'Collection Name Already Exist'
      });
      return;
    };

    dispatch(addCollection({
      id: new Date().valueOf(),
      name: input
    }));

    setSnackbar({
      show: true,
      type: 'success',
      message: 'Collection Added!'
    });
    setInput('');
  };

  return (
    <div css={wrapper}>
      <TextField
        css={{ width: '100%' }}
        label="input collection name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={handleAddCollection}
      >
        <Typography variant='h5'>
          Add
        </Typography>
      </Button>
      <SnackbarComponent
        show={snackbar.show}
        type={snackbar.type}
        message={snackbar.message}
        onDismiss={() => setSnackbar(snackbarState)}
      />
    </div>
  )
};
