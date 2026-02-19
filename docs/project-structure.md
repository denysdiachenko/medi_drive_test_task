# Project Tree

```text
.
├── .env.example
├── .prettierrc
├── .prettierignore
├── .github/
│   └── workflows/
│       └── ci.yml
├── docs/
│   └── project-structure.md
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── images/
│   ├── components/
│   │   ├── StatusChip/
│   │   │   └── StatusChip.tsx
│   │   ├── ServiceLogForm/
│   │   │   └── ServiceLogForm.tsx
│   │   └── ServiceLogs/
│   │       ├── EditServiceLogDialog.tsx
│   │       └── ServiceLogsTable.tsx
│   ├── providers/
│   │   └── AppProviders.tsx
│   ├── store/
│   │   ├── hooks.ts
│   │   ├── store.ts
│   │   ├── selectors/
│   │   │   ├── draftsSelectors.ts
│   │   │   └── serviceLogsSelectors.ts
│   │   └── slices/
│   │       ├── draftsSlice.ts
│   │       └── serviceLogsSlice.ts
│   ├── types/
│   │   └── serviceLog.ts
│   ├── utils/
│   │   ├── dateUtils.ts
│   │   └── serviceLogsCsvParser.ts
│   ├── validation/
│   │   └── serviceLogSchema.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── theme.ts
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

# Folder Purpose

- `src/providers`: global application providers (Redux/Persist providers, etc.).
- `src/store`: centralized state management (`slices`) and state access (`selectors`).
- `src/validation`: validation schemas isolated from UI components.
- `src/components`: all UI components, including page-level and scenario-specific modules.
- `src/types`: domain interfaces and type definitions.
- `src/utils`: pure utility helpers with no React dependency.
- `src/assets`: static assets (images/icons/fonts).
- `tests`: test layers (`unit`, `integration`, `e2e`).
- `docs`: project documentation.
- `.github/workflows`: CI/CD automation.

# File Rules

- Store `slice` files only in `src/store/slices/*Slice.ts`.
- Store `selector` files only in `src/store/selectors/*Selectors.ts`.
- Store validation schemas (`yup/zod`) only in `src/validation/*Schema.ts`.
- Keep all React components in `src/components`, grouped by domain subfolders.
- Keep domain types in `src/types`; keep date/format utilities in `src/utils`.
- Split tests by type: unit tests in `tests/unit`, integration tests in `tests/integration`, e2e tests in `tests/e2e`.

# Starter Files

- `.env.example`
- `.prettierrc`
- `.prettierignore`
- `.github/workflows/ci.yml`
- `docs/project-structure.md`
- `tests/unit/.gitkeep`, `tests/integration/.gitkeep`, `tests/e2e/.gitkeep`

# Best Practices

- Follow a feature-first approach for UI and a centralized-store approach for global state.
- Do not mix validation/schema logic with UI code.
- Keep imports one-directional: `components -> store/selectors/types/utils`, without cycles.
- Minimize unnecessary re-renders using selectors and memoization for derived data.
- Every new domain entity should include types, a validation schema, and tests.
