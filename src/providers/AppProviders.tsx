import { CircularProgress, Stack } from '@mui/material';
import { persistor, store } from '@store/store';
import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const LoadingState = () => (
  <Stack
    minHeight="100vh"
    alignItems="center"
    justifyContent="center"
  >
    <CircularProgress color="primary" />
  </Stack>
);

export const AppProviders = ({ children }: PropsWithChildren) => (
  <Provider store={store}>
    <PersistGate
      loading={<LoadingState />}
      persistor={persistor}
    >
      {children}
    </PersistGate>
  </Provider>
);
