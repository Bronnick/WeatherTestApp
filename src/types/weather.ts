export type WeatherCondition = 'clear' | 'clouds' | 'rain' | 'snow';
export type Units = 'metric' | 'imperial' | 'standard'

export type OpenWeatherResponse = {
  city: string;
  country: string;
  condition: WeatherCondition;
  description: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
};

export interface Root {
  coord: Coord
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}

export interface Coord {
  lon: number
  lat: number
}

export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level?: number
  grnd_level?: number
}

export interface Wind {
  speed: number
  deg: number
  gust?: number
}

export interface Clouds {
  all: number
}

export interface Sys {
  type?: number
  id?: number
  country: string
  sunrise: number
  sunset: number
}

export type DailyForecast = {
  day: string;
  date: string;
  condition: WeatherCondition;
  description: string;
  tempMin: number;
  tempMax: number;
};

export interface ForecastRoot {
  cod: string
  message: number
  cnt: number
  list: ForecastItem[]
  city: ForecastCity
}

export interface ForecastItem {
  dt: number
  main: Main
  weather: Weather[]
  clouds: Clouds
  wind: Wind
  visibility?: number
  pop: number
  dt_txt: string
}

export interface ForecastCity {
  id: number
  name: string
  coord: Coord
  country: string
  population?: number
  timezone: number
  sunrise: number
  sunset: number
}

export type WeatherParams = {
  city: string;
  units: Units;
}
