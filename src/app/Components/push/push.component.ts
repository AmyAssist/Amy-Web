import { Component, OnInit } from '@angular/core';
import { PushNotificationService } from '../../Services/pushNotification.service';

@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.css']
})
export class PushComponent implements OnInit {

  get enabled() {
    return this.push.isEnabled();
  }

  isSubscripted = false;

  constructor(
    private readonly push: PushNotificationService) {
  }

  ngOnInit() {
    this.checkState();
  }

  private async checkState() {
    await this.push.isSubscripted().then(sub => this.isSubscripted = sub);
  }

  async activate(name: string) {
    await this.push.subscribeToNotifications(name);
    await this.checkState();
  }

  async deactivate() {
    await this.push.unsubscribeFromNotifications();
    await this.checkState();
  }
}
