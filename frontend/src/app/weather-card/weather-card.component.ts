import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { WeatherResponse } from '../model/weather.interface';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements AfterContentChecked {
  weatherIconUrl = '';
  weatherDescription = '';
  @Input()
  currentWeather: WeatherResponse = {};

  ngAfterContentChecked(): void {
    if (this.currentWeather.weather?.length) {
    this.weatherIconUrl = `https://openweathermap.org/img/wn/${this.currentWeather?.weather[0].icon}@2x.png`;
    this.weatherDescription = this.currentWeather?.weather[0].main;
    }
  }
}
