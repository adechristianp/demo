import { compose, withProps } from "recompose";
import { selectState } from "../../reducer/collection.slice";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import CollectionList from "./CollectionList.component";

const CollectionListContainer = props => <CollectionList {...props} />

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
)(CollectionListContainer);