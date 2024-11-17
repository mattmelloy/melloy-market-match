# 📈 Melloy Market Match

## Overview

Melloy Market Match is an interactive web application that simulates a share market game. Players can track their share values, compete on a leaderboard, and visualize their financial progress over time.

## 🌟 Features

- 🏁 Player registration
- 📊 Share value tracking
- 🏆 Real-time leaderboard
- 📈 Historical performance graph
- 💻 Responsive design

## 🛠 Tech Stack

- **Frontend**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase
- **Charting**: Chart.js
- **Testing**: Jest
- **CI/CD**: GitHub Actions

## 📋 Prerequisites

- Node.js (v18 or later)
- npm
- Supabase account

## 🚀 Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/melloy-market-match.git
cd melloy-market-match
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Supabase Configuration

1. Create a new Supabase project
2. Create a table named `market_entries` with these columns:
   - `id`: SERIAL PRIMARY KEY
   - `player_name`: TEXT
   - `share_value`: NUMERIC(10, 2)
   - `created_at`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

3. Copy Supabase project URL and Anon Key

### 4. Environment Configuration

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 How to Play

1. Navigate to the "Update Value" page
2. Enter your name
3. Input your current share value
4. Check the leaderboard to track your progress

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 🔍 Linting and Formatting

```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 🚢 Deployment

- Deploy to Vercel or your preferred platform
- Set environment variables in deployment settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

### Commit Message Convention

- Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

## 📄 License

This project is open-source and available under the MIT License.

## 🐛 Issues

Found a bug? Please open an issue on GitHub with a detailed description.

## 🌐 Deployment Status

[![Continuous Integration](https://github.com/yourusername/melloy-market-match/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/melloy-market-match/actions/workflows/ci.yml)
