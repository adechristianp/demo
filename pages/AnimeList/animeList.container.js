import { gql, useQuery } from "@apollo/client";
import { get } from "lodash";
import { compose, withProps } from "recompose";

import { selectState } from "../../reducer/collection.slice";
import { useAppSelector } from "../../reducer/hooks";

import AnimeListComponent from "./AnimeList.component";

const AnimeListContainer = (props) => <AnimeListComponent {...props} />

const ANIMELIST_Q = gql`
  query Page($page: Int!, $perPage: Int!) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media {
        id
        title {
          romaji
        }
        coverImage {
          large
          medium
          color
        }
        averageScore
      }
    }
  }
`

const useAnimeListQuery = () => {
  const { data, loading, error, fetchMore } = useQuery(ANIMELIST_Q, {
    variables: {
      page: 1,
      perPage: 10
    },
  });

  const animeList = get(data, 'Page.media', []);
  const pageInfo = get(data, 'Page.pageInfo', {});

  return {
    loading,
    error,
    animeList,
    pageInfo,
    fetchMore
  };
};

const useAppState = () => {
  const { animeCollection } = useAppSelector(selectState);

  return {
    animeCollection
  }
};

export default compose(
  withProps(useAnimeListQuery),
  withProps(useAppState)
)(AnimeListContainer);
