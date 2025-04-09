import React from 'react';
import ThemeToggle from './components/ThemeToggle';
import WeatherDashboard from './components/WeatherDashboard';
import './App.css';

function App() {
    return (
        <div className="app">
            <ThemeToggle />
            <WeatherDashboard />
        </div>
    );
}

export default App; 