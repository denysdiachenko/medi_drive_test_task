# MediDrive Service Logs

React + TypeScript application for service log draft management with persisted state and full CRUD flow.

## Stack

- React
- TypeScript
- Redux Toolkit
- redux-persist
- React Hook Form
- Yup
- MUI (CSS-in-JS via `sx`)
- Vite

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Test

```bash
npm run test
```

## Biome

```bash
npm run biome:check
npm run biome:lint
npm run biome:format
```

## CSV Import

- Download template: `/example.csv`
- Fill rows with your data and import via `Service Logs -> Import CSV`.

## Path Aliases

- `@/*` -> `src/*`
- `@component/*` -> `src/components/*`
- `@store/*` -> `src/store/*`
- `@provider/*` -> `src/providers/*`
- `@utils/*` -> `src/utils/*`
- `@type/*` -> `src/types/*`
- `@validation/*` -> `src/validation/*`
- `@asset/*` -> `src/assets/*`

## Project Structure

```text
src/
  store/
    store.ts
    hooks.ts
    slices/
      draftsSlice.ts
      serviceLogsSlice.ts
    selectors/
      draftsSelectors.ts
      serviceLogsSelectors.ts
  providers/
    AppProviders.tsx
  components/
    StatusChip/
      StatusChip.tsx
    ServiceLogForm/
      ServiceLogForm.tsx
    ServiceLogs/
      ServiceLogsTable.tsx
      EditServiceLogDialog.tsx
  validation/
    serviceLogSchema.ts
  types/
    serviceLog.ts
  utils/
    dateUtils.ts
    serviceLogsCsvParser.ts
  App.tsx
  main.tsx
```
