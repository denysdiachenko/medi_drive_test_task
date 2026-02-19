import type { ServiceLogFormValues } from '@type/serviceLog';
import * as yup from 'yup';
import { getDefaultDates } from '../utils/dateUtils';

const { startDate, endDate } = getDefaultDates();

export const defaultFormValues: ServiceLogFormValues = {
  providerId: '',
  serviceOrder: '',
  carId: '',
  odometer: 0,
  engineHours: 0,
  startDate,
  endDate,
  type: 'planned',
  serviceDescription: '',
};

export const serviceLogSchema: yup.ObjectSchema<ServiceLogFormValues> = yup
  .object({
    providerId: yup.string().trim().required('Provider ID is required'),
    serviceOrder: yup.string().trim().required('Service order is required'),
    carId: yup.string().trim().required('Car ID is required'),
    odometer: yup
      .number()
      .typeError('Odometer must be a number')
      .min(0, 'Odometer cannot be negative')
      .required('Odometer is required'),
    engineHours: yup
      .number()
      .typeError('Engine hours must be a number')
      .min(0, 'Engine hours cannot be negative')
      .required('Engine hours are required'),
    startDate: yup.string().required('Start date is required'),
    endDate: yup
      .string()
      .required('End date is required')
      .test('is-after-start', 'End date must be after start date', function validate(value) {
        const { startDate: start } = this.parent as ServiceLogFormValues;
        if (!value || !start) {
          return false;
        }
        return new Date(value) > new Date(start);
      }),
    type: yup
      .mixed<ServiceLogFormValues['type']>()
      .oneOf(['planned', 'unplanned', 'emergency'])
      .required(),
    serviceDescription: yup
      .string()
      .trim()
      .required('Service description is required')
      .min(10, 'Min 10 characters'),
  })
  .required();
