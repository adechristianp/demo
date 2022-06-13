import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  typography: {
    h3: {
      fontSize: '0.8rem',
      '@media (min-width:600px)': {
        fontSize: '1.2rem',
      }
    },
    h2: {
      fontSize: '2rem',
      '@media (min-width:600px)': {
        fontSize: '3rem',
      }
    }
  },
  palette: {
    primary: {
      main: '#5b5b5b',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;