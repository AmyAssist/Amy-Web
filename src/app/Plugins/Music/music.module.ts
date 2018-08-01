import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicComponent } from './Components/music/music.component';
import { MusicDataService } from './Services/music-data.service';
import { MusicRoutingModule } from './music-routing.module';
import { MaterialModule } from '../../material.module';
import { AuthenticationComponent } from '../../Plugins/Music/Components/authentication/authentication.component';
import { CurrentSongComponent } from '../../Plugins/Music/Components/current-song/current-song.component';
import { PlayComponent } from '../../Plugins/Music/Components/play/play.component';

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
    PlayComponent
  ],
  providers: [forwardRef(() => MusicDataService)]
})
export class MusicModule { }
