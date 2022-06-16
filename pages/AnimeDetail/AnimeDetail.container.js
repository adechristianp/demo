import { gql, useQuery } from "@apollo/client";
import { get } from "lodash";
import { useRouter } from "next/router";
import { compose, withProps } from "recompose";
import { selectState } from "../../reducer/collection.slice";
import { useAppSelector } from "../../reducer/hooks";
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

  return {
    media: get(data, 'Media', null),
    loading,
    error
  }
};

const useAppState = (props) => {
  const { collectionList, animeCollection } = useAppSelector(selectState);

  return {
    collectionList,
    animeCollection,
  }
};

export default compose(
  withProps(useAppState),
  withProps(useAnimeDetailQuery)
)(AnimeDetailContainer);