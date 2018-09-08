import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private readonly _language = 0;
  private _soundEnabled = true;

  constructor() { }

  get language() {
    return this._language;
  }

  get soundEnabled() {
    return this._soundEnabled;
  }

  mute() {
    this._soundEnabled = false;
  }

  unmute() {
    this._soundEnabled = true;
  }
}
