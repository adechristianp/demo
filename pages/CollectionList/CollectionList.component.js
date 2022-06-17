/** @jsxImportSource @emotion/react */
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
  RemoveCollectionDialog
} from "../../components";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const defaultImage = 'https://img.icons8.com/dusk/64/undefined/no-image.png';

const CollectionList = (props) => {
  const { collectionList, animeCollection } = props;
  const [collection, setCollection] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState({});
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
      <RemoveCollectionDialog
        open={confirm}
        onDismiss={() => setConfirm(false)}
        collection={collection}
        selectedCollection={selectedCollection}
      />
    </div >
  )
};

export default CollectionList;
