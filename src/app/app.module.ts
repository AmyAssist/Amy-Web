import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { 
  MatButtonModule, 
  MatCheckboxModule, 
  MatToolbarModule,
  MatGridListModule, 
  MatMenuModule, 
  MatListModule,
  MatDividerModule,
  MatIconModule
} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ClockComponent } from './Plugins/Clock/Components/clock/clock.component';
import { MusicComponent } from './Plugins/Music/Components/music/music.component';
import { WeatherComponent } from './Plugins/Weather/Components/weather/weather.component';
import { HomeComponent } from './Components/home/home.component';
import { CalendarComponent } from './Plugins/Calendar/Components/calendar/calendar.component';

/*
    Routing of the components to the respective links
*/
const routes: Routes =[
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'music',
    component: MusicComponent
  },
  {
    path: 'clock',
    component: ClockComponent
  },
  {
    path: 'weather',
    component: WeatherComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    MusicComponent,
    WeatherComponent,
    HomeComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatGridListModule,
    MatDividerModule,
    MatIconModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }