import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';

import { WeatherComponent } from './Components/weather/weather.component';

const routes = [
    {
        path: 'weather',
        canActivate: [AuthGuard],
        component: WeatherComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WeatherRoutingModule { }
