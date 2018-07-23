export class NavPath {
    origin: string;
    destination: string;
    travelmode: string;
    time: any;

    constructor() { }

    public getOrigin(): string {
        return this.origin;
    }

    public setOrigin(origin: string) {
        this.origin = origin;
    }

    public getDestination(): string {
        return this.destination;
    }

    public setDestination(destination: string) {
        this.destination = destination;
    }

    public getTravelmode(): string {
        return this.travelmode;
    }

    public setTravelmode(travelmode: string) {
        this.travelmode = travelmode;
    }

    public getTime(): any {
        return this.time;
    }

    public setTime(time: any) {
        this.time = time;
    }
}
