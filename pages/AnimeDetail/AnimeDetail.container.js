import { gql, useQuery } from "@apollo/client";
import { get } from "lodash";
import { useRouter } from "next/router";
import { compose, withProps } from "recompose";
import AnimeDetailComponent from "./AnimeDetail.component";

const AnimeDetailContainer = props => <AnimeDetailComponent {...props} />

const ANIME_DETAIL_Q = gql`
  query Media($id: Int) {
    Media(id: $id) {
      id
      title {
        romaji
      }
      coverImage {
        large
        medium
        color
      }
      bannerImage
      averageScore
      description
      genres
      episodes
      duration
      chapters
      format
      type
      status
    }
  }
`;

const useAnimeDetailQuery = () => {
  const { query, isReady } = useRouter();
  const { data, loading, error } = useQuery(ANIME_DETAIL_Q, {
    variables: {
      id: isReady ? query.id : null
    }
  });
  console.log('data', data);
  return {
    media: get(data, 'Media', null),
    loading,
    error
  }
};

export default compose(
  withProps(useAnimeDetailQuery)
)(AnimeDetailContainer);