import "./AirQuality.css";

function AirQuality({ aqi }) {

  if (!aqi) {

    return (

      <section className="air-quality glass">

        <h2>Air Quality</h2>

        <div className="aqi-empty">

          Search a city to view air quality

        </div>

      </section>

    );

  }

  const index = aqi.list[0].main.aqi;

  const status = [
    "",
    "Good",
    "Fair",
    "Moderate",
    "Poor",
    "Very Poor",
  ];

  const color = [
    "",
    "#4ADE80",
    "#84CC16",
    "#FACC15",
    "#FB923C",
    "#EF4444",
  ];

  return (

    <section className="air-quality glass">

      <div className="aqi-header">

        <h2>Air Quality</h2>

        <span
          style={{ color: color[index] }}
        >
          {status[index]}
        </span>

      </div>

      <div className="aqi-score">

        <h1
          style={{ color: color[index] }}
        >
          {index}
        </h1>

      </div>

      <div className="aqi-details">

        <div>

          <small>PM2.5</small>

          <strong>

            {aqi.list[0].components.pm2_5.toFixed(1)}

          </strong>

        </div>

        <div>

          <small>PM10</small>

          <strong>

            {aqi.list[0].components.pm10.toFixed(1)}

          </strong>

        </div>

        <div>

          <small>CO</small>

          <strong>

            {aqi.list[0].components.co.toFixed(1)}

          </strong>

        </div>

      </div>

    </section>

  );

}

export default AirQuality;