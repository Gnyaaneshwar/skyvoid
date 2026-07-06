import { useState, useEffect } from "react";
import "./Header.css";
import { Cloud } from "lucide-react";
import SearchBar from "../SearchBar/SearchBar";

function Header({ history, onSearch, onCurrentLocation, onToggleTheme }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="header">
      
     {/* 1. LOGO SECTION */}
      <div className="logo-wrapper">
        <div className="logo-text-wrapper">
          <h1>
            SKYVOID
            <Cloud className="logo-cloud" size={48} strokeWidth={1.5} />
          </h1>
          {/* Changed from a generic span to a specific class */}
          <span className="logo-subtitle">WEATHER INTELLIGENCE</span>
        </div>
      </div>
      
      {/* 2. SEARCH BAR SECTION */}
      <div className="search-wrapper">
        <SearchBar
          history={history}
          onSearch={onSearch}
          onCurrentLocation={onCurrentLocation}
          onToggleTheme={onToggleTheme}
        />
      </div>

      {/* 3. REFINED TIMEZONE SECTION */}
      <div className="live-time">
        <span className="date">
          {time.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric"
          })}
        </span>
        <span className="time">
          {time.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
          })}
        </span>
      </div>

    </header>
  );
}

export default Header;