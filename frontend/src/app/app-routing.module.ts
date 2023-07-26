import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripPlannerComponent } from './trip-planner/trip-planner.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'trip-planner',
        component: TripPlannerComponent
      },
      {
        path: '',
        redirectTo: 'trip-planner',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
