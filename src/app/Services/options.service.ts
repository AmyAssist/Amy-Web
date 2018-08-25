import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private language = 0;
  private soundEnabled = true;
  private displayChat = false;

  constructor() { }

  public getLanguage(){
    return this.language;
  }

  public setLanguage(newLanguage){
    this.language = newLanguage;
  }

  public muteSound(){
    this.soundEnabled = false;
  }

  public unmuteSound(){
    this.soundEnabled = true;
  }

  public isSoundEnabled(){
    return this.soundEnabled;
  }

  public setDisplayChat(displayChat){
    this.displayChat = displayChat;
  }

  public shallDisplayChat(){
    return this.displayChat;
  }

}
