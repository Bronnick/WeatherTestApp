import { Component, input } from '@angular/core';
import { WeatherCondition } from '../../types/weather';

@Component({
  selector: 'app-weather-icon',
  templateUrl: './weather-icon.html',
})
export class WeatherIcon {
  condition = input.required<WeatherCondition>();
}
