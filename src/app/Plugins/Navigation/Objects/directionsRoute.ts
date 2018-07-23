import { DirectionsLeg } from './directionsLeg';

export class DirectionsRoute {
    summary: string;
    legs: DirectionsLeg[];
    waypointOrder: number[];
    copyrights: string;

    constructor() { }
}