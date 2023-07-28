import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripPlannerComponent } from './trip-planner/trip-planner.component';

const routes: Routes = [
  {
    path: '',
    component: TripPlannerComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
