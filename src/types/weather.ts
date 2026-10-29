export type WeatherCondition = 'clear' | 'clouds' | 'rain' | 'snow';

export type Weather = {
  city: string;
  country: string;
  condition: WeatherCondition;
  description: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
};
