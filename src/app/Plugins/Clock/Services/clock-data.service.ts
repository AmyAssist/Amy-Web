import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { clock } from '../Objects/clock';


@Injectable({
  providedIn: 'root'
})
export class ClockDataService {

  path: string;

  constructor(private http: HttpClient) { 
    this.path = 'http://localhost:8080/rest/clock/';
  }

  /*
    Getting all Alarms.
  */
  getAlarms() {
    return this.http.get<clock[]>(this.path + 'alarms', httpOptions);
  }

  /*
    Creating a new Alarm.
  */
  setNewAlarm(clockData: clock) {
    this.http.post<clock>(this.path + 'alarms/new', clockData, httpOptions);
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
