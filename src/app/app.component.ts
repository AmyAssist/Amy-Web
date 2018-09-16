import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { WorkerUpdateService } from './Services/WorkerUpdateService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(readonly auth: AuthService, private update: WorkerUpdateService) { }
  title = 'app';
}
