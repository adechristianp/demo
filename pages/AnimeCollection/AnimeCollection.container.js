import { compose, withProps } from "recompose";
import { selectState, selectAnimeByCollection } from "../../reducer/collection.slice";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import AnimeCollection from "./AnimeCollection.component";

const AnimeCollectionContainer = props => <AnimeCollection {...props} />

const useAppState = (props) => {
  const { router: { query } } = props
  const { collectionList, animeCollection } = useAppSelector(selectState);
  const animes = useAppSelector(selectAnimeByCollection(query.collection))
  const dispatch = useAppDispatch();

  return {
    collectionList,
    animeCollection,
    dispatch
  }
};

export default compose(
  withProps(useAppState)
)(AnimeCollectionContainer);