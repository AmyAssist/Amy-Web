import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicDataTransferService {

  imageUrl: string
  imageChanged: boolean;

  constructor() { 
    this.imageChanged = false;
  }

  setImageUrl(newUrl) {
    this.imageUrl = newUrl;
  }

  getImageUrl() {
    return this.imageUrl;
  }

  setImageChanged(changed: boolean) {
    this.imageChanged = changed;
  }

  getImageChanged() {
    return this.imageChanged;
  }
}
