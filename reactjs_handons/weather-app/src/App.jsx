import { useState } from 'react';

function SearchHistory({ history, onSelect }) {
  if (history.length === 0) return null;
  return (
    <div style={{ marginTop: 12 }}>
      <small>Lịch sử: </small>
      {history.map((item) => (
        <button key={item} onClick={() => onSelect(item)}
          style={{ marginRight: 4, fontSize: 12 }}>
          {item}
        </button>
      ))}
    </div>
  );
}

// WeatherCard — chỉ hiển thị data, không biết fetch là gì
function WeatherCard({ weather }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: 16, marginTop: 16, borderRadius: 8 }}>
      <h2>{weather.name}</h2>
      <p>Nhiệt độ: {weather.temp}°C</p>
      <p>Gió: {weather.wind} km/h</p>
    </div>
  );
}

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [history, setHistory] = useState([]); // lịch sử search

  async function fetchWeatherByName(name) {
    if (!name.trim()) return;

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const geoRes  = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) {
        setError(`Không tìm thấy "${name}"`);
        return;
      }

      const { latitude, longitude, name: cityName } = geoData.results[0];

      const weatherRes  = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        name: cityName,
        temp: weatherData.current.temperature_2m,
        wind: weatherData.current.wind_speed_10m,
      });

      // Thêm vào history, tránh duplicate
      setHistory((prev) => prev.includes(name) ? prev : [name, ...prev]);

    } catch (err) {
      setError('Lỗi kết nối. Thử lại sau.');
    } finally {
      setLoading(false);
    }
  }

  function fetchWeather() {
    fetchWeatherByName(city);
  }

  function handleSelectHistory(item) {
    setCity(item);
    fetchWeatherByName(item); // dùng item trực tiếp, không đọc state city
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') fetchWeather();
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Weather App</h1>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập tên thành phố..."
          style={{ flex: 1, padding: 8, fontSize: 16 }}
        />
        <button onClick={fetchWeather} disabled={loading} style={{ padding: '8px 16px', fontSize: 16 }}>
          {loading ? 'Đang tìm...' : 'Search'}
        </button>
      </div>

      <SearchHistory history={history} onSelect={handleSelectHistory} />

      {loading && <p style={{ color: '#999' }}>Đang tải...</p>}
      {error   && <p style={{ color: 'red' }}>{error}</p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}
