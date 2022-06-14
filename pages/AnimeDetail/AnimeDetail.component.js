/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import NoiseControlOffIcon from '@mui/icons-material/NoiseControlOff';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid, Rating, Typography, Chip, Fab } from '@mui/material';
import { css } from '@emotion/react';

import { invertColor, timeConvert } from '../../utils';
import { AniToolBar, CollectionDialog } from '../../components';
import { useAppSelector } from '../../reducer/hooks';
import { selectAnimes } from '../../reducer/collection.slice';

const wrapper = (color) => css({
  minHeight: 1,
  backgroundColor: `${color}60`,
  color: color ? invertColor(color, true) : 'black',
  paddingBottom: 30
});

const fabWrapper = (isCollected) => css({
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
  color: isCollected ? 'red' : 'white',
  '@media(min-width: 1200px)': {
    right: 100,
    bottom: 100,
  }
});

const AnimeDetail = (props) => {
  const { loading, media } = props;
  const [open, setOpen] = useState(false);
  const { back } = useRouter();
  const collectedAnimes = useAppSelector(selectAnimes);

  if (loading) return <div>loading...</div>

  const { id, coverImage, title, averageScore, description, genres, format, type, duration } = media;
  const rating = averageScore / 20;
  const isCollected = collectedAnimes.find(data => data.animeId === id);

  return (
    <div css={wrapper('#fff')}>
      <AniToolBar>
        <ArrowBackIcon onClick={() => back()} css={{ margin: 10 }} />
      </AniToolBar>
      <Grid
        container
        css={{
          marginTop: 50,
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
          <Typography variant='h2' fontWeight='bold'>{title.romaji}</Typography>
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
            <div css={{ gap: 4, display: 'flex', flexWrap: 'wrap' }}>
              {
                genres.map((data, i) => <Chip key={i} label={data} />)
              }
            </div>
            <div css={{ marginTop: 30 }}>
              <Typography variant='p'>{description}</Typography>
            </div>
          </div>
        </Grid>
      </Grid>
      <Fab aria-label="like" css={fabWrapper(isCollected)} onClick={() => setOpen(true)}>
        <FavoriteIcon />
      </Fab>
      <CollectionDialog
        open={open}
        setOpen={setOpen}
        media={media}
      />
    </div >
  )
};

export default AnimeDetail;
