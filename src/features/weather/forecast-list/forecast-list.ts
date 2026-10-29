import { Component, input } from '@angular/core';
import { DailyForecast } from '../../../types/weather';
import { WeatherIcon } from '../../../shared/weather-icon/weather-icon';

@Component({
  imports: [WeatherIcon],
  selector: 'app-forecast-list',
  styleUrl: './forecast-list.css',
  templateUrl: './forecast-list.html',
})
export class ForecastList {
  days = input.required<DailyForecast[]>();
}
