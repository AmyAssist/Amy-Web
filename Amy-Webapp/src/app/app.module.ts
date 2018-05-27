import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MusicComponent } from './Components/music/music.component';
import { WeatherComponent } from './Components/weather/weather.component';
import { ClockComponent } from './Components/clock/clock.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicComponent,
    WeatherComponent,
    ClockComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
