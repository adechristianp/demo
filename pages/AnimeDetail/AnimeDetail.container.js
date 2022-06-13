import { compose } from "recompose";
import AnimeDetailComponent from "./AnimeDetail.component";

const AnimeDetailContainer = props => <AnimeDetailComponent {...props} />

export default compose(

)(AnimeDetailContainer);