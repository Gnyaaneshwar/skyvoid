import "./WeeklyForecast.css";

function WeeklyForecast({ forecast }) {

  if (!forecast.length) {

    return (

      <section className="forecast glass">

        <h2>5 Day Forecast</h2>

        <div className="forecast-empty">

          Search a city to view forecast

        </div>

      </section>

    );

  }

  return (

    <section className="forecast glass">

      <div className="forecast-header">

        <h2>5 Day Forecast</h2>

        <span>Next 5 Days</span>

      </div>

      <div className="forecast-grid">

        {forecast.slice(0,5).map((day)=>(

          <div
            key={day.dt}
            className="forecast-card glass"
          >

            <p className="forecast-day">

              {new Date(day.dt_txt).toLocaleDateString("en-US",{

                weekday:"short"

              })}

            </p>

            <img

              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}

              alt={day.weather[0].description}

            />

            <h3>

              {Math.round(day.main.temp)}°

            </h3>

            <p className="forecast-type">

              {day.weather[0].main}

            </p>

            <div className="forecast-details">

              <div>

                <small>Humidity</small>

                <strong>{day.main.humidity}%</strong>

              </div>

              <div>

                <small>Wind</small>

                <strong>{day.wind.speed} m/s</strong>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}

export default WeeklyForecast;