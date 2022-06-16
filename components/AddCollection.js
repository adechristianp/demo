/** @jsxImportSource @emotion/react */
import { TextField } from '@material-ui/core';
import { Button, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';

export default function AddCollection(props) {
  const { handleAddCollection } = props;
  const [input, setInput] = useState('');

  const onSubmit = () => {
    handleAddCollection(input);
    setInput('');
  };

  return (
    <div
      css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 10, marginBottom: 40, position: 'sticky' }}>
      <TextField
        css={{ width: '100%' }}
        label="input collection name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={onSubmit}
      >
        <Typography variant='h5'>
          Add
        </Typography>
      </Button>
    </div>
  )
};
