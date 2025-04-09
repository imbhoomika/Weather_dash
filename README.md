# Weather Dashboard

A beautiful, responsive weather dashboard built with React and Vite, featuring real-time weather updates, forecasts, and a stunning glass morphism UI design.

![Weather Dashboard Preview](public/landscape-background.jpg)

## Features

- 🌤️ Real-time weather information
- 📱 Fully responsive design
- 🎨 Modern glass morphism UI
- 🌓 Light/Dark mode support
- 🔍 Search location by city name
- 📍 Recent searches history
- 📊 Detailed weather forecasts
- 🌡️ Temperature, humidity, and wind information
- 🎭 Dynamic weather icons
- 🖼️ Beautiful landscape background

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14.0 or higher)
- npm (Node Package Manager)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenWeather API key:
```env
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Environment Variables

- `VITE_WEATHER_API_KEY`: Your OpenWeather API key (Required)

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be available in the `dist` directory.

## Deployment

### Deploying to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

### Deploying to Netlify

1. Create a production build:
```bash
npm run build
```

2. Deploy using Netlify CLI:
```bash
netlify deploy
```

Or connect your GitHub repository to Netlify for automatic deployments.

## Project Structure

```
weather-dashboard/
├── public/
│   └── landscape-background.jpg
├── src/
│   ├── components/
│   │   └── WeatherDashboard/
│   │       ├── WeatherDashboard.jsx
│   │       └── WeatherDashboard.css
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .env
├── index.html
├── package.json
└── vite.config.js
```

## Customization

### Changing the Background

To use a different background image:
1. Place your image in the `public` directory
2. Update the background URL in `src/App.css`:
```css
body::before {
    background-image: url('/your-image.jpg');
}
```

### Modifying Glass Morphism Effects

Adjust the glass effect in `src/components/WeatherDashboard.css`:
```css
.weather-dashboard {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.18);
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Weather data provided by [OpenWeather API](https://openweathermap.org/api)
- Background image sourced from [Unsplash](https://unsplash.com)
- Icons by [Weather Icons](https://erikflowers.github.io/weather-icons/)
