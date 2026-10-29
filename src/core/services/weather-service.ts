import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ForecastRoot, Root, WeatherParams } from '../../types/weather';
import { map } from 'rxjs';
import { mapForecast, mapWeather } from '../mappers/weather-mapper';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private http = inject(HttpClient)

    private baseUrl = environment.apiUrl

    getCurrentWeather(weatherParams: WeatherParams) {
        const httpParams = new HttpParams()
            .set('q', weatherParams.city)
            .set('units', weatherParams.units)
            .set('appid', environment.apiKey)

        return this.http.get<Root>(this.baseUrl + 'weather', {params: httpParams})
            .pipe(map(mapWeather))
    }

    getForecast(weatherParams: WeatherParams) {
        const httpParams = new HttpParams()
            .set('q', weatherParams.city)
            .set('units', weatherParams.units)
            .set('appid', environment.apiKey)

        return this.http.get<ForecastRoot>(this.baseUrl + 'forecast', {params: httpParams})
            .pipe(map(mapForecast))
    }
}
