import { Distance } from './distance';
import { Duration } from './duration';
import { NavDate } from './navDate';

export class DirectionsLeg {
    distance: Distance;
    duration: Duration;
    durationInTraffic: Duration;
    arrivalTime: NavDate;
    departureTime: NavDate;
    startLocation: any;
    endLocation: any;
    startAddress: string;
    endAddress: string;

    constructor() { }
}
