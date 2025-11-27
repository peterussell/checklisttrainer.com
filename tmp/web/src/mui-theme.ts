import { createTheme } from '@mui/material/styles';

const headingBase = { 
  fontFamily: 'Roboto Condensed, sans-serif',
};

const bodyBase = {
  fontFamily: 'IBM Plex Sans, sans-serif',
  fontWeight: 300,
};

export const theme = createTheme({
  typography: {
    h1: {...headingBase},
    h2: {...headingBase},
    h3: {...headingBase},
    h4: {...headingBase},
    h5: {...headingBase},
    h6: {...headingBase},
    body1: {...bodyBase},
    body2: {
      ...bodyBase,
      color: '#666',
    },
    caption: {
      ...bodyBase,
      textTransform: 'uppercase'
    }
  },
});