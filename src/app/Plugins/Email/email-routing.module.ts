import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { EmailComponent } from './Components/email/email.component';

const routes = [
  {
    path: 'email',
    canActivate: [AuthGuard],
    component: EmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }
