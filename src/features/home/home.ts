import { Component } from '@angular/core';
import { Weather } from '../../types/weather';
import { WeatherCard } from '../weather/weather-card/weather-card';

const sampleWeather: Weather = {
  city: 'London',
  country: 'GB',
  condition: 'clear',
  description: 'clear sky',
  temperature: 24,
  humidity: 48,
  windSpeed: 3.6,
};

@Component({
  imports: [WeatherCard],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  protected weather = sampleWeather;
}
