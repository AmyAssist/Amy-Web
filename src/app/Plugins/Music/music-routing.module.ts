import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';

import { MusicComponent } from './Components/music/music.component';

const routes = [
  {
    path: 'music',
    canActivate: [AuthGuard],
    component: MusicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicRoutingModule { }
