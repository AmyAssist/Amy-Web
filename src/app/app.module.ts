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
  MatToolbarModule
} from '@angular/material';


import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ClockComponent } from './Plugins/Clock/Components/clock/clock.component';
import { WeatherComponent } from './Plugins/Weather/Components/weather/weather.component';
import { CalendarComponent } from './Plugins/Calendar/Components/calendar/calendar.component';
import { EmailComponent } from './Plugins/Email/Components/email/email.component';

import { LocationRegistryComponent } from './Plugins/Registry/Components/location-registry/location-registry.component';
import { RegistryContainerComponent } from './Plugins/Registry/Components/registry-container/registry-container.component';
import { ContactRegistryComponent } from './Plugins/Registry/Components/contact-registry/contact-registry.component';

import { ErrorDialogComponent } from './Components/error-dialog/error-dialog.component';
import { LoginComponent } from './Components/login/login.component';

import { AuthService } from './Services/auth.service';
import { AuthGuard } from './auth.guard';

import { MaterialModule } from './material.module';
import { MusicModule } from './Plugins/Music/music.module';

import { NavigationModule } from './Plugins/Navigation/navigation.module';
import { HomeComponent } from './Components/Home/Home-Components/home/home.component';
import { MessagesContainerComponent } from './Components/Home/Home-Components/messages-container/messages-container.component';

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
    path: 'clock',
    component: ClockComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'weather',
    component: WeatherComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'email',
    component: EmailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registry',
    component: RegistryContainerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    WeatherComponent,
    HomeComponent,
    CalendarComponent,
    EmailComponent,
    LoginComponent,
    LocationRegistryComponent,
    ErrorDialogComponent,
    RegistryContainerComponent,
    ContactRegistryComponent,
    MessagesContainerComponent,
  ],
  imports: [
    MusicModule,
    NavigationModule,
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
    FormsModule
  ],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard],
  entryComponents: [ErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
