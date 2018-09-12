/*
    clock-object for sending and recieving data from REST-backend
*/
export class Timer {
    id: number;
    // encoded like 2007-12-03T10:15:00 - see Java LocalTime.toString()
    timerTime: string;
    remainingTime: string;
    active: boolean;

    constructor() { }
}
