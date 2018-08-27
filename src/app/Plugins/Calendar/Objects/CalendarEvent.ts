export class CalendarEvent {

    id: string;
    start: string;
    end: string;
    summary: string;
    location: string;
    description: string;
    reminderType: string;
    reminderTime: number;
    recurrence: string;
    allDay: boolean;

    constructor() { }

    getStartDate(): Date {
        return new Date(this.start);
    }
    getEndDate(): Date {
        return new Date(this.end);
    }
}
