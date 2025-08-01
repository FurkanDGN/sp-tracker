# Story Points Tracker

A configurable Jira dashboard gadget that visualizes developer story points over time with interactive charts and customizable themes.

## Features

- **Interactive Charts**: Visualize story points data using responsive line charts
- **Flexible Time Periods**: Support for daily, weekly, and monthly views
- **Developer Analytics**: Track individual developer performance over time
- **Configurable Dashboard**: Easy-to-use configuration interface
- **Unassigned Issues**: Optional display of unassigned story points
- **Dark Theme**: Modern dark theme with clean UI
- **Real-time Data**: Fetches live data from Jira using Forge APIs

## Architecture

This project is built as an Atlassian Forge app with a modern React frontend:

### Backend
- **Node.js 20.x** runtime
- **Forge API** for Jira integration
- **Forge Resolver** for backend logic
- REST API integration with Jira

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **AtlasKit** components for consistent Atlassian UI
- **Recharts** for interactive data visualization
- **CSS-in-JS** for styling

## Installation

### Prerequisites
- Node.js 20 or higher
- Atlassian Developer account
- Forge CLI installed globally

```bash
npm install -g @forge/cli
```

### Setup

1. Clone the repository:
```bash
git clone https://github.com/FurkanDGN/sp-tracker.git
cd story-points-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Login to Forge:
```bash
npm run login
```

4. Deploy the app:
```bash
npm run deploy
```

## Development

### Project Structure
```
├── src/
│   ├── backend/           # Forge backend code
│   │   ├── index.js      # Main resolver functions
│   │   └── package.json
│   ├── frontend/         # React frontend
│   │   ├── src/
│   │   │   ├── app/      # Main App component
│   │   │   ├── components/ # Reusable components
│   │   │   ├── edit/     # Configuration interface
│   │   │   ├── view/     # Dashboard view
│   │   │   ├── hooks/    # Custom React hooks
│   │   │   ├── helpers/  # Utility functions
│   │   │   └── types/    # TypeScript type definitions
│   │   └── package.json
│   └── index.js          # Entry point
├── manifest.yml          # Forge app manifest
└── package.json          # Root package.json
```

### Available Scripts

```bash
# Development
npm run start             # Start development server
npm run build            # Build for production
npm run clean            # Clean build artifacts

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run lint:tsc         # TypeScript type checking

# Deployment
npm run deploy           # Deploy to Forge
npm run login            # Login to Forge CLI
```

### Configuration Options

The dashboard gadget supports the following configuration options:

- **Time Period Number**: Number of periods to display (1-999)
- **Time Period Type**: Day, Week, or Month
- **Show Unassigned**: Include unassigned story points in charts

## API Integration

The app integrates with Jira REST API to fetch:
- Issues with story point estimates
- Resolution dates for completed work
- Assignee information
- Custom field data (Story Points - customfield_10016)

### JQL Query Structure
```jql
resolutiondate >= "YYYY-MM-DD" AND 
resolutiondate <= "YYYY-MM-DD" AND 
"Story point estimate" is not EMPTY
```

## Deployment

### Automatic Deployment
The project uses GitHub Actions for automatic deployment:
- **Build Pipeline**: Runs on every push and PR
- **Release Pipeline**: Deploys to production on release creation

### Manual Deployment
```bash
# Build and deploy
npm run deploy

# Install/upgrade in Jira instance
forge install --upgrade
```

## Code Quality

The project maintains high code quality through:

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Run linters on staged files
- **Commitlint**: Conventional commit message format

### Commit Convention
```
type(scope): description

# Examples:
feat: add weekly view support
fix: resolve chart rendering issue
docs: update README with deployment steps
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For issues and questions:
1. Check existing [GitHub Issues](https://github.com/yourusername/story-points-dashboard-gadget/issues)
2. Create a new issue with detailed description
3. Include relevant logs and screenshots

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and changes.
