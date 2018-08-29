import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarDataService } from './Services/calendar-data.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CalendarRoutingModule } from './calendar-routing.module';
import { MaterialModule } from '../../material.module';
import { CalendarComponent } from '../../Plugins/Calendar/Components/calendar/calendar.component';
import { NewEventComponent } from '../../Plugins/Calendar/Components/new-event/new-event.component';
import { EventsDayComponent } from '../../Plugins/Calendar/Components/events-day/events-day.component';
import { UpcomingEventsComponent } from '../../Plugins/Calendar/Components/upcoming-events/upcoming-events.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CalendarRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  declarations: [
    CalendarComponent,
    NewEventComponent,
    EventsDayComponent,
    UpcomingEventsComponent
  ],
  providers: [forwardRef(() => CalendarDataService)]
})
export class CalendarModule { }
