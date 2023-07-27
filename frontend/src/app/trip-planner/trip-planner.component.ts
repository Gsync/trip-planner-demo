import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { City } from '../model/city.interface';
import { EMPTY, Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { WeatherResponse } from '../model/weather.interface';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrls: ['./trip-planner.component.scss'],
})
export class TripPlannerComponent implements OnInit {
  selectedCity: City = {};
  selectedDate: Date = new Date();
  cities$: Observable<City[]> = EMPTY;
  currentWeather: WeatherResponse = {};
  forecastList: WeatherResponse[] = [];
  minDate: Date;
  maxDate: Date;
  errorDescription = '';
  loading = false;

  constructor(private dataService: DataService) {
    const todaysDate = new Date();
    this.minDate = todaysDate;
    this.maxDate = new Date(Date.now() + 5 * 86400000); // Add 5 days
  }

  ngOnInit() {
    this.cities$ = this.dataService.getCities();
  }

  selectedCityChange(event: MatSelectChange) {
    this.selectedCity = event.value;
    this.loading = true;
    this.dataService
      .getWeatherByCity(this.selectedCity.name as string)
      .subscribe({
        next: (res: WeatherResponse) => {
          this.currentWeather = res;
        },
        error: e => {
          this.loading = false;
          this.errorDescription = 'Unable to fetch data from server!';
        },
        complete: () => {
          this.loading = false;
        }
      });
    if (this.selectedDate) {
      this.getWeatherForecast(
        this.selectedCity.name as string,
        this.selectedDate
      );
    }
  }

  dateChanged(type: string, event: MatDatepickerInputEvent<Date>) {
    this.forecastList = [];
    this.errorDescription = '';
    if (!this.selectedCity.name) {
      this.errorDescription = 'Please select a city before selecting a date!';
      return;
    } else {
      this.selectedDate = event.value as Date;
      this.getWeatherForecast(this.selectedCity.name, this.selectedDate);
    }
  }

  getWeatherForecast(city: string, date: Date) {
    this.loading = true;
    this.dataService.getWeatherForecast(city).subscribe({
      next: (data) => {
        data.list.forEach((d) => {
          const x = d.dt;
          if (x && new Date(x.valueOf() * 1000).getDate() === date?.getDate()) {
            d.dt = x * 1000;
            this.forecastList.push(d);
          }
        });
      },
      error: (e) => {
        this.errorDescription = 'Unable to fetch data from server!';
        this.loading = false;
      },
      complete: () => {
        this.errorDescription = '';
        this.loading = false;
      },
    });
  }
}
