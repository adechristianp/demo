/** @jsxImportSource @emotion/react */
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  Rating
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';

const renderAnimeCard = (data) => {
  const { id, title, coverImage, averageScore } = data;
  const rating = averageScore / 20;

  return (
    <Card css={{ maxWidth: 400, borderRadius: 10 }}>
      <CardActionArea>
        <Link
          href={{
            pathname: '/AnimeDetail',
            query: {
              id: id
            }
          }}>
          <CardContent css={{ position: 'relative', alignContent: 'center', padding: 0 }}>
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
            <div css={{ position: 'absolute', top: 0, right: 0 }} >
              <EditIcon />
            </div>
            <div css={{ minHeight: 50, padding: 10 }}>
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
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  )
};

export default function AnimeGrid({ animeList }) {
  return (
    <Grid container spacing={3} css={{ padding: 20 }}>
      {animeList.map((data, i) => (
        <Grid item key={i} xs={6} md={4} lg={3} offset={2}>
          {renderAnimeCard(data)}
        </Grid>
      ))}
    </Grid>
  )
}
