import { gql, useQuery } from "@apollo/client";
import { get } from "lodash";
import { compose, withProps } from "recompose";
import AnimeListComponent from "./animeList.component";

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
          english
          romaji
        }
        coverImage {
          large
          medium
          color
        }
      }
    }
  }
`

const useAnimeListQuery = () => {
  const { data, loading, error, fetchMore } = useQuery(ANIMELIST_Q, {
    variables: {
      page: 1,
      perPage: 12
    },
  });

  const pageList = get(data, 'Page.media', []);
  const pageInfo = get(data, 'Page.pageInfo', {});

  return {
    loading,
    error,
    pageList,
    pageInfo,
    fetchMore
  };
}

export default compose(
  withProps(useAnimeListQuery)
)(AnimeListContainer);
