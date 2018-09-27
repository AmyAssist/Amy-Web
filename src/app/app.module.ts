import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatGridListModule,
  MatListModule,
  MatRadioModule,
  MatMenuModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
} from '@angular/material';

import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { LocationRegistryComponent } from './Plugins/Registry/Components/location-registry/location-registry.component';
import { RegistryContainerComponent } from './Plugins/Registry/Components/registry-container/registry-container.component';
import { ContactRegistryComponent } from './Plugins/Registry/Components/contact-registry/contact-registry.component';
import { ToscaRegistryComponent } from './Plugins/Registry/Components/tosca-registry/tosca-registry.component';

import { ErrorDialogComponent } from './Components/error-dialog/error-dialog.component';
import { PushComponent } from './Components/push/push.component';
import { LoginComponent } from './Components/login/login.component';

import { AuthService } from './Services/auth.service';
import { AuthGuard } from './auth.guard';

import { MaterialModule } from './material.module';
import { MusicModule } from './Plugins/Music/music.module';

import { NavigationModule } from './Plugins/Navigation/navigation.module';
import { HomeComponent } from './Components/Home/Home-Components/home/home.component';
import { MessagesContainerComponent } from './Components/Home/Home-Components/messages-container/messages-container.component';

import { WeatherModule } from './Plugins/Weather/weather.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { CalendarModule } from './Plugins/Calendar/calendar.module';
import { EmailModule } from './Plugins/Email/email.module';
import { ClockModule } from './Plugins/Clock/clock.module';
import { TimerModule } from './Plugins/Timer/timer.module';

/*
    Routing of the components to the respective links
*/
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registry',
    component: RegistryContainerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'push',
    component: PushComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PushComponent,
    LoginComponent,
    LocationRegistryComponent,
    ErrorDialogComponent,
    RegistryContainerComponent,
    ContactRegistryComponent,
    ToscaRegistryComponent,
    MessagesContainerComponent,
  ],
  imports: [
    CalendarModule,
    ClockModule,
    EmailModule,
    MusicModule,
    NavigationModule,
    TimerModule,
    WeatherModule,
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
    RouterModule.forRoot(routes),
    MatRadioModule,
    FormsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard],
  entryComponents: [ErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
