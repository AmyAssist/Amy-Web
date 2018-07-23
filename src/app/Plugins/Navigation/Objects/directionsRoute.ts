import { DirectionsLeg } from './directionsLeg';

export class DirectionsRoute {
    summary: string;
    legs: DirectionsLeg[];
    waypointOrder: number[];
    overviewPolyline: any;
    bounds: any;
    copyrights: string;
    warnings: string;

    constructor() { }
}