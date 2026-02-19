import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppProviders } from '@provider/AppProviders';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { appTheme } from './theme';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element with id "root" was not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <AppProviders>
        <App />
      </AppProviders>
    </ThemeProvider>
  </React.StrictMode>,
);
