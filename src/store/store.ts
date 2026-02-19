import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { draftsReducer } from '@store/slices/draftsSlice';
import { serviceLogsReducer } from '@store/slices/serviceLogsSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  persistReducer,
  persistStore,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  drafts: draftsReducer,
  serviceLogs: serviceLogsReducer,
});

const persistConfig = {
  key: 'medidrive-root',
  storage,
  whitelist: ['drafts', 'serviceLogs'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
