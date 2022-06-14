/** @jsxImportSource @emotion/react */

import React from 'react';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';


function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const ToolBar = (props) => (
  <ElevationScroll {...props}>
    <AppBar css={{
      backgroundColor: 'white',
      color: 'black',
    }}>
      {props.children}
    </AppBar>
  </ElevationScroll>
)

export default ToolBar;