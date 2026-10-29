import { Component, computed, input } from '@angular/core';
import { Weather, WeatherCondition } from '../../../types/weather';
import { WeatherIcon } from '../../../shared/weather-icon/weather-icon';

const conditionStyles: Record<WeatherCondition, string> = {
  clear: 'bg-linear-to-br from-amber-300 to-orange-500 text-white',
  clouds: 'bg-linear-to-br from-slate-300 to-slate-500 text-white',
  rain: 'bg-linear-to-br from-slate-600 to-blue-900 text-white',
  snow: 'bg-linear-to-br from-white to-sky-200 text-slate-700',
};

@Component({
  imports: [WeatherIcon],
  selector: 'app-weather-card',
  styleUrl: './weather-card.css',
  templateUrl: './weather-card.html',
})
export class WeatherCard {
  weather = input.required<Weather>();

  protected styles = computed(() => conditionStyles[this.weather().condition]);
}
