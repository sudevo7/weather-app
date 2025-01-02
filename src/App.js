import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "6a5fb194618b1171973fa4be0ab803e1"; 

  const handleSearch = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData(null);
    }
  };

  return (
    <div className="app-container">
      <div className="search-section">
        <h1 className="app-title">🌤️ Weather Finder</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter city name."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>

      {weatherData && (
        <div className="weather-card">
          <h2 className="city-name">
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <div className="weather-info">
            <p className="temp">
              🌡️ {weatherData.main.temp}°C
            </p>
            <p className="description">
              🌥️ {weatherData.weather[0].description}
            </p>
            <p className="humidity">
              💧 Humidity: {weatherData.main.humidity}%
            </p>
            <p className="wind">
              🌬️ Wind Speed: {weatherData.wind.speed} m/s
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
