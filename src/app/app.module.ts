import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ClockComponent } from './Plugins/Clock/Components/clock/clock.component';
import { WeatherComponent } from './Plugins/Weather/Components/weather/weather.component';
import { HomeComponent } from './Components/home/home.component';
import { CalendarComponent } from './Plugins/Calendar/Components/calendar/calendar.component';
import { NavigationComponent } from './Plugins/Navigation/Components/navigation/navigation.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { MusicModule } from './Plugins/Music/music.module';

/*
    Routing of the components to the respective links
*/
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'clock',
    component: ClockComponent
  },
  {
    path: 'weather',
    component: WeatherComponent
  },
  {
    path: 'navigation',
    component: NavigationComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    WeatherComponent,
    HomeComponent,
    CalendarComponent,
    NavigationComponent
  ],
  imports: [
    MusicModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
