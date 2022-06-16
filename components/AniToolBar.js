/** @jsxImportSource @emotion/react */

import React from 'react';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import ArrowBack from "@mui/icons-material/ArrowBack";
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';

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

const ToolBar = (props) => {
  const { hasBackButton, title } = props;
  const { back } = useRouter();

  return (
    <ElevationScroll {...props}>
      <AppBar css={{
        backgroundColor: 'white',
        color: 'black',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 75,
        padding: 10
      }}>
        {hasBackButton && <ArrowBack onClick={() => back()} />}
        {title && <Typography css={{ marginLeft: 20 }} variant="h4">{title}</Typography>}
        {props.children}
      </AppBar>
    </ElevationScroll>
  )
};

export default ToolBar;