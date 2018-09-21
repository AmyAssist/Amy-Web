import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockComponent } from './Components/clock/clock.component';
import { ClockDataService } from './Services/clock-data.service';
import { MaterialModule } from '../../material.module';
import { ClockRoutingModule } from './clock-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ClockRoutingModule,
  ],
  declarations: [
    ClockComponent,
  ],
  providers: [forwardRef(() => ClockDataService)]
})
export class ClockModule { }
