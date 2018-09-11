import { Distance } from './distance';
import { Duration } from './duration';
import { NavDate } from './navDate';
import { Coordinate } from './Coordinate';

export class DirectionsLeg {
    distance: Distance;
    duration: Duration;
    durationInTraffic: Duration;
    arrivalTime: NavDate;
    departureTime: NavDate;
    startLocation: Coordinate;
    endLocation: Coordinate;
    startAddress: string;
    endAddress: string;

    constructor() { }
}
