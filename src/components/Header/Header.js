import { useState, useEffect } from "react";
import "./Header.css";
import { Cloud } from "lucide-react";
import SearchBar from "../SearchBar/SearchBar";

function Header({ history, onSearch, onCurrentLocation, onToggleTheme, timezone }) {
  // Use Date.now() to get a pure UTC timestamp in milliseconds
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Check if we have a valid city timezone to apply
  const isTargetZone = timezone !== undefined && timezone !== null;
  
  // Shift the UTC time by the city's exact offset
  const displayDate = isTargetZone ? new Date(now + timezone * 1000) : new Date(now);

  return (
    <header className="header">
      <div className="logo-wrapper">
        <div className="logo-text-wrapper">
          <h1>
            SKYVOID
            <Cloud className="logo-cloud" size={48} strokeWidth={1.5} />
          </h1>
          <span className="logo-subtitle">WEATHER INTELLIGENCE</span>
        </div>
      </div>
      
      <div className="search-wrapper">
        <SearchBar
          history={history}
          onSearch={onSearch}
          onCurrentLocation={onCurrentLocation}
          onToggleTheme={onToggleTheme}
        />
      </div>
      
      <div className="live-time">
        <span className="date">
          {displayDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
            // Force it to read our shifted timestamp as a pure UTC date to prevent local browser overrides
            ...(isTargetZone && { timeZone: "UTC" }) 
          })}
        </span>
        <span className="time">
          {displayDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
            ...(isTargetZone && { timeZone: "UTC" })
          })}
        </span>
      </div>
    </header>
  );
}

export default Header;