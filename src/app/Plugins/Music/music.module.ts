import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig } from '@angular/material';

import { MusicComponent } from './Components/music/music.component';
import { MusicDataService } from './Services/music-data.service';
import { MusicRoutingModule } from './music-routing.module';
import { MaterialModule } from '../../material.module';
import { AuthenticationComponent } from '../../Plugins/Music/Components/authentication/authentication.component';
import { CurrentSongComponent } from '../../Plugins/Music/Components/current-song/current-song.component';
import { SidebarComponent } from '../../Plugins/Music/Components/sidebar/sidebar.component';
import { ContentComponent } from '../../Plugins/Music/Components/content/content.component';
import { DevicesComponent } from '../../Plugins/Music/Components/devices/devices.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MusicRoutingModule
  ],
  declarations: [
    MusicComponent,
    AuthenticationComponent,
    CurrentSongComponent,
    SidebarComponent,
    ContentComponent,
    DevicesComponent
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    forwardRef(() => MusicDataService)],
  exports: [
    CurrentSongComponent
  ]
})
export class MusicModule { }
