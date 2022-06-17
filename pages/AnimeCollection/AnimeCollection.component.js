/** @jsxImportSource @emotion/react */
import { Typography, IconButton } from "@mui/material";
import { AnimeGrid, AniToolBar, EditCollectionDialog, RemoveConfirmDialog, Snackbar, config } from "../../components";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";

import { editAnimeCollection } from "../../reducer/collection.slice";

const { snackbarInitialState } = config;

const renderSnackbar = (snackbar, setSnackbar) => (
  <Snackbar
    show={snackbar.show}
    type={snackbar.type}
    message={snackbar.message}
    onDismiss={() => setSnackbar(snackbarInitialState)}
  />
);

export default function AnimeCollection(props) {
  const { animes, collectionList, router, allAnimeCollection, dispatch } = props;
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [snackbar, setSnackbar] = useState(snackbarInitialState);

  const collection = collectionList.find(v => v.id == router.query.id);

  if (!router.isReady) return;

  const onConfirmRemove = () => {
    const allCollection = [...allAnimeCollection];
    const result = allCollection.filter(v => v.id != selectedAnime.id || v.collectionId != collection.id);

    dispatch(editAnimeCollection(result));

    setSnackbar({
      show: true,
      type: 'success',
      message: 'Anime Removed!'
    });
    setConfirm(false);
  };

  const onRemoveAnime = (anime) => {
    setSelectedAnime(anime);
    setConfirm(true);
  };

  return (
    <div css={{ marginTop: 75, padding: 16 }}>
      <AniToolBar hasBackButton title={`Anime Collection`} />
      <div css={{ position: 'fixed', zIndex: 10, backgroundColor: '#fff9', borderRadius: 5, display: 'flex' }}>
        <Typography css={{ marginLeft: 20, textDecoration: 'underline' }} variant="h2">
          {collection.name}
        </Typography>
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      </div>
      <div css={{ marginTop: 50 }}>
        <AnimeGrid
          withRemove
          animeList={animes}
          handleRemove={onRemoveAnime}
        />
      </div>
      <EditCollectionDialog
        open={open}
        onDismiss={() => setOpen(false)}
        collection={collectionList}
        selectedCollection={collection}
      />
      <RemoveConfirmDialog
        open={confirm}
        onDismiss={() => setConfirm(false)}
        item={selectedAnime && selectedAnime.title.romaji}
        handleConfirm={onConfirmRemove}
      />
      {renderSnackbar(snackbar, setSnackbar)}
    </div >
  )
}
