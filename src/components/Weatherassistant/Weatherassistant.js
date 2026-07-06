import "./Weatherassistant.css";
import { Bot, ThermometerSun, Wind, CloudRain, Snowflake, Info } from "lucide-react";

function WeatherAssistant({ weather, aqi }) {
  if (!weather) return null;

  // Dynamically generate tips based on live weather data
  const getTips = () => {
    const tips = [];
    const temp = weather.main.temp;
    const windSpeed = weather.wind.speed;
    const condition = weather.weather[0].main.toLowerCase();

    // Heat or Cold warnings
    if (temp >= 30) {
      tips.push({ text: "Warm weather today. Light clothing is recommended.", icon: ThermometerSun, color: "#FFD54F" });
    } else if (temp <= 10) {
      tips.push({ text: "It's quite cold out. Make sure to bundle up!", icon: Snowflake, color: "#93C5FD" });
    }

    // Wind warnings
    if (windSpeed > 10) {
      tips.push({ text: "Strong winds expected. Secure loose belongings.", icon: Wind, color: "#A7F3D0" });
    }

    // Rain warnings
    if (condition.includes("rain") || condition.includes("drizzle")) {
      tips.push({ text: "Rain expected. Don't forget your umbrella!", icon: CloudRain, color: "#60A5FA" });
    }

    // Default fallback if weather is perfectly normal
    if (tips.length === 0) {
      tips.push({ text: "Conditions are clear. Great day to be outside!", icon: Info, color: "#58E1FF" });
    }

    // Limit to 2 tips so it fits perfectly in the Bento box
    return tips.slice(0, 2);
  };

  const tips = getTips();

  return (
    <section className="assistant glass">
      <div className="assistant-header">
        <Bot size={22} />
        <h2>SKYVOID AI</h2>
      </div>
      
      <div className="assistant-body">
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <div key={index} className="assistant-tip">
              {/* Dynamic Icon Wrapper */}
              <div 
                className="tip-icon" 
                style={{ color: tip.color, background: `${tip.color}20` }}
              >
                <Icon size={16} strokeWidth={2.5} />
              </div>
              <p>{tip.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WeatherAssistant;