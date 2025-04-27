# Local Event Finder

A React application for discovering events in Kenyan cities like Nairobi, Mombasa, and more.

## Features

- **Event Discovery**: Browse through a comprehensive list of events in different Kenyan cities
- **Search **: Find events by keyword, category, city, or date range
- **Event Details**: View detailed information about events, including date, venue, organizer, and ticket information
- **Responsive Design**: Fully responsive UI that works on desktop and mobile devices
- **Mock & Real Data**: Support for both mock data and integration with the EventBrite API

## Technologies Used

- React.js
- React Router for navigation
- Context API for state management
- Styled Components for component styling
- Tailwind CSS for utility classes
- Axios for API requests
- EventBrite API integration

## Project Structure

```
src/
├── assets/        # Images and static assets
├── components/    # Reusable UI components
│   ├── common/    # Common UI components (Header, Footer, etc.)
│   └── events/    # Event-specific components
├── contexts/      # React context providers
├── data/          # Mock data and constants
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── services/      # API services
└── utils/         # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/local-event-finder.git
   cd local-event-finder
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Configure environment variables
   - Copy `.env.example` to `.env`
   - Add your EventBrite API key if you want to use the real API
   ```
   cp .env.example .env
   ```

4. Start the development server
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser

## API Configuration

By default, the application uses mock data. To connect to the EventBrite API:

1. Get an API key from [EventBrite Developer](https://www.eventbrite.com/platform/api)
2. Update the `.env` file with your API key
3. Set `REACT_APP_USE_MOCK_DATA=false` in the `.env` file

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

