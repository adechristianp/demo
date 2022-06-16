/** @jsxImportSource @emotion/react */
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

import { AniToolBar } from "../../components";
import Link from 'next/link';

const CollectionList = (props) => {
  const { router, collectionList, animeCollection, dispatch } = props;

  return (
    <div>
      <AniToolBar hasBackButton>
        <Typography variant='h3'>Collection List</Typography>
      </AniToolBar>
      <div css={{ padding: 16, marginTop: 40 }}>
        <List>
          {
            collectionList.map((data, i) => (
              <Link
                key={i}
                href={{
                  pathname: '/AnimeCollection',
                  query: {
                    collection: data
                  }
                }}
              >
                <ListItem disablePadding >
                  <ListItemButton>
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary={data} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))
          }
        </List>
      </div>
    </div >
  )
};

export default CollectionList;
