import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './Components/navigation/navigation.component';
import { NavigationDataService } from './Services/navigation-data.service';
import { MaterialModule } from '../../material.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NavigationRoutingModule } from './navigation-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    NavigationRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  declarations: [NavigationComponent],
  providers:  [forwardRef(() => NavigationDataService)]
})
export class NavigationModule { }
