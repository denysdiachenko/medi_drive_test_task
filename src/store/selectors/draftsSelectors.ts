import type { RootState } from '../store';

export const selectDraftItems = (state: RootState) => state.drafts.items;

export const selectActiveDraftId = (state: RootState) => state.drafts.activeDraftId;

export const selectActiveDraft = (state: RootState) => {
  const { activeDraftId, items } = state.drafts;
  return activeDraftId ? (items[activeDraftId] ?? null) : null;
};

export const selectDraftsList = (state: RootState) =>
  Object.values(state.drafts.items).sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
