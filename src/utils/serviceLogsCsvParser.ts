import type { ServiceLogFormValues, ServiceType } from '@type/serviceLog';

const REQUIRED_HEADERS: Array<keyof ServiceLogFormValues> = [
  'providerId',
  'serviceOrder',
  'carId',
  'odometer',
  'engineHours',
  'startDate',
  'endDate',
  'type',
  'serviceDescription',
];

const VALID_TYPES: ServiceType[] = ['planned', 'unplanned', 'emergency'];

const splitCsvLine = (line: string): string[] => {
  const cells: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && next === '"' && inQuotes) {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      cells.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
};

const normalizeHeader = (header: string): string => header.trim();

const isValidDate = (date: string): boolean => /^\d{4}-\d{2}-\d{2}$/.test(date);

interface CsvParseResult {
  rows: ServiceLogFormValues[];
  errors: string[];
}

export const parseServiceLogsCsv = (content: string): CsvParseResult => {
  const lines = content
    .replace(/\r/g, '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) {
    return { rows: [], errors: ['CSV file is empty.'] };
  }

  const headerLine = splitCsvLine(lines[0]).map(normalizeHeader);
  const missingHeaders = REQUIRED_HEADERS.filter((header) => !headerLine.includes(header));
  if (missingHeaders.length) {
    return {
      rows: [],
      errors: [`Missing required headers: ${missingHeaders.join(', ')}`],
    };
  }

  const headerIndex = Object.fromEntries(headerLine.map((name, index) => [name, index]));

  const rows: ServiceLogFormValues[] = [];
  const errors: string[] = [];

  for (let rowIndex = 1; rowIndex < lines.length; rowIndex += 1) {
    const line = lines[rowIndex];
    const cells = splitCsvLine(line);
    const read = (key: keyof ServiceLogFormValues): string => cells[headerIndex[key]] ?? '';

    const providerId = read('providerId');
    const serviceOrder = read('serviceOrder');
    const carId = read('carId');
    const odometer = Number(read('odometer'));
    const engineHours = Number(read('engineHours'));
    const startDate = read('startDate');
    const endDate = read('endDate');
    const type = read('type') as ServiceType;
    const serviceDescription = read('serviceDescription');

    const lineErrors: string[] = [];
    if (!providerId) lineErrors.push('providerId is required');
    if (!serviceOrder) lineErrors.push('serviceOrder is required');
    if (!carId) lineErrors.push('carId is required');
    if (Number.isNaN(odometer) || odometer < 0)
      lineErrors.push('odometer must be a non-negative number');
    if (Number.isNaN(engineHours) || engineHours < 0)
      lineErrors.push('engineHours must be a non-negative number');
    if (!isValidDate(startDate)) lineErrors.push('startDate must be YYYY-MM-DD');
    if (!isValidDate(endDate)) lineErrors.push('endDate must be YYYY-MM-DD');
    if (!VALID_TYPES.includes(type))
      lineErrors.push(`type must be one of: ${VALID_TYPES.join(', ')}`);
    if (!serviceDescription) lineErrors.push('serviceDescription is required');

    if (lineErrors.length) {
      errors.push(`Row ${rowIndex + 1}: ${lineErrors.join('; ')}`);
      continue;
    }

    rows.push({
      providerId,
      serviceOrder,
      carId,
      odometer,
      engineHours,
      startDate,
      endDate,
      type,
      serviceDescription,
    });
  }

  return { rows, errors };
};
