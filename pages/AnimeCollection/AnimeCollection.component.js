/** @jsxImportSource @emotion/react */
import { Typography, IconButton } from "@mui/material";
import { AnimeGrid, AniToolBar, EditCollectionDialog } from "../../components"
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";

export default function AnimeCollection(props) {
  const { animes, collectionList, router } = props;
  const [open, setOpen] = useState(false);

  const collection = collectionList.find(v => v.id == router.query.id);

  if (!router.isReady) return;

  return (
    <div css={{ marginTop: 75, padding: 16 }}>
      <AniToolBar hasBackButton title={`Anime Collection`} />
      <div css={{ position: 'fixed', zIndex: 10, backgroundColor: '#fff9', borderRadius: 5, display: 'flex' }}>
        <Typography css={{ marginLeft: 20 }} variant="h2">
          {collection.name}
        </Typography>
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      </div>
      <div css={{ marginTop: 30 }}>
        <AnimeGrid
          animeList={animes}
        />
      </div>
      <EditCollectionDialog
        open={open}
        onDismiss={() => setOpen(false)}
        collection={collectionList}
        selectedCollection={collection.id}
      />
    </div >
  )
}
