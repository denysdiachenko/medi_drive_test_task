# Project Structure Prompt Template

Use this prompt in any new project to get a clear folder/file architecture.

```text
You are a Senior Software Architect.
Design a clean, scalable project structure for [TECH STACK].

Requirements:
1. Show a full folder and file tree (from the project root).
2. Explain the purpose of each top-level folder in 1-2 lines.
3. Define clear placement rules: what should be stored where.
4. Provide naming conventions for folders and files.
5. Include a minimal starter file set for quick project bootstrap.
6. Explicitly include sections for:
   - configuration files (.env, tsconfig, eslint, prettier, CI/CD)
   - testing structure (unit, integration, e2e)
   - shared/common modules
   - assets (images, icons, fonts)
   - documentation (README, docs/)
7. Format the response using these exact sections:
   - Project Tree
   - Folder Purpose
   - File Rules
   - Starter Files
   - Best Practices

Project context:
- Project type: [web/mobile/api/fullstack]
- Language: [TS/JS/other]
- Framework: [React/Next.js/NestJS/etc.]
- Team size: [number of developers]
- Scale: [MVP/production/enterprise]
- Special requirements: [monorepo, i18n, DDD, microservices, etc.]
```

