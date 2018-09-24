import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicDataTransferService {

  private readonly subject = new Subject<any>();
  imageUrl: string;
  imageChanged = false;

  constructor() {
    this.imageChanged = false;
  }

  setImageUrl(newUrl) {
    this.imageUrl = newUrl;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  setImageChanged(changed: boolean) {
    this.imageChanged = changed;
  }

  getImageChanged(): boolean {
    return this.imageChanged;
  }

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
