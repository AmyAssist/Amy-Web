import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';

import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {ClockComponent} from './Plugins/Clock/Components/clock/clock.component';
import {WeatherComponent} from './Plugins/Weather/Components/weather/weather.component';
import {HomeComponent} from './Components/home/home.component';
import {CalendarComponent} from './Plugins/Calendar/Components/calendar/calendar.component';
import {NavigationComponent} from './Plugins/Navigation/Components/navigation/navigation.component';
import {LocationRegistryComponent} from './Plugins/Registry/Components/location-registry/location-registry.component';
import {ErrorDialogComponent} from './Components/error-dialog/error-dialog.component';
import {RegistryContainerComponent} from './Plugins/Registry/Components/registry-container/registry-container.component';
import {ContactRegistryComponent} from './Plugins/Registry/Components/contact-registry/contact-registry.component';

import {MaterialModule} from './material.module';
import {MusicModule} from './Plugins/Music/music.module';

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
    path: 'registry',
    component: RegistryContainerComponent
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
    RegistryContainerComponent,
    ContactRegistryComponent,
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
    MatTabsModule,
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
