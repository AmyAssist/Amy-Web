import { Injectable } from '@angular/core';
import { BestTransportResult } from '../Objects/bestTransportResult';
import { ResultRoute } from '../Objects/resultRoute';

/*
  Service for calculating the result strings for the Navigation plugin functionalities

  @author: Tobias Siemonsen
*/
@Injectable({
  providedIn: 'root'
})
export class CalcService {

  result = new ResultRoute();

  constructor() { }

  /*
    Calculates the strings which gets displayed when you search for a route
  */
  calcResult(way: BestTransportResult, transit: boolean): ResultRoute {
    if (way.mode.toString() === 'DRIVING') {
      this.result.resultMode = 'car';
      transit = false;
    } else if (way.mode.toString() === 'TRANSIT') {
      this.result.resultMode = 'transit';
      transit = true;
    } else if (way.mode.toString() === 'BICYCLING') {
      this.result.resultMode = 'bicycle';
      transit = false;
    }

    this.result.resultDistance = way.route.legs[0].distance.humanReadable;
    this.result.resultDuration = way.route.legs[0].duration.humanReadable;
    if (transit) {
      const blank = ' ';
      this.result.resultArrivalTime = `${way.route.legs[0].arrivalTime.dayOfMonth}
              /${way.route.legs[0].arrivalTime.monthOfYear}
              /${way.route.legs[0].arrivalTime.year} ${blank}
              ${way.route.legs[0].arrivalTime.hourOfDay}
              :${way.route.legs[0].arrivalTime.minuteOfHour}`;
      this.result.resultDepartureTime = `${way.route.legs[0].departureTime.dayOfMonth}
              /${way.route.legs[0].departureTime.monthOfYear}
              /${way.route.legs[0].departureTime.year} ${blank}
              ${way.route.legs[0].departureTime.hourOfDay}
              :${way.route.legs[0].departureTime.minuteOfHour}`;
    }
    this.result.resultStartAddress = way.route.legs[0].startAddress;
    this.result.resultEndAddress = way.route.legs[0].endAddress;

    return this.result;
  }
}
