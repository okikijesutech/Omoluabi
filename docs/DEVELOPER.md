# Developer Guide - Ọmọlúàbí

Welcome to the Ọmọlúàbí developer community! This guide explains the project's architecture and how you can contribute to our open-source learning content.

## Project Vision

Ọmọlúàbí is a community-driven language learning platform, starting with Yoruba. Our goal is to make high-quality language education accessible and open-source.

## Technology Stack

- **Frontend**: React 18, TypeScript 5, Vite 6
- **Styling**: Vanilla CSS
- **Content**: JSON-based lesson system
- **Backend**: Firebase (Auth & Progress), Express (AI Integration)

## Content Architecture

Lessons are stored as JSON files in the `public/content` directory. This allows anyone to contribute lessons via Pull Requests without needing deep technical knowledge of the codebase.

### Directory Structure

```
src/
├── components/     # Reusable UI components (PascalCase)
├── constants/      # App-wide constants and configuration
├── containers/     # Complex page-specific containers
├── context/        # React Context providers (Auth, Lives, etc.)
├── hooks/          # Custom React hooks (Lesson logic, fetching)
├── layout/         # Route layouts (Main, Learn, Literacy)
├── pages/          # Individual page views
└── types/          # Centralized TypeScript interfaces
```

### Lesson Schema

All lessons must adhere to the schema defined in `public/content/schema/lesson.schema.json`.

Key fields:
- `title`: The name of the lesson.
- `difficulty`: beginner, intermediate, advanced.
- `questions`: An array of exercise objects.

### Exercise Types

1. **multiple-choice**: Select the correct answer from options.
2. **translation**: Translate a word or sentence.
3. **identify**: Identify the correct image or word based on a prompt.

## How to Contribute

1. **Propose Content**: Check existing [GitHub Issues](https://github.com/okikijesutech/Omoluabi/issues) for content requests or open a new one.
2. **Create/Edit JSON**: Use our schema to create new lesson files.
3. **Submit PR**: Fork the repo, add your content, and submit a Pull Request.
4. **Verification**: The community will review and verify your contribution.

## Coding Standards

- **PascalCase**: All component and page folders/files must follow PascalCase (e.g., `MyComponent/MyComponent.tsx`).
- **Data-Driven**: Components should be generic and driven by data whenever possible.
- **Type Safety**: Ensure all new features are fully typed with TypeScript.

## License

Ọmọlúàbí is licensed under the MIT License. All learning content is CC-BY-SA 4.0.
