const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const pad = (value: number): string => String(value).padStart(2, '0');

export const toDateInputValue = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const parseDateInput = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const getToday = (): string => toDateInputValue(new Date());

export const addDays = (dateString: string, days: number): string => {
  const date = parseDateInput(dateString);
  return toDateInputValue(new Date(date.getTime() + days * ONE_DAY_MS));
};

export const getDefaultDates = (): { startDate: string; endDate: string } => {
  const startDate = getToday();
  return {
    startDate,
    endDate: addDays(startDate, 1),
  };
};
