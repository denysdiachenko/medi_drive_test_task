import { describe, expect, it } from 'vitest';
import { addDays, toDateInputValue } from '../../src/utils/dateUtils';

describe('date utils', () => {
  it('formats date as YYYY-MM-DD', () => {
    const date = new Date(2026, 1, 19);
    expect(toDateInputValue(date)).toBe('2026-02-19');
  });

  it('adds days without timezone drift', () => {
    expect(addDays('2026-02-19', 1)).toBe('2026-02-20');
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
  });
});
