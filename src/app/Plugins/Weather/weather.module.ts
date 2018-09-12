import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherComponent } from './Components/weather/weather.component';
import { WeatherDataService } from './Services/weather-data.service';
import { WeatherRoutingModule } from './weather-routing.module';
import { MaterialModule } from '../../material.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        WeatherRoutingModule
    ],
    declarations: [
        WeatherComponent,
    ],
    providers: [forwardRef(() => WeatherDataService)]
})
export class WeatherModule { }
