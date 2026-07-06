import "./WeatherMetrics.css";
import { Thermometer, Droplets, Wind, Gauge, ArrowUp, ArrowDown } from "lucide-react";

function WeatherMetrics({ weather }) {
  if (!weather) return null;

  return (
    <div className="metrics">
      <div className="metric-card glass">
        <Thermometer size={24} className="metric-icon" />
        <h2>{Math.round(weather.main.feels_like)}°C</h2>
        <p>Feels Like</p>
      </div>
      
      <div className="metric-card glass">
        <Droplets size={24} className="metric-icon" />
        <h2>{weather.main.humidity}%</h2>
        <p>Humidity</p>
      </div>
      
      <div className="metric-card glass">
        <Wind size={24} className="metric-icon" />
        <h2>{weather.wind.speed} m/s</h2>
        <p>Wind Speed</p>
      </div>
      
      <div className="metric-card glass">
        <Gauge size={24} className="metric-icon" />
        <h2>{weather.main.pressure} hPa</h2>
        <p>Pressure</p>
      </div>
      
      <div className="metric-card glass">
        <ArrowUp size={24} className="metric-icon" />
        <h2>{Math.round(weather.main.temp_max)}°C</h2>
        <p>Max Temp</p>
      </div>
      
      <div className="metric-card glass">
        <ArrowDown size={24} className="metric-icon" />
        <h2>{Math.round(weather.main.temp_min)}°C</h2>
        <p>Min Temp</p>
      </div>
    </div>
  );
}

export default WeatherMetrics;