/** @jsxImportSource @emotion/react */

import SearchIcon from '@mui/icons-material/Search';
import { InputBase, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const ToolBar = (props) => (
  <HideOnScroll {...props}>
    <AppBar css={{
      backgroundColor: 'white',
      color: 'black',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    }}>
      <Toolbar css={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          Ani-anime
        </Typography>
        <div css={{ display: 'flex', justifyContent: 'space-between', }}>
          <InputBase
            css={{ marginLeft: 10 }}
            placeholder="find poke monsta"
          />
          <IconButton type="submit" css={{ p: 10 }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  </HideOnScroll>
)

export default ToolBar;