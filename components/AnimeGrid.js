/** @jsxImportSource @emotion/react */
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  Rating,
  IconButton
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';

const renderCover = (data, props) => {
  const { id, coverImage } = data;
  const { withRemove, handleRemove } = props;

  return (
    <div css={{ position: 'relative' }}>
      <Link
        href={{
          pathname: '/AnimeDetail',
          query: {
            id: id
          }
        }}>
        <Image
          css={{
            display: 'block'
          }}
          alt='anime'
          src={coverImage.large}
          layout='intrinsic'
          width={400}
          height={400}
        />
      </Link>
      {withRemove &&
        <IconButton
          onClick={() => handleRemove(data)}
          css={{ position: 'absolute', top: 0, right: 0, color: 'white', backgroundColor: '#0005', margin: 5 }} >
          <DeleteSharpIcon
            css={{
              fontSize: 16,
              '@media(min-width: 768px)': {
                fontSize: 24,
              }
            }}
          />
        </IconButton>
      }
    </div>
  )
};

const renderAnimeCard = (data, props) => {
  const { id, title, averageScore } = data;
  const rating = averageScore / 20;

  return (
    <Card css={{ maxWidth: 400, borderRadius: 10 }}>
      <CardActionArea>
        <CardContent css={{ padding: 0 }}>
          {renderCover(data, props)}
          <Link
            href={{
              pathname: '/AnimeDetail',
              query: {
                id: id
              }
            }}>
            <div css={{ minHeight: 50, padding: 10, zIndex: 10 }}>
              <Typography gutterBottom variant="h5" component="div" noWrap>
                {title.romaji || 'No Title'}
              </Typography>
              <Rating
                value={rating}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
              />
            </div>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card >
  )
};

export default function AnimeGrid(props) {
  const { animeList } = props;

  return (
    <Grid container spacing={3} css={{ padding: 20 }}>
      {animeList.map((data, i) => (
        <Grid item key={i} xs={6} md={4} lg={3} offset={2}>
          {renderAnimeCard(data, props)}
        </Grid>
      ))}
    </Grid>
  )
}
