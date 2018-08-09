/*
    clock-object for sending and recieving data from REST-backend
*/
export class Clock {
    id: number;
    //encoded like HH:mm - see Java LocalTime.toString()
    alarmTime: String;
    active: boolean;

    constructor() { }
}
