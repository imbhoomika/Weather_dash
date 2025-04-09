import { useState } from 'react'
import './App.css'
import WeatherDashboard from './components/WeatherDashboard'
import ThemeToggle from './components/ThemeToggle'

// Main App component that manages theme state and layout
function App() {
    // State for managing light/dark theme
    const [isDarkMode, setIsDarkMode] = useState(false)

    // Toggle theme function
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
        // Update root class for theme switching
        document.documentElement.classList.toggle('dark')
    }

    return (
        // Main container with theme-aware styling
        <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
            {/* Theme toggle button component */}
            <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />

            {/* Weather dashboard main component */}
            <WeatherDashboard />
        </div>
    )
}

export default App 