import { compose, withProps } from "recompose";
import { selectState, selectAnimeById } from "../../reducer/collection.slice";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import AnimeCollection from "./AnimeCollection.component";

const AnimeCollectionContainer = props => <AnimeCollection {...props} />

const useAppState = (props) => {
  const { router: { query } } = props
  const { collectionList, animeCollection } = useAppSelector(selectState);
  const animes = useAppSelector(selectAnimeById(query.id))
  const dispatch = useAppDispatch();

  return {
    animes,
    collectionList,
    allAnimeCollection: animeCollection,
    dispatch
  }
};

export default compose(
  withProps(useAppState)
)(AnimeCollectionContainer);