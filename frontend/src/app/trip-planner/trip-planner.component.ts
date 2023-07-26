import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { City } from '../model/city.interface';
import { EMPTY, Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { WeatherResponse } from '../model/weather.interface';

@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrls: ['./trip-planner.component.scss']
})
export class TripPlannerComponent implements OnInit {
  selectedCity = '';
  cities$: Observable<City[]> = EMPTY;
  currentWeather: WeatherResponse = {};

  constructor(private dataService: DataService) {}
  
  ngOnInit() {
    this.cities$ = this.dataService.getCities();
  }

  selectedCityChange(event: MatSelectChange) {
    this.dataService.getWeatherByCity(event.value).subscribe((res: WeatherResponse) => {
      this.currentWeather = res;
    })
  }
}
