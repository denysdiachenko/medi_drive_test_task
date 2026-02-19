import { describe, expect, it } from 'vitest';
import {
  clearAllDrafts,
  createDraft,
  draftsReducer,
  setActiveDraft,
  upsertActiveDraft,
} from '../../src/store/slices/draftsSlice';
import type { ServiceLogFormValues } from '../../src/types/serviceLog';

const baseValues: ServiceLogFormValues = {
  providerId: 'P-1',
  serviceOrder: 'SO-1',
  carId: 'CAR-1',
  odometer: 1200,
  engineHours: 50,
  startDate: '2026-02-19',
  endDate: '2026-02-20',
  type: 'planned',
  serviceDescription: 'Regular maintenance service',
};

describe('draftsSlice', () => {
  it('creates a draft and sets it active', () => {
    const state = draftsReducer(undefined, createDraft(baseValues));

    expect(state.activeDraftId).toBeTruthy();
    const activeDraftId = state.activeDraftId;
    if (!activeDraftId) {
      throw new Error('Expected activeDraftId to be set');
    }
    expect(state.items[activeDraftId]).toMatchObject(baseValues);
  });

  it('upserts into active draft instead of creating a new one', () => {
    const created = draftsReducer(undefined, createDraft(baseValues));
    const activeId = created.activeDraftId;
    if (!activeId) {
      throw new Error('Expected activeDraftId to be set');
    }

    const updated = draftsReducer(
      created,
      upsertActiveDraft({
        ...baseValues,
        odometer: 1300,
      }),
    );

    expect(updated.activeDraftId).toBe(activeId);
    expect(updated.items[activeId].odometer).toBe(1300);
    expect(Object.keys(updated.items)).toHaveLength(1);
  });

  it('can reset active draft and clear all drafts', () => {
    const created = draftsReducer(undefined, createDraft(baseValues));
    const noActive = draftsReducer(created, setActiveDraft(null));
    const cleared = draftsReducer(noActive, clearAllDrafts());

    expect(noActive.activeDraftId).toBeNull();
    expect(cleared.activeDraftId).toBeNull();
    expect(cleared.items).toEqual({});
  });
});
