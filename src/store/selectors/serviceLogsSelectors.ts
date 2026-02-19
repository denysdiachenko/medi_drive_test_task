import type { ServiceLog, ServiceLogFilters } from '@type/serviceLog';
import type { RootState } from '../store';

export const selectServiceLogs = (state: RootState) => state.serviceLogs.items;

const includesText = (log: ServiceLog, normalizedQuery: string): boolean => {
  if (!normalizedQuery) {
    return true;
  }
  const haystack = [
    log.providerId,
    log.serviceOrder,
    log.carId,
    log.serviceDescription,
    log.type,
    String(log.odometer),
    String(log.engineHours),
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(normalizedQuery);
};

export const filterLogs = (logs: ServiceLog[], filters: ServiceLogFilters): ServiceLog[] => {
  const normalizedQuery = filters.search.trim().toLowerCase();

  return logs.filter((log) => {
    if (!includesText(log, normalizedQuery)) {
      return false;
    }

    if (filters.type !== 'all' && log.type !== filters.type) {
      return false;
    }

    if (filters.startDateFrom && log.startDate < filters.startDateFrom) {
      return false;
    }

    if (filters.startDateTo && log.startDate > filters.startDateTo) {
      return false;
    }

    return true;
  });
};
