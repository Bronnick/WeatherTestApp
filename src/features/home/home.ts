import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { OpenWeatherResponse } from '../../types/weather';
import { WeatherCard } from '../weather/weather-card/weather-card';
import { WeatherService } from '../../core/services/weather-service';

@Component({
  imports: [WeatherCard, FormsModule],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  protected weatherService = inject(WeatherService)
  protected city = ''
  protected weather = signal<OpenWeatherResponse | null>(null)
  protected loading = signal(false)
  protected error = signal<string | null>(null)

  getWeather() {
    const city = this.city.trim()
    if (!city) return

    this.loading.set(true)
    this.error.set(null)

    this.weatherService.getCurrentWeather({ city, units: 'metric' }).subscribe({
      next: weather => {
        this.weather.set(weather)
        this.loading.set(false)
      },
      error: (err: HttpErrorResponse) => {
        this.weather.set(null)
        this.error.set(err.status === 404 ? `City "${city}" not found` : 'Could not load the weather. Try again later.')
        this.loading.set(false)
      }
    })
  }
}
