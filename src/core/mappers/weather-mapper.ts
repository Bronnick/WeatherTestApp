import { DailyForecast, ForecastItem, ForecastRoot, OpenWeatherResponse, Root, WeatherCondition } from '../../types/weather';

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

function toLocal(unixSeconds: number, timezoneOffset: number): Date {
  return new Date((unixSeconds + timezoneOffset) * 1000);
}

function toLocalDate(unixSeconds: number, timezoneOffset: number): string {
  return toLocal(unixSeconds, timezoneOffset).toISOString().slice(0, 10);
}

function distanceFromMidday(item: ForecastItem, timezoneOffset: number): number {
  return Math.abs(toLocal(item.dt, timezoneOffset).getUTCHours() - 12);
}

export function mapForecast(root: ForecastRoot): DailyForecast[] {
  const offset = root.city.timezone;
  const today = toLocalDate(Date.now() / 1000, offset);
  const days = new Map<string, ForecastItem[]>();

  for (const item of root.list) {
    const date = toLocalDate(item.dt, offset);
    if (date === today) continue;

    const items = days.get(date) ?? [];
    items.push(item);
    days.set(date, items);
  }

  return [...days.entries()].slice(0, 5).map(([date, items]) => {
    const midday = items.reduce((best, item) =>
      distanceFromMidday(item, offset) < distanceFromMidday(best, offset) ? item : best
    );
    const current = midday.weather[0];
    const utcDate = new Date(`${date}T00:00:00Z`);

    return {
      day: utcDate.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }),
      date: utcDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', timeZone: 'UTC' }),
      condition: toCondition(current?.main ?? ''),
      description: current?.description ?? '',
      tempMin: Math.round(Math.min(...items.map(i => i.main.temp_min))),
      tempMax: Math.round(Math.max(...items.map(i => i.main.temp_max))),
    };
  });
}
