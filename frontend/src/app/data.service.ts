import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from './model/city.interface';
import { WeatherResponse } from './model/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'http://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  getCities() {
    return this.http.get<City[]>(this.baseUrl + 'cities');
  }

  getWeatherByCity(cityName: string) {
    return this.http.get<WeatherResponse>(this.baseUrl + "weather/" + cityName);
  }
}
