# Ọmọlúàbí

Ọmọlúàbí is an open-source language learning platform dedicated to preserving and teaching African languages, starting with Yoruba. Inspired by gamified learning experiences, Ọmọlúàbí combines a premium UI with a community-driven content model.

## 🌟 Features

- **Gamified Learning**: Bite-sized lessons, lives, and rewards.
- **Open-Source Content**: All learning material is stored as JSON, allowing for easy community contributions.
- **Modern Tech Stack**: Built with React 18, TypeScript 5, and Vite 6 for high performance.
- **Community-Driven**: Designed for modularity and ease of contribution.

> [!NOTE]
> **Authentication Suspension**: Live Firebase authentication is temporarily suspended in the current build to allow direct access to content without registration.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/okikijesutech/Omoluabi.git
   ```
2. Install dependencies:
   ```bash
   cd Omoluabi
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Architecture

Ọmọlúàbí uses a modern, modular architecture:

- `src/components`: Reusable UI components (PascalCase).
- `src/pages`: Application views and layouts.
- `src/modals`: Interactive modal dialogues.
- `public/content`: The open-source lesson database.

## 🤝 Contributing

We welcome contributions from everyone! Whether you're a developer, a linguist, or a native speaker, you can help us grow.

- **Content**: See [DEVELOPER.md](./DEVELOPER.md) for how to add or improve lessons.
- **Code**: Check our [Issues](https://github.com/okikijesutech/Omoluabi/issues) for bugs and feature requests.

## 📄 License

Code is licensed under [MIT](./LICENSE). Content is licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
