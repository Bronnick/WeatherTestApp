import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { DailyForecast, OpenWeatherResponse, WeatherParams } from '../../types/weather';
import { WeatherCard } from '../weather/weather-card/weather-card';
import { ForecastList } from '../weather/forecast-list/forecast-list';
import { WeatherService } from '../../core/services/weather-service';

@Component({
  imports: [WeatherCard, ForecastList, FormsModule],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  protected weatherService = inject(WeatherService)
  protected city = ''
  protected weather = signal<OpenWeatherResponse | null>(null)
  protected forecast = signal<DailyForecast[]>([])
  protected loading = signal(false)
  protected error = signal<string | null>(null)

  getWeather() {
    const city = this.city.trim()
    if (!city) return

    this.loading.set(true)
    this.error.set(null)

    const params: WeatherParams = { city, units: 'metric' }

    forkJoin({
      weather: this.weatherService.getCurrentWeather(params),
      forecast: this.weatherService.getForecast(params)
    }).subscribe({
      next: ({ weather, forecast }) => {
        this.weather.set(weather)
        this.forecast.set(forecast)
        this.loading.set(false)
      },
      error: (err: HttpErrorResponse) => {
        this.weather.set(null)
        this.forecast.set([])
        this.error.set(err.status === 404 ? `City "${city}" not found` : 'Could not load the weather. Try again later.')
        this.loading.set(false)
      }
    })
  }
}
