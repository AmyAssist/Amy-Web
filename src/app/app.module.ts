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
  MatTableModule,
  MatDialogModule
} from '@angular/material';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ClockComponent } from './Plugins/Clock/Components/clock/clock.component';
import { WeatherComponent } from './Plugins/Weather/Components/weather/weather.component';
import { HomeComponent } from './Components/home/home.component';
import { CalendarComponent } from './Plugins/Calendar/Components/calendar/calendar.component';
import { NavigationComponent } from './Plugins/Navigation/Components/navigation/navigation.component';
import { LocationRegistryComponent } from './Plugins/Registry/Components/locationregistry/location-registry.component';
import { ErrorDialogComponent } from './Components/error-dialog/error-dialog.component';

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
  },
  {
    path: 'locationRegistry',
    component: LocationRegistryComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    WeatherComponent,
    HomeComponent,
    CalendarComponent,
    NavigationComponent,
    LocationRegistryComponent,
    ErrorDialogComponent,
  ],
  imports: [
    MusicModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatGridListModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  entryComponents: [ErrorDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
