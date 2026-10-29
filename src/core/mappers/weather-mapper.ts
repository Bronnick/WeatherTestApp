import { OpenWeatherResponse, Root, WeatherCondition } from '../../types/weather';

function toCondition(main: string): WeatherCondition {
  switch (main) {
    case 'Clear':
      return 'clear';
    case 'Snow':
      return 'snow';
    case 'Rain':
    case 'Drizzle':
    case 'Thunderstorm':
      return 'rain';
    default:
      return 'clouds';
  }
}

export function mapWeather(root: Root): OpenWeatherResponse {
  const current = root.weather[0];

  return {
    city: root.name,
    country: root.sys.country,
    condition: toCondition(current?.main ?? ''),
    description: current?.description ?? '',
    temperature: Math.round(root.main.temp),
    humidity: root.main.humidity,
    windSpeed: root.wind.speed,
  };
}
