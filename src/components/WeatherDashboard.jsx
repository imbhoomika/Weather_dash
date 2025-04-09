import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSync, FaCloud, FaSun, FaCloudRain, FaSnowflake, FaCloudShowersHeavy, FaWind } from 'react-icons/fa';
import './WeatherDashboard.css';

const getWeatherIcon = (weatherCode) => {
    // Weather codes from OpenWeather API
    const code = Math.floor(weatherCode / 100);

    switch (code) {
        case 2: // Thunderstorm
            return <FaCloudShowersHeavy className="weather-icon" />;
        case 3: // Drizzle
            return <FaCloudRain className="weather-icon" />;
        case 5: // Rain
            return <FaCloudRain className="weather-icon" />;
        case 6: // Snow
            return <FaSnowflake className="weather-icon" />;
        case 7: // Atmosphere (fog, mist, etc.)
            return <FaCloud className="weather-icon" />;
        case 8: // Clear or Clouds
            return weatherCode === 800 ? <FaSun className="weather-icon" /> : <FaCloud className="weather-icon" />;
        default:
            return <FaCloud className="weather-icon" />;
    }
};

const WeatherDashboard = () => {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [recentSearches, setRecentSearches] = useState(() => {
        const saved = localStorage.getItem('recentSearches');
        return saved ? JSON.parse(saved) : [];
    });

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    const addToRecentSearches = (cityName) => {
        setRecentSearches(prev => {
            const newSearches = [cityName, ...prev.filter(city => city !== cityName)].slice(0, 5);
            localStorage.setItem('recentSearches', JSON.stringify(newSearches));
            return newSearches;
        });
    };

    const fetchWeather = async (cityName) => {
        if (!cityName) return;

        setLoading(true);
        setError('');

        try {
            const [weatherResponse, forecastResponse] = await Promise.all([
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`),
                axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`)
            ]);

            setWeather(weatherResponse.data);
            setForecast(forecastResponse.data);
            addToRecentSearches(cityName);
        } catch (err) {
            setError('City not found. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather(city);
    };

    const handleRecentSearch = (cityName) => {
        setCity(cityName);
        fetchWeather(cityName);
    };

    const handleRefresh = () => {
        if (weather) {
            fetchWeather(weather.name);
        }
    };

    return (
        <motion.div
            className="weather-dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {recentSearches.length > 0 && (
                <motion.div
                    className="recent-searches"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3>Recent Searches</h3>
                    <div className="recent-list">
                        {recentSearches.map((cityName, index) => (
                            <motion.button
                                key={index}
                                onClick={() => handleRecentSearch(cityName)}
                                className="recent-search-item"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {cityName}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}

            {loading && (
                <motion.div
                    className="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="loader"></div>
                    Loading...
                </motion.div>
            )}

            {error && (
                <motion.div
                    className="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {error}
                </motion.div>
            )}

            <AnimatePresence>
                {weather && (
                    <motion.div
                        className="weather-info"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="weather-header">
                            <h2>{weather.name}, {weather.sys.country}</h2>
                            <motion.button
                                className="refresh-button"
                                onClick={handleRefresh}
                                whileHover={{ rotate: 180 }}
                                transition={{ duration: 0.5 }}
                            >
                                <FaSync />
                            </motion.button>
                        </div>
                        <div className="weather-icon-container">
                            {getWeatherIcon(weather.weather[0].id)}
                        </div>
                        <motion.div
                            className="temperature"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            {Math.round(weather.main.temp)}°C
                        </motion.div>
                        <div className="weather-description">
                            {weather.weather[0].description}
                        </div>
                        <div className="weather-details">
                            <div className="detail-item">
                                <FaWind className="detail-icon" />
                                <span>Wind: {weather.wind.speed} m/s</span>
                            </div>
                            <div className="detail-item">
                                <span>Humidity: {weather.main.humidity}%</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {forecast && (
                    <motion.div
                        className="forecast"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3>5-Day Forecast</h3>
                        <div className="forecast-list">
                            {forecast.list
                                .filter((item, index) => index % 8 === 0)
                                .map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="forecast-item"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="forecast-date">
                                            {new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                                        </div>
                                        <div className="forecast-icon">
                                            {getWeatherIcon(item.weather[0].id)}
                                        </div>
                                        <div className="forecast-temp">
                                            {Math.round(item.main.temp)}°C
                                        </div>
                                        <div className="forecast-desc">
                                            {item.weather[0].description}
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default WeatherDashboard; 