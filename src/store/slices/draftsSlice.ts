import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Draft, ServiceLogFormValues } from '@type/serviceLog';

interface DraftsState {
  items: Record<string, Draft>;
  activeDraftId: string | null;
}

const initialState: DraftsState = {
  items: {},
  activeDraftId: null,
};

const toDraft = (values: ServiceLogFormValues, existingId?: string): Draft => {
  const id = existingId ?? crypto.randomUUID();
  return {
    ...values,
    id,
    updatedAt: new Date().toISOString(),
  };
};

export const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    createDraft: (state, action: PayloadAction<ServiceLogFormValues>) => {
      const draft = toDraft(action.payload);
      state.items[draft.id] = draft;
      state.activeDraftId = draft.id;
    },
    upsertActiveDraft: (state, action: PayloadAction<ServiceLogFormValues>) => {
      const draft = toDraft(action.payload, state.activeDraftId ?? undefined);
      state.items[draft.id] = draft;
      state.activeDraftId = draft.id;
    },
    setActiveDraft: (state, action: PayloadAction<string | null>) => {
      if (action.payload === null) {
        state.activeDraftId = null;
        return;
      }
      if (state.items[action.payload]) {
        state.activeDraftId = action.payload;
      }
    },
    deleteActiveDraft: (state) => {
      if (!state.activeDraftId) {
        return;
      }
      delete state.items[state.activeDraftId];
      state.activeDraftId = Object.keys(state.items)[0] ?? null;
    },
    clearAllDrafts: (state) => {
      state.items = {};
      state.activeDraftId = null;
    },
  },
});

export const { createDraft, upsertActiveDraft, setActiveDraft, deleteActiveDraft, clearAllDrafts } =
  draftsSlice.actions;

export const draftsReducer = draftsSlice.reducer;
