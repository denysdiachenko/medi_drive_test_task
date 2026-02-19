export type ServiceType = 'planned' | 'unplanned' | 'emergency';

export interface ServiceLogFormValues {
  providerId: string;
  serviceOrder: string;
  carId: string;
  odometer: number;
  engineHours: number;
  startDate: string;
  endDate: string;
  type: ServiceType;
  serviceDescription: string;
}

export interface ServiceLog extends ServiceLogFormValues {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Draft extends ServiceLogFormValues {
  id: string;
  updatedAt: string;
}

export interface ServiceLogFilters {
  search: string;
  type: ServiceType | 'all';
  startDateFrom: string;
  startDateTo: string;
}
