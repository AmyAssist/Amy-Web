export class CalendarEvent {

    id: string;
    start: string;
    end: string;
    summary: string;
    location: string;
    description: string;
    allDay: boolean;

    constructor() { }

    getStartDate() : Date {
		return new Date(this.start);
    }
    
    getEndDate() : Date {
        return new Date(this.end);
    }
}
