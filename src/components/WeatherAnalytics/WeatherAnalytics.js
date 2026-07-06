import "./WeatherAnalytics.css";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from "recharts";

// 1. PREMIUM GLASS TOOLTIP COMPONENT
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip glass">
        <p className="tooltip-label">{label}</p>
        <p className="tooltip-temp">{payload[0].value}°C</p>
      </div>
    );
  }
  return null;
};

function WeatherAnalytics({ forecast }) {
  if (!forecast || !forecast.length) {
    return (
      <section className="analytics glass">
        <div className="analytics-header">
          <h2>Weather Analytics</h2>
        </div>
        <div className="analytics-empty">Search a city to view analytics.</div>
      </section>
    );
  }

  // Format data
  const chartData = forecast.map((item) => ({
    day: new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" }),
    temp: Math.round(item.main.temp),
  }));

  return (
    <section className="analytics glass">
      <div className="analytics-header">
        <h2>Weather Analytics</h2>
        <span>Temperature Trend</span>
      </div>
      <div className="chart-container">
        {/* Adjusted margins to perfect the centering without the Y-axis */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 15, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#58E1FF" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#58E1FF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            {/* Extremely subtle horizontal grid only */}
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            
            {/* Sleek X-Axis */}
            <XAxis 
              dataKey="day" 
              stroke="#94A3B8" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fontWeight: 500, fill: '#A5B4C7' }} 
              dy={10} 
            />
            
            {/* Replaced standard tooltip with our Custom Glass Tooltip */}
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: 'rgba(88,225,255,0.2)', strokeWidth: 2, strokeDasharray: '5 5' }} 
            />
            
            {/* Upgraded 'type' to natural for liquid curves, and added activeDot styling */}
            <Area 
              type="natural" 
              dataKey="temp" 
              stroke="#58E1FF" 
              strokeWidth={4} 
              fillOpacity={1} 
              fill="url(#colorTemp)" 
              activeDot={{ r: 6, strokeWidth: 3, stroke: '#07111F', fill: '#58E1FF' }} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default WeatherAnalytics;