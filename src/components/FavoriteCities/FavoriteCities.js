import "./FavoriteCities.css";
import { MapPin } from "lucide-react"; 

function FavoriteCities({ favorites, onSearch }) {
  if (!favorites || favorites.length === 0) {
    return (
      <section className="favorite-cities glass">
        <div className="favorite-header">
          <h2>Favorite Cities</h2>
          <span>0 Saved</span>
        </div>
        <div className="favorite-empty">No favorite cities yet.</div>
      </section>
    );
  }

  return (
    <section className="favorite-cities glass">
      <div className="favorite-header">
        <h2>Favorite Cities</h2>
        <span>{favorites.length} Saved</span>
      </div>
      
      <div className="favorite-grid">
        {favorites.map((city, index) => (
          <div 
            key={index} 
            className="favorite-card"
            onClick={() => onSearch(city)}
          >
            <div className="favorite-icon">
              {/* Sleek Lucide React icon instead of an emoji */}
              <MapPin size={18} strokeWidth={2} />
            </div>
            <h3>{city}</h3>
            <p>Tap to view weather</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FavoriteCities;