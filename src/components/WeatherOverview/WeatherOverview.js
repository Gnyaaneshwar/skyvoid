import "./WeatherOverview.css";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";

function WeatherOverview({ weather, addFavorite }) {
  // Add a ticking state here so the badge stays perfectly in sync with the header
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!weather) {
    return (
      <section className="weather-overview glass">
        <div className="empty-state">
          <h2>Search a city</h2>
          <p>Start exploring live weather around the world.</p>
        </div>
      </section>
    );
  }

  // Format the live time for the badge using the target city's timezone
  const currentCityTime = new Date(now + weather.timezone * 1000).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit"
  });

  // Format Sunrise and Sunset timestamps
  const formatCityTime = (timestamp) => {
    return new Date((timestamp + weather.timezone) * 1000).toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <section className="weather-overview glass">
      <div className="weather-top">
        <div className="today-badge">
          <span className="live-dot"></span>TODAY
        </div>
        <div className="weather-actions">
          <span className="time">{currentCityTime}</span>
          <div className="separator"></div>
          <button className="favorite-btn" onClick={addFavorite} title="Add to Favorites">
            <Star size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
      
      <div className="weather-content">
        <div className="weather-left">
          <img
            className="weather-image"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
        <div className="weather-right">
          <h1>{Math.round(weather.main.temp)}°</h1>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <span className="feels">Feels Like {Math.round(weather.main.feels_like)}°</span>
        </div>
      </div>
      
      <div className="weather-bottom">
        <div>
          <h4>Sunrise</h4>
          <p>{formatCityTime(weather.sys.sunrise)}</p>
        </div>
        <div>
          <h4>Sunset</h4>
          <p>{formatCityTime(weather.sys.sunset)}</p>
        </div>
      </div>
    </section>
  );
}

export default WeatherOverview;