import { gql, useQuery } from "@apollo/client";
import { compose, withProps } from "recompose";
import AnimeListComponent from "./animeList.component";

const AnimeListContainer = (props) => <AnimeListComponent {...props} />

const ANIMELIST_Q = gql`
  query Page($page: Int!, $perPage: Int!) {
    Page(page: $page, perPage: $perPage) {
      media {
        id
      }
    }
  }
`

const useAnimeListQuery = () => {
  const { data, loading, error } = useQuery(ANIMELIST_Q, {
    variables: {
      page: 1,
      perPage: 10
    }
  });
  // const { loading, error, data, fetchMore, refetch, networkStatus } = useQuery(GET_POKEMONS, {
  //   variables: gqlVariables,
  //   fetchPolicy: 'network-only'
  // });
  console.log('data', data);
  return {
    loading,
    error
  };
}

export default compose(
  withProps(useAnimeListQuery)
)(AnimeListContainer);
