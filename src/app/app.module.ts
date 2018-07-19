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

} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';


import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ClockComponent } from './Plugins/Clock/Components/clock/clock.component';
import { MusicComponent } from './Plugins/Music/Components/music/music.component';
import { WeatherComponent } from './Plugins/Weather/Components/weather/weather.component';
import { HomeComponent } from './Components/home/home.component';
import { CalendarComponent } from './Plugins/Calendar/Components/calendar/calendar.component';
import { NavigationComponent } from './Plugins/Navigation/Components/navigation/navigation.component';
import { EmailComponent } from './Plugins/Email/Components/email/email.component';

/*
    Routing of the components to the respective links
*/
const routes: Routes = [
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
  },
  {
    path: 'navigation',
    component: NavigationComponent
  },
  {
    path: 'email',
    component: EmailComponent
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
    NavigationComponent,
    EmailComponent,
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    MatSliderModule,
    FormsModule,
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
