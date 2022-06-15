import { compose, withProps } from "recompose";
import { selectState } from "../../reducer/collection.slice";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import AnimeCollection from "./AnimeCollection.component";

const AnimeCollectionContainer = props => <AnimeCollection {...props} />

const useAppState = () => {
  const { collectionList, animeCollection } = useAppSelector(selectState);
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