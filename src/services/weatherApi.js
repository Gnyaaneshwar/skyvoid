// Replace the hardcoded key with this:
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentWeather(city) {

  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("City not found");
  }

  return await response.json();
}

export async function getForecast(city) {

  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Forecast not found");
  }

  return await response.json();
}

export async function getCurrentWeatherByCoords(lat, lon) {

  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Location not found");
  }

  return await response.json();
}

export async function getForecastByCoords(lat, lon) {

  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Forecast not found");
  }

  return await response.json();
}

/* ⭐ NEW */

export async function getAirQuality(lat, lon) {

  const response = await fetch(
    `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("AQI not found");
  }

  return await response.json();
}