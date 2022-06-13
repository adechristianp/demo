/** @jsxImportSource @emotion/react */
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Toolbar,
  Typography,
  Rating
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';

import { ToolBar as AniToolBar, Pagination } from '../../components'

const useAnimesEffect = (props, setAnimes, setPages) => {
  const { pageList, pageInfo, } = props;

  useEffect(() => {
    setAnimes(pageList);
    setPages(pageInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageList, pageInfo]);
};

const AnimeList = (props) => {
  const { loading, pageList, pageInfo, fetchMore } = props;
  const [animes, setAnimes] = useState(pageList);
  const [pages, setPages] = useState(pageInfo);
  const [page, setPage] = useState(1);

  useAnimesEffect(props, setAnimes, setPages);

  const handlePageChange = async (event, value) => {
    const { data: { Page: { pageInfo, media } } } = await fetchMore({
      variables: { page: value, perPage: 12 }
    });

    setPage(value);
    setAnimes(media);
    setPages(pageInfo);
  };

  if (loading) return <div>loading...</div>

  if (animes.length === 0) return <div>No Data</div>

  return (
    <div>
      <AniToolBar {...props}>
        Card
      </AniToolBar>
      <Toolbar />
      <Grid container spacing={3} css={{ padding: 20 }}>
        {animes.map((data, i) => {
          const { title, coverImage, averageScore } = data;
          const rating = averageScore / 20;

          return (
            <Grid item key={i} xs={6} md={4} lg={3} offset={2}>
              <Card css={{ maxWidth: 400 }}>
                <CardActionArea>
                  <Link href='/AnimeDetail'>
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
            </Grid>
          )
        })}
      </Grid>
      <Pagination
        count={pages.lastPage}
        page={page}
        handlePageChange={handlePageChange}
      />
    </div >
  )
};

export default AnimeList;