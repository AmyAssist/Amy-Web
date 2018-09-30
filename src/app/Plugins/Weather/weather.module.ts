import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherComponent } from './Components/weather/weather.component';
import { WeatherDataService } from './Services/weather-data.service';
import { WeatherRoutingModule } from './weather-routing.module';
import { MaterialModule } from '../../material.module';
import {DayComponent} from './Components/day/day.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        WeatherRoutingModule
    ],
    declarations: [
        WeatherComponent,
        DayComponent
    ],
    exports: [
        DayComponent
    ],
    providers: [forwardRef(() => WeatherDataService)]
})
export class WeatherModule { }
