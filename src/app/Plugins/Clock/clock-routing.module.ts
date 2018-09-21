import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { ClockComponent } from './Components/clock/clock.component';

const routes = [
  {
    path: 'clock',
    canActivate: [AuthGuard],
    component: ClockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClockRoutingModule { }
