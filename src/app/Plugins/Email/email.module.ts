import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './Components/email/email.component';
import { MessageListComponent } from './Components/messagelist/messagelist.component';
import { EmailDataService } from './Services/email-data.service';
import { MaterialModule } from '../../material.module';
import { EmailRoutingModule } from './email-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    EmailRoutingModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    EmailComponent,
    MessageListComponent
  ],
  providers: [forwardRef(() => EmailDataService)]
})
export class EmailModule { }
