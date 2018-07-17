import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicComponent } from './Components/music/music.component';
import { MusicDataService } from './Services/music-data.service';
import { MusicRoutingModule } from './music-routing.module';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
      CommonModule,
      MaterialModule,
      MusicRoutingModule
  ],
  declarations: [ MusicComponent ],
  providers:    [ forwardRef(() => MusicDataService) ]
})
export class MusicModule { }
