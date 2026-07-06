import { useState, useEffect, useCallback } from "react";
import Lottie from "lottie-react";
import "./App.css";

// Individual Component Imports
import Header from "./components/Header/Header";
import WeatherOverview from "./components/WeatherOverview/WeatherOverview";
import WeatherMetrics from "./components/WeatherMetrics/WeatherMetrics";
import WeatherAnalytics from "./components/WeatherAnalytics/WeatherAnalytics";
import AirQuality from "./components/AirQuality/AirQuality";
import WeatherAssistant from "./components/Weatherassistant/Weatherassistant";
import FavoriteCities from "./components/FavoriteCities/FavoriteCities";
import WeatherCursor from "./components/WeatherCursor"; // 3D Particle system
import weatherLoader from "./assets/lottie/weather-loader.json";

import {
  getCurrentWeather,
  getForecast,
  getCurrentWeatherByCoords,
  getForecastByCoords,
  getAirQuality,
} from "./services/weatherApi";

// Array of motivational quotes
const MOTIVATIONAL_QUOTES = [
  "No matter the weather, bring your own sunshine.",
  "The sky is not the limit, it's just the beginning.",
  "Every storm runs out of rain.",
  "Clear skies are ahead. Keep moving forward.",
  "A smooth sea never made a skilled sailor.",
];

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("dark");
  const [quote] = useState(
    MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]
  );
  
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("history")) || [];
  });
  
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const searchCity = useCallback(async (city) => {
    setLoading(true);
    setError("");
    try {
      const current = await getCurrentWeather(city);
      const forecastData = await getForecast(city);
      const air = await getAirQuality(current.coord.lat, current.coord.lon);
      
      setWeather(current);
      setForecast(forecastData.list.filter((item, index) => index % 8 === 0));
      setAqi(air);
      
      localStorage.setItem("lastCity", city);
      setHistory((prevHistory) => {
        const updatedHistory = [city, ...prevHistory.filter((item) => item.toLowerCase() !== city.toLowerCase())].slice(0, 5);
        localStorage.setItem("history", JSON.stringify(updatedHistory));
        return updatedHistory;
      });
    } catch {
      setError("City not found!");
    } finally {
      setLoading(false);
    }
  }, []);

  // 1. Wrapped in useCallback and updated to auto-save the city
  const currentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLoading(true);
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const current = await getCurrentWeatherByCoords(lat, lon);
          const forecastData = await getForecastByCoords(lat, lon);
          const air = await getAirQuality(lat, lon);
          
          setWeather(current);
          setForecast(forecastData.list.filter((item, index) => index % 8 === 0));
          setAqi(air);

          // Save this detected city so it loads instantly next time
          localStorage.setItem("lastCity", current.name);
        } catch {
          setError("Unable to fetch location.");
        } finally {
          setLoading(false);
        }
      },
      () => setError("Location permission denied. Please search manually.")
    );
  }, []);

  // 2. Updated useEffect to trigger currentLocation if no city is found
  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      searchCity(lastCity);
    } else {
      currentLocation();
    }
  }, [searchCity, currentLocation]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  function addFavorite() {
    if (!weather) return;
    const city = weather.name;
    if (favorites.includes(city)) return;
    const updated = [...favorites, city];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  const weatherClass = weather ? weather.weather[0].main.toLowerCase() : "default";

  return (
    <div className={`app ${theme} ${weatherClass}`}>
      {/* 3D Background layer */}
      <WeatherCursor />

      <Header 
        history={history}
        onSearch={searchCity}
        onCurrentLocation={currentLocation}
        onToggleTheme={toggleTheme}
      />
      
      {loading && (
        <div className="loading glass">
          <Lottie animationData={weatherLoader} loop autoplay className="weather-loader" />
          <p>Fetching Weather...</p>
        </div>
      )}
      
      {error && <div className="error glass">{error}</div>}
      
      <main className="bento-main">
        <div className="bento-col bento-col-left">
          <WeatherOverview weather={weather} addFavorite={addFavorite} />
          <WeatherAnalytics forecast={forecast} />
        </div>
        
        <div className="bento-col bento-col-middle">
          <WeatherMetrics weather={weather} />
        </div>
        
        <div className="bento-col bento-col-right">
          <FavoriteCities favorites={favorites} onSearch={searchCity} />
          <WeatherAssistant weather={weather} aqi={aqi} />
          <AirQuality aqi={aqi} />
        </div>
      </main>
      
      <footer className="quote-strip glass">
        <p>"{quote}"</p>
      </footer>
    </div>
  );
}

export default App;