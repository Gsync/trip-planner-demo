import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { City } from '../model/city.interface';
import { EMPTY, Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrls: ['./trip-planner.component.scss']
})
export class TripPlannerComponent implements OnInit {
  selectedCity = '';
  cities$: Observable<City[]> = EMPTY;

  constructor(private dataService: DataService) {}
  
  ngOnInit() {
    this.cities$ = this.dataService.getCities();
  }

  selectedCityChange(event: MatSelectChange) {
    console.log('selection changed: ', event);
    // send request to fetch weather
  }
}
