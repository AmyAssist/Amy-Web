import { Distance } from './distance';
import { Duration } from './duration';

export class DirectionsLeg {
    distance: Distance;
    duration: Duration;
    durationInTraffic: Duration;
    arrivalTime: any;
    departureTime: any;
    startLocation: any;
    endLocation: any;
    startAddress: string;
    endAddress: string;

    constructor() { }
}
