/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import {
  Grid,
  Rating,
  Typography,
  Chip,
  Button,
  Stack,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FolderIcon from '@mui/icons-material/Folder';
import NoiseControlOffIcon from '@mui/icons-material/NoiseControlOff';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { css } from '@emotion/react';

import { invertColor, timeConvert } from '../../utils';
import { AniToolBar, AddToCollectionDialog } from '../../components';
import Link from 'next/link';

const wrapper = (color) => css({
  minHeight: 1,
  backgroundColor: `${color}60`,
  color: color ? invertColor(color, true) : 'black',
  paddingBottom: 30
});


const AnimeDetail = (props) => {
  const { loading, media, animeCollection, collectionList } = props;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const show = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) return <div>loading...</div>

  const { id, coverImage, title, averageScore, description, genres, format, type, duration } = media;
  const rating = averageScore / 20;
  const collectIn = animeCollection.filter(data => data.id === id);
  const isCollected = collectIn.length > 0;

  return (
    <div css={wrapper('#fff')}>
      <AniToolBar hasBackButton title="Anime Detail" />
      <Grid
        container
        css={{
          marginTop: 40,
          padding: 30,
          '@media(min-width: 768px)': {
            paddingLeft: 100
          }
        }}
      >
        <Grid item md={6} lg={4}>
          <Image
            alt='anime'
            src={coverImage.large}
            layout='intrinsic'
            width={375}
            height={550}
          />
        </Grid>
        <Grid item md={6} lg={8}>
          <Typography variant='h2' fontWeight='bold'>
            {title.romaji}
            {isCollected &&
              <Chip
                color="success"
                variant='outlined'
                label="COLLECTED"
                deleteIcon={<LibraryAddCheckIcon />}
                css={{ marginLeft: 20 }}
              />}
          </Typography>
          <Rating
            value={rating}
            readOnly
            precision={0.5}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
          />
          <div css={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
            <div css={{ gap: 4, display: 'flex' }}>
              <Typography>{format}</Typography>
              <NoiseControlOffIcon fontSize='small' />
              <Typography>{type}</Typography>
              <NoiseControlOffIcon fontSize='small' />
              <Typography>{timeConvert(duration)}</Typography>
            </div>
            <div css={{ gap: 4, display: 'flex', flexWrap: 'wrap', marginBottom: 20 }}>
              {
                genres.map((data, i) => <Chip key={i} label={data} />)
              }
            </div>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={() => setOpen(true)}
              >
                <Typography variant='h5'>
                  Add
                </Typography>
              </Button>
              <Button
                variant="outlined"
                startIcon={<FolderIcon />}
                disabled={collectIn.length === 0}
                id="basic-button"
                onClick={handleClick}
              >
                <Typography variant='h5'>
                  Collected In
                </Typography>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={show}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <Link href='/CollectionList'>
                  <MenuItem>
                    COLLECTION LIST
                  </MenuItem>
                </Link>
                <Divider />
                {
                  collectIn.map((data, i) => {
                    const col = collectionList.find(v => v.id == data.collectionId);
                    return (
                      <Link
                        key={i}
                        href={{
                          pathname: '/AnimeCollection',
                          query: {
                            id: data.collectionId
                          }
                        }}
                      >
                        <MenuItem>
                          {col.name}
                        </MenuItem>
                      </Link>
                    )
                  })
                }
              </Menu>
            </Stack>
            <div css={{ marginTop: 30 }}>
              <Typography variant='p'>{description}</Typography>
            </div>
          </div>
        </Grid>
      </Grid>
      <AddToCollectionDialog
        open={open}
        setOpen={setOpen}
        media={media}
        collectionInfo={collectIn}
      />
    </div >
  )
};

export default AnimeDetail;
