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
  isProcessing = false;
  error: string;
  success: string;

  constructor(
    private readonly push: PushNotificationService) {
  }

  ngOnInit() {
    this.checkState();
  }

  private async checkState() {
    await this.push.isSubscripted().then(sub => this.isSubscripted = sub);
  }

  activate(name: string) {
    this.isProcessing = true;
    this.push.subscribeToNotifications(name)
      .then(id => {
        this.isSubscripted = true;
        this.setSuccess('Subscribed to Notifications. You notification id is: ' + id);
      }, error => this.setError('Could not subscribe to notifications'));
  }

  async deactivate() {
    this.isProcessing = true;
    await this.push.unsubscribeFromNotifications()
      .then(() => {
        this.isSubscripted = false;
        this.setSuccess('Unsubscribed from Notifications.');
      }, error => this.setError('Could not unsubscribe from notifications'));
  }

  private setError(error) {
    this.isProcessing = false;
    this.error = error;
    this.success = null;
  }

  private setSuccess(message) {
    this.isProcessing = false;
    this.error = null;
    this.success = message;
  }
}
