/** @jsxImportSource @emotion/react */
import {
  Typography,
  IconButton
} from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LibraryAddSharpIcon from '@mui/icons-material/LibraryAddSharp';
import FolderCopySharpIcon from '@mui/icons-material/FolderCopySharp';
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp';

import {
  AnimeGrid,
  AniToolBar,
  Pagination,
  AddToCollectionDialog,
  Snackbar,
  config
} from '../../components'

const { snackbarInitialState } = config;
const useAnimesEffect = ({ animeList }, setAnimes) => {
  useEffect(() => {
    setAnimes(animeList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeList]);
};

const renderSnackbar = (snackbar, setSnackbar) => (
  <Snackbar
    show={snackbar.show}
    type={snackbar.type}
    message={snackbar.message}
    onDismiss={() => setSnackbar(snackbarInitialState)}
  />
);

const AnimeList = (props) => {
  const { loading, animeList, pageInfo, fetchMore, animeCollection } = props;

  const [animes, setAnimes] = useState(animeList);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [checkedList, setCheckedList] = useState([]);
  const [withChecked, setWithChecked] = useState(false);
  const [collectionInfo, setCollectionInfo] = useState([]);
  const [snackbar, setSnackbar] = useState(snackbarInitialState);
  const [isLoading, setIsLoading] = useState(false);

  useAnimesEffect(props, setAnimes);

  const handlePageChange = async (e, value) => {
    setIsLoading(true);
    setAnimes([]);
    const { data: { Page: { media } } } = await fetchMore({
      variables: { page: value, perPage: 10 }
    });

    setPage(value);
    setAnimes(media);
    setIsLoading(false);
  };

  const handleCheck = (value, data) => {
    if (value) {
      const arrCollectionInfo = animeCollection.filter(v => v.id === data.id);

      setCheckedList([...checkedList, data]);
      setCollectionInfo([...collectionInfo, ...arrCollectionInfo]);
    } else {
      const arrCollectionInfo = collectionInfo.filter(v => v.id !== data.id);
      const arrCheckedList = checkedList.filter(v => v.id !== data.id);

      setCheckedList(arrCheckedList);
      setCollectionInfo(arrCollectionInfo);
    }
  };

  const handleBulkAdd = () => {
    if (withChecked) {
      setCheckedList([]);
    };
    setWithChecked(!withChecked);
  };

  const handleCollect = () => {
    if (checkedList.length === 0) {
      setSnackbar({
        show: true,
        type: 'error',
        message: 'Please choose anime to collect!'
      });
      return;
    }

    setOpen(true);
  };

  return (
    <div css={{ marginTop: 125 }}>
      <AniToolBar title="Ani-Animo" />
      <div css={{ position: 'fixed', zIndex: 10, flex: 1, backgroundColor: 'white', borderRadius: 5, paddingLeft: 10, paddingRight: 5 }}>
        <Link href='/CollectionList'>
          <IconButton>
            <FolderCopySharpIcon />
            <Typography variant="h5" component="div">
              Collection
            </Typography>
          </IconButton>
        </Link>
        <IconButton onClick={handleBulkAdd}>
          <PostAddSharpIcon />
          <Typography variant="h5" component="div">
            {withChecked ? 'Cancel' : 'Bulk Add'}
          </Typography>
        </IconButton>
        {withChecked &&
          <IconButton onClick={handleCollect}>
            <LibraryAddSharpIcon />
            <Typography variant="h5" component="div">
              Collect
            </Typography>
          </IconButton>
        }
      </div>
      <AnimeGrid
        loading={isLoading || loading}
        animeList={animes}
        withChecked={withChecked}
        handleCheck={handleCheck}
        checkedList={checkedList}
      />
      <Pagination
        count={pageInfo.lastPage}
        page={page}
        handlePageChange={handlePageChange}
      />
      <AddToCollectionDialog
        open={open}
        setOpen={setOpen}
        data={checkedList}
        collectionInfo={collectionInfo}
        successCallback={handleBulkAdd}
      />
      {renderSnackbar(snackbar, setSnackbar)}
    </div>
  )
};

AnimeList.defaultProps = {
  loading: false,
  animeList: [],
  pageInfo: {
    count: 0,
    lastPage: 1
  },
  fetchMore: () => { },
  animeCollection: []
}
export default AnimeList;