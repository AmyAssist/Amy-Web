/*
    clock-object for sending and recieving data from REST-backend
*/
export class Clock {
    id: number;
    // encoded like 2007-12-03T10:15 - see Java LocalTime.toString()
    alarmTime: string;
    active: boolean;

    constructor() { }
}
