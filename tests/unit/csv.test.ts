import { describe, expect, it } from 'vitest';
import { parseServiceLogsCsv } from '../../src/utils/serviceLogsCsvParser';

describe('parseServiceLogsCsv', () => {
  it('parses valid csv rows', () => {
    const csv = `providerId,serviceOrder,carId,odometer,engineHours,startDate,endDate,type,serviceDescription
P-1,SO-1,CAR-1,1000,12,2026-02-20,2026-02-21,planned,Regular service`;

    const result = parseServiceLogsCsv(csv);
    expect(result.errors).toHaveLength(0);
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0].type).toBe('planned');
  });

  it('returns header error for missing columns', () => {
    const csv = `providerId,serviceOrder
P-1,SO-1`;
    const result = parseServiceLogsCsv(csv);
    expect(result.rows).toHaveLength(0);
    expect(result.errors[0]).toContain('Missing required headers');
  });

  it('returns row-level validation errors', () => {
    const csv = `providerId,serviceOrder,carId,odometer,engineHours,startDate,endDate,type,serviceDescription
P-1,SO-1,CAR-1,-1,12,2026-02-20,2026-02-21,planned,Desc`;
    const result = parseServiceLogsCsv(csv);
    expect(result.rows).toHaveLength(0);
    expect(result.errors[0]).toContain('odometer must be a non-negative number');
  });
});
