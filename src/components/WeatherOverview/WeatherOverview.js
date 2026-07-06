import "./WeatherOverview.css";
import { Star } from "lucide-react";

function WeatherOverview({ weather, addFavorite }) {
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

  return (
    <section className="weather-overview glass">
      <div className="weather-top">
        <div className="today-badge">
          <span className="live-dot"></span>TODAY
        </div>
        <div className="weather-actions">
          <span className="time">
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
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
          <p>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
        </div>
        <div>
          <h4>Sunset</h4>
          <p>{new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
        </div>
      </div>
    </section>
  );
}

export default WeatherOverview;