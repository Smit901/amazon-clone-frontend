import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      light: '#e6ecfc',
      main: '#142659',
      dark: '#142659',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    error: {
      main: '#ba0f0f',
    }
  },
});

export default theme;
