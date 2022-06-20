/** @jsxImportSource @emotion/react */
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  Rating,
  IconButton,
  Checkbox,
  Skeleton
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';

const renderSkeleton = () => {
  return (
    [...Array(10).keys()].map((v, i) => (
      <Grid item key={i} xs={6} md={4} lg={2.4}>
        <Skeleton
          variant="rectangular"
          height="25vh"
          css={{ borderRadius: 10 }}
          animation="wave"
        />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </Grid>
    ))
  )
};

const NoData = () => (
  <div css={{ height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'lightgrey' }}>
    <Typography variant="h3">No Data</Typography>
  </div>
);

const renderCover = (data, props) => {
  const { id, coverImage } = data;
  const { withRemove, handleRemove, withChecked, handleCheck, checkedList } = props;
  const isChecked = checkedList.find(v => v.id === id);
  const onCheck = (event) => {
    handleCheck(event.target.checked, data);
  };

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
          objectFit='cover'
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
      {withChecked &&
        <div css={{ position: 'absolute', top: 0, right: 0, margin: 5, backgroundColor: '#0003', borderRadius: 50 }} >
          <Checkbox
            checked={isChecked}
            onChange={onCheck} sx={{
              color: 'white',
              '&.Mui-checked': {
                color: 'white',
              },
            }}
            defaultChecked={false}
          />
        </div>}
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

const AnimeGrid = (props) => {
  const { animeList, loading } = props;
  if (animeList.length === 0) return <NoData />
  return (
    <Grid container spacing={3} css={{ padding: 20 }}>
      {loading
        ? renderSkeleton()
        : animeList.map((data, i) => (
          <Grid item key={i} xs={6} md={4} lg={2.4}>
            {renderAnimeCard(data, props)}
          </Grid>
        ))}
    </Grid>
  )
};

AnimeGrid.defaultProps = {
  animeList: [],
  withRemove: false,
  handleRemove: () => { },
  withChecked: false,
  handleCheck: () => { },
  checkedList: []
};

export default AnimeGrid;
