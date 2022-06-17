/** @jsxImportSource @emotion/react */
import {
  Toolbar,
  Typography,
  InputBase,
  IconButton
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';

import { AnimeGrid, AniToolBar, Pagination } from '../../components'

const renderToolbar = (props) => (
  <AniToolBar>
    <Toolbar css={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h5" component="div">
        Ani-animo
      </Typography>
      <div css={{ display: 'flex', justifyContent: 'space-between', }}>
        <Link href='/CollectionList'>
          <IconButton>
            <Typography variant="h5" component="div">
              Collection
            </Typography>
          </IconButton>
        </Link>
        <InputBase
          css={{ marginLeft: 10 }}
          placeholder="search your animo"
          inputProps={{ style: { fontSize: 18 } }}
        />
        <IconButton type="submit" css={{ p: 10 }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </div>
    </Toolbar>
  </AniToolBar>
)

const useAnimesEffect = ({ pageList }, setAnimes) => {
  useEffect(() => {
    setAnimes(pageList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageList]);
};

const AnimeList = (props) => {
  const { loading, pageList, pageInfo, fetchMore } = props;
  const [animes, setAnimes] = useState(pageList);
  const [page, setPage] = useState(1);

  useAnimesEffect(props, setAnimes);

  const handlePageChange = async (e, value) => {
    const { data: { Page: { media } } } = await fetchMore({
      variables: { page: value, perPage: 12 }
    });

    setPage(value);
    setAnimes(media);
  };

  if (loading) return <div>loading...</div>

  if (animes.length === 0) return <div>No Data</div>

  return (
    <div css={{ marginTop: 75 }}>
      {renderToolbar(props)}
      <AnimeGrid animeList={animes} />
      <Pagination
        count={pageInfo.lastPage}
        page={page}
        handlePageChange={handlePageChange}
      />
    </div>
  )
};

export default AnimeList;