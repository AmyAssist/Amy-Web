import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private readonly _language = 0;
  private _soundEnabled = true;
  private _displayChat = false;

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

  get displayChat() {
    return this._displayChat;
  }

  set displayChat(newState: boolean) {
    this._displayChat = newState;
  }
}
