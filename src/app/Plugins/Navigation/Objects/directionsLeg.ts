import { Distance } from './distance';
import { Duration } from './duration';

export class DirectionsLeg {
    distance: Distance;
    duration: Duration;
    durationInTraffic: Duration;
    arrivalTime: string;
    departureTime: string;
    startAddress: string;
    endAddress: string;

    constructor() { }
}