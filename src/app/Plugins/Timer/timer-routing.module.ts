import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { TimerComponent } from './Components/timer/timer.component';

const routes = [
  {
    path: 'timer',
    canActivate: [AuthGuard],
    component: TimerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimerRoutingModule { }
