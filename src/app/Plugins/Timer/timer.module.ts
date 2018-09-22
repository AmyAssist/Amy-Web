import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './Components/timer/timer.component';
import { TimerDataService } from './Services/timer-data.service';
import { MaterialModule } from '../../material.module';
import { TimerRoutingModule } from './timer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TimerRoutingModule,
  ],
  declarations: [
    TimerComponent,
  ],
  providers: [forwardRef(() => TimerDataService)]
})
export class TimerModule { }
