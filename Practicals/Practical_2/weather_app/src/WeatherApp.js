import React, { useState } from 'react';
import cities from './cities';


function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = '43b2e06b82ee38b443c2418a820b5da6';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  const getWeather = async () => {
    if (city.trim() === '') {
      setMessage('Please enter a city name.');
      setWeatherInfo(null);
      return;
    }
    if (!cities.includes(city)) {
      setMessage('City not found');
      setWeatherInfo(null);
      return;
    }
    setLoading(true);
    setMessage('');
    setWeatherInfo(null);
    try {
      const response = await fetch(apiUrl + '?q=' + city + ',IN&appid=' + apiKey + '&units=metric');
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherInfo({
        temp: data.main.temp,
        description: data.weather[0].description,
        city: data.name,
      });
      setMessage('');
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        setMessage('Network error or CORS issue. Please check your API key and network.');
      } else {
        setMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', backgroundColor: 'red', minHeight: '100vh', padding: '20px' }}>
      <h1>Weather App</h1>
      <div style={{ backgroundColor: 'white', display: 'inline-block', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.3)' }}>
        <input
          type="text"
          placeholder="Enter City Here"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '8px', fontSize: '16px' }}
          list="citiesList"
        />
        <datalist id="citiesList">
          {cities.map((cityName) => (
            <option key={cityName} value={cityName} />
          ))}
        </datalist>
        <button
          onClick={getWeather}
          style={{ marginLeft: '10px', padding: '8px 16px', fontSize: '16px' }}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Click here to Get Weather'}
        </button>
      </div>
      <div style={{ marginTop: '20px', fontSize: '18px', color: 'white' }}>
        {message && <p>{message}</p>}
        {weatherInfo && (
          <p>
            The weather in {weatherInfo.city} is {weatherInfo.temp}°C with {weatherInfo.description}.
          </p>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
