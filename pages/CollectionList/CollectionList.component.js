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
  Grid,
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
import { editCollection, editAnimeCollection } from '../../reducer/collection.slice';

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

  const onEdit = (data) => {
    setOpen(true);
    setSelectedCollection(data);
  };

  const onDelete = data => {
    setConfirm(true);
    setSelectedCollection(data);
  };

  const handleRemoveCollection = () => {
    const array = collection.filter(v => v.name !== selectedCollection.name);
    const animeArray = animeCollection.filter(v => v.collectionId !== selectedCollection.id);

    dispatch(editCollection(array));
    if (animeArray.length > 0) dispatch(editAnimeCollection(animeArray));

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
        <Grid container>
          {
            collection.slice(0).reverse().map(({ id, name }, i) => {
              const firstAnime = animeCollection.find((v) => v.collectionId == id)
              const cover = firstAnime ? firstAnime.coverImage.large : defaultImage;

              return (
                <Grid item key={id} xs={12} md={6} lg={4}>
                  <div css={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', minHeight: 100, margin: 10 }}>
                    {/* <Typography variant='h3' css={{ color: 'grey' }}>#{i + 1}</Typography> */}
                    <Card elevation={6} css={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                      <CardActionArea>
                        <Link
                          href={{
                            pathname: '/AnimeCollection',
                            query: {
                              id
                            }
                          }}>
                          <div css={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                            <div css={{ minWidth: 90, maxHeight: 90 }}>
                              <Image
                                alt='anime'
                                src={cover}
                                layout='intrinsic'
                                width={90}
                                height={90}
                                objectFit='cover'
                              />
                            </div>
                            <Typography variant='h5'>
                              {name}
                            </Typography>
                          </div>
                        </Link>
                      </CardActionArea>
                      <CardActions css={{ display: 'flex', flexDirection: 'column' }}>
                        <ButtonGroup
                          orientation="vertical"
                          variant="none"
                        >
                          <Button onClick={() => onEdit({ id, name })} key="one" size="small" startIcon={<EditIcon />} />
                          <Button onClick={() => onDelete({ id, name })} size="small" startIcon={<DeleteSharpIcon />} />
                        </ButtonGroup>
                      </CardActions>
                    </Card>
                  </div>
                </Grid>
              )
            })
          }
        </Grid>
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
        item={selectedCollection.name}
        handleConfirm={handleRemoveCollection}
      />
      {renderSnackbar(snackbar, setSnackbar)}
    </div>
  )
};

export default CollectionList;
