import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ServiceLog, ServiceLogFormValues } from '@type/serviceLog';

interface ServiceLogsState {
  items: ServiceLog[];
}

const initialState: ServiceLogsState = {
  items: [],
};

export const serviceLogsSlice = createSlice({
  name: 'serviceLogs',
  initialState,
  reducers: {
    createServiceLog: (state, action: PayloadAction<ServiceLogFormValues>) => {
      const now = new Date().toISOString();
      state.items.unshift({
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      });
    },
    updateServiceLog: (
      state,
      action: PayloadAction<{ id: string; changes: ServiceLogFormValues }>,
    ) => {
      const target = state.items.find((log) => log.id === action.payload.id);
      if (!target) {
        return;
      }
      Object.assign(target, action.payload.changes, { updatedAt: new Date().toISOString() });
    },
    deleteServiceLog: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((log) => log.id !== action.payload);
    },
    createServiceLogsBulk: (state, action: PayloadAction<ServiceLogFormValues[]>) => {
      const now = new Date().toISOString();
      const nextLogs = action.payload.map((values) => ({
        ...values,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      }));
      state.items = [...nextLogs, ...state.items];
    },
  },
});

export const { createServiceLog, updateServiceLog, deleteServiceLog, createServiceLogsBulk } =
  serviceLogsSlice.actions;
export const serviceLogsReducer = serviceLogsSlice.reducer;
