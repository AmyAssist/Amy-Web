import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';

import { CalendarComponent } from './Components/calendar/calendar.component';

const routes = [
  {
    path: 'calendar',
    canActivate: [AuthGuard],
    component: CalendarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
