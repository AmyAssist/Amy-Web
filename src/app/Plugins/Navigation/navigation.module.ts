import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { NavigationDataService } from './Services/navigation-data.service';
import { MaterialModule } from '../../material.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NavigationRoutingModule } from './navigation-routing.module';
import { RoutePlannerComponent } from '../../Plugins/Navigation/Components/route-planner/route-planner.component';
import { DeparturePlannerComponent } from '../../Plugins/Navigation/Components/departure-planner/departure-planner.component';
import { TravelModeComponent } from '../../Plugins/Navigation/Components/travel-mode/travel-mode.component';
import { RouteWidgetComponent } from './Components/route-widget/route-widget.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    NavigationRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    NavigationComponent,
    RoutePlannerComponent,
    DeparturePlannerComponent,
    TravelModeComponent,
    RouteWidgetComponent
  ],
  exports: [
    RouteWidgetComponent
  ],
  providers: [forwardRef(() => NavigationDataService)]
})
export class NavigationModule { }
