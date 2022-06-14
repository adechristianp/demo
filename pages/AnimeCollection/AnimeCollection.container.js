import { compose } from "recompose";
import AnimeCollection from "./AnimeCollection.component";

const AnimeCollectionContainer = props => <AnimeCollection {...props} />

export default compose(

)(AnimeCollectionContainer);