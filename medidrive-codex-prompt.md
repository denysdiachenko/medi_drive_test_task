# MediDrive — Codex Implementation Prompt

You are a senior React + TypeScript engineer.  
Implement a production-quality solution for the following test task.

Focus on:

- clean architecture
- maintainable code
- strong typing
- good UX
- scalable state management
- best practices

Explain your architectural decisions briefly and generate full working code.

---

# Task: MediDrive — Service Logs Management Page

## Tech Stack (must use)

- React
- TypeScript
- Redux Toolkit (for state management)
- redux-persist (for persistence)
- React Hook Form (form management)
- Yup (validation)
- MUI (UI components)
- CSS-in-JS styling approach

---

# Feature Requirements

## 1. Service Log Creation Form

### Form Fields

Create a form with the following fields:

- `providerId: string`
- `serviceOrder: string`
- `carId: string`
- `odometer: number` (mileage in miles)
- `engineHours: number`
- `startDate: string`
- `endDate: string`
- `type: "planned" | "unplanned" | "emergency"`
- `serviceDescription: string`

---

## Form Behavior

### Draft system

- User can create service log drafts.
- Draft data auto-saves on every form change.
- Draft must persist after page reload.
- Use Redux Toolkit + redux-persist.

### Default values

- `startDate` = current date.
- `endDate` = next day.
- When `startDate` changes → automatically update `endDate` to +1 day.

### Validation

Use Yup schema validation:

- required fields
- correct formats
- numeric validation where needed

### Saving status UI

Show:

- `"Saving..."` while auto-saving
- `"Draft saved"` after success
- visual indicator (checkmark) if draft saved

---

## Main Actions (buttons)

Implement:

- Create Draft
- Delete Draft
- Clear All Drafts
- Create Service Log (submit final record)

---

# 2. Display Service Logs

## Table Requirements

- Display logs in table format (use MUI table).
- Implement search by key fields.
- Implement filtering.

### Filters

- `startDate` range
- `type` (planned, unplanned, emergency)

---

# 3. Editing and Deleting Service Logs

- Edit service log via dialog modal.
- Delete existing service log.

---

# Architecture Requirements

## State Management

Use Redux Toolkit:

- slice for drafts
- slice for service logs
- selectors
- async logic if needed
- persist configuration

---

## Code Quality

- strongly typed TypeScript interfaces
- reusable components
- clear folder structure
- separation of concerns
- form schema separated from UI
- no unnecessary re-renders
- scalable architecture

---

## UI Requirements

- Use MUI components
- CSS-in-JS styling
- clean UX
- loading/saving indicators
- responsive layout

---

# Bonus (encouraged)

If possible, also implement:

- improved UX suggestions
- additional helpful features
- performance optimizations
- architecture improvements

Explain any extra improvements.

---

# Output Requirements

Provide:

1. Folder structure
2. Architecture explanation
3. Type definitions
4. Redux slices
5. Persist setup
6. Form implementation
7. Validation schema
8. Table + filters
9. Edit dialog
10. Example usage

Write production-ready code.
