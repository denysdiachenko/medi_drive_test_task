import { describe, expect, it } from 'vitest';
import { filterLogs } from '../../src/store/selectors/serviceLogsSelectors';
import type { ServiceLog, ServiceLogFilters } from '../../src/types/serviceLog';

const logs: ServiceLog[] = [
  {
    id: '1',
    providerId: 'PROV-1',
    serviceOrder: 'SO-100',
    carId: 'CAR-A',
    odometer: 1000,
    engineHours: 10,
    startDate: '2026-02-10',
    endDate: '2026-02-11',
    type: 'planned',
    serviceDescription: 'Oil change and inspection',
    createdAt: '2026-02-10T10:00:00.000Z',
    updatedAt: '2026-02-10T10:00:00.000Z',
  },
  {
    id: '2',
    providerId: 'PROV-2',
    serviceOrder: 'SO-200',
    carId: 'CAR-B',
    odometer: 2500,
    engineHours: 60,
    startDate: '2026-02-20',
    endDate: '2026-02-21',
    type: 'emergency',
    serviceDescription: 'Emergency brake repair',
    createdAt: '2026-02-20T10:00:00.000Z',
    updatedAt: '2026-02-20T10:00:00.000Z',
  },
];

const defaultFilters: ServiceLogFilters = {
  search: '',
  type: 'all',
  startDateFrom: '',
  startDateTo: '',
};

describe('serviceLogs selectors', () => {
  it('filters by search query', () => {
    const result = filterLogs(logs, { ...defaultFilters, search: 'brake' });
    expect(result.map((x) => x.id)).toEqual(['2']);
  });

  it('filters by type', () => {
    const result = filterLogs(logs, { ...defaultFilters, type: 'planned' });
    expect(result.map((x) => x.id)).toEqual(['1']);
  });

  it('filters by start date range', () => {
    const result = filterLogs(logs, {
      ...defaultFilters,
      startDateFrom: '2026-02-15',
      startDateTo: '2026-02-28',
    });
    expect(result.map((x) => x.id)).toEqual(['2']);
  });
});
