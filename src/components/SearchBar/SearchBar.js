import "./SearchBar.css";
import { Search, MapPin, Moon, History } from "lucide-react";
import { useState } from "react";

function SearchBar({ history, onSearch, onCurrentLocation, onToggleTheme }) {
  const [city, setCity] = useState("");
  const [searching, setSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  async function handleSearch() {
    if (city.trim() === "") return;
    setSearching(true);
    setShowDropdown(false);
    try {
      await onSearch(city.trim());
      setCity("");
    } catch (error) {
      console.error(error);
    } finally {
      setSearching(false);
    }
  }

  const filteredHistory = history.filter(item => 
    item.toLowerCase().includes(city.toLowerCase())
  );

  return (
    <div className="search-container">
      <div className="search-header">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button disabled={searching} onClick={handleSearch}>
            {searching ? "..." : "Search"}
          </button>

          {showDropdown && filteredHistory.length > 0 && (
            <div className="search-dropdown">
              <div className="dropdown-header">Recent Searches</div>
              {filteredHistory.map((item, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => {
                    setCity(item);
                    onSearch(item);
                    setShowDropdown(false);
                  }}
                >
                  <History size={16} className="dropdown-icon" />
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="actions">
          <button className="circle-btn" onClick={onCurrentLocation}><MapPin size={20} /></button>
          <button className="circle-btn" onClick={onToggleTheme}><Moon size={20} /></button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;