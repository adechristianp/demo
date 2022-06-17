/** @jsxImportSource @emotion/react */
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
} from '@mui/material';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import EditIcon from '@mui/icons-material/Edit';

import {
  AniToolBar,
  AddCollection,
  EditCollectionDialog,
  RemoveConfirmDialog,
  Snackbar,
  config
} from "../../components";
import { editCollection } from '../../reducer/collection.slice';

const defaultImage = 'https://img.icons8.com/dusk/64/undefined/no-image.png';
const { snackbarInitialState } = config;

const renderSnackbar = (snackbar, setSnackbar) => (
  <Snackbar
    show={snackbar.show}
    type={snackbar.type}
    message={snackbar.message}
    onDismiss={() => setSnackbar(snackbarInitialState)}
  />
);

const CollectionList = (props) => {
  const { collectionList, animeCollection, dispatch } = props;
  const [collection, setCollection] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState({});
  const [snackbar, setSnackbar] = useState(snackbarInitialState);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    setCollection(collectionList);
  }, [collectionList])

  const onEdit = id => {
    setOpen(true);
    setSelectedCollection(id);
  };

  const onDelete = name => {
    setConfirm(true);
    setSelectedCollection(name);
  };

  const handleRemoveCollection = () => {
    const array = collection.filter(v => v.name !== selectedCollection);

    dispatch(editCollection(array));

    setSnackbar({
      show: true,
      type: 'success',
      message: 'Collection Removed!'
    });
    setConfirm(false);
  };

  return (
    <div css={{ padding: 16 }}>
      <AniToolBar hasBackButton title="Collection List" />
      <div css={{ marginTop: 75, display: 'flex', flexDirection: 'column', gap: 15 }}>
        <AddCollection collection={collection} />
        {
          collection.map(({ id, name }, i) => {
            const firstAnime = animeCollection.find((v) => v.collectionId == id)
            const cover = firstAnime ? firstAnime.coverImage.large : defaultImage;

            return (
              <div key={id} css={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', minHeight: 100 }}>
                <Typography variant='h3' css={{ color: 'grey' }}>#{i + 1}</Typography>
                <Card elevation={6} css={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                  <CardActionArea>
                    <Link
                      href={{
                        pathname: '/AnimeCollection',
                        query: {
                          id
                        }
                      }}>
                      <div css={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <Image
                          alt='anime'
                          src={cover}
                          layout='intrinsic'
                          width={90}
                          height={90}
                        />
                        <Typography variant='h6'>
                          {name}
                        </Typography>
                      </div>
                    </Link>
                  </CardActionArea>
                  <CardActions css={{ display: 'flex', flexDirection: 'column' }}>
                    <ButtonGroup
                      orientation="vertical"
                      variant="text"
                      css={{ alignItems: 'flex-start' }}
                    >
                      <Button onClick={() => onEdit(id)} key="one" size="small" startIcon={<EditIcon />}>Edit</Button>
                      <Button onClick={() => onDelete(name)} size="small" startIcon={<DeleteSharpIcon />}>Remove</Button>
                    </ButtonGroup>
                  </CardActions>
                </Card>
              </div>
            )
          })
        }
      </div>
      <EditCollectionDialog
        open={open}
        onDismiss={() => setOpen(false)}
        collection={collection}
        selectedCollection={selectedCollection}
      />
      <RemoveConfirmDialog
        open={confirm}
        onDismiss={() => setConfirm(false)}
        item={selectedCollection}
        handleConfirm={handleRemoveCollection}
      />
      {renderSnackbar(snackbar, setSnackbar)}
    </div>
  )
};

export default CollectionList;
