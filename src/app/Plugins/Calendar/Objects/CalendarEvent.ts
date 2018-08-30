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

    static setEventData(title: string, start: string, end: string, description: string, location: string,
         reminderType: string, reminderTime: number, recurrence: string, allDay: boolean): CalendarEvent {
        const newEvent = new CalendarEvent();
        newEvent.summary = title;
        newEvent.start = start;
        newEvent.end = end;
        newEvent.description = description;
        newEvent.location = location;
        newEvent.reminderType = reminderType;
        newEvent.reminderTime = reminderTime;
        newEvent.recurrence = recurrence;
        newEvent.allDay = allDay;
        return newEvent;
    }

    getStartDate(): Date {
        return new Date(this.start);
    }
    getEndDate(): Date {
        return new Date(this.end);
    }
}
