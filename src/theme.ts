import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#005f73',
      light: '#4f8f9b',
    },
    secondary: {
      main: '#ca6702',
    },
    background: {
      default: '#f4f7f9',
      paper: '#ffffff',
    },
    success: {
      main: '#2a9d8f',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"IBM Plex Sans", "Segoe UI", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: 0.1,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #dbe5ea',
          boxShadow: '0 10px 30px rgba(0, 95, 115, 0.08)',
        },
      },
    },
  },
});
