/** @jsxImportSource @emotion/react */
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Toolbar,
  Typography,
  Rating,
  InputBase,
  IconButton
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';

import { ToolBar as AniToolBar, Pagination } from '../../components'

const renderAnimeCard = (data) => {
  const { id, title, coverImage, averageScore } = data;
  const rating = averageScore / 20;

  return (
    <Card css={{ maxWidth: 400 }}>
      <CardActionArea>
        <Link
          href={{
            pathname: '/AnimeDetail',
            query: {
              id: id
            }
          }}>
          <CardContent css={{ alignContent: 'center', padding: 0 }}>
            <Image
              alt='pokemon'
              src={coverImage.large}
              layout='intrinsic'
              width={400}
              height={400}
            />
            <div css={{ minHeight: 50, padding: 10 }}>
              <Typography gutterBottom variant="h3" component="div" noWrap>
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

const useAnimesEffect = ({ pageList }, setAnimes) => {
  useEffect(() => {
    setAnimes(pageList);
    // setPages(pageInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageList]);
};

const AnimeList = (props) => {
  const { loading, pageList, pageInfo, fetchMore } = props;
  const [animes, setAnimes] = useState(pageList);
  const [page, setPage] = useState(1);

  useAnimesEffect(props, setAnimes);

  const handlePageChange = async (event, value) => {
    const { data: { Page: { media } } } = await fetchMore({
      variables: { page: value, perPage: 12 }
    });

    setPage(value);
    setAnimes(media);
  };

  if (loading) return <div>loading...</div>

  if (animes.length === 0) return <div>No Data</div>

  return (
    <div>
      <AniToolBar {...props}>
        <Toolbar css={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Ani-animo
          </Typography>
          <div css={{ display: 'flex', justifyContent: 'space-between', }}>
            <InputBase
              css={{ marginLeft: 10 }}
              placeholder="search your animo"
            />
            <IconButton type="submit" css={{ p: 10 }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AniToolBar>
      <Grid container spacing={3} css={{ padding: 20, marginTop: 30 }}>
        {animes.map((data, i) => (
          <Grid item key={i} xs={6} md={4} lg={3} offset={2}>
            {renderAnimeCard(data)}
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={pageInfo.lastPage}
        page={page}
        handlePageChange={handlePageChange}
      />
    </div >
  )
};

export default AnimeList;