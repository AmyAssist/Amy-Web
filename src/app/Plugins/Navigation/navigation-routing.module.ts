import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';

import { NavigationComponent } from './Components/navigation/navigation.component';

const routes = [
  {
    path: 'navigation',
    canActivate: [AuthGuard],
    component: NavigationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
