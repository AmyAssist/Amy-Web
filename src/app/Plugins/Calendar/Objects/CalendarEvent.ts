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

    constructor(title, start, end, description, location, reminderType, reminderTime, recurrence, allDay) {
        this.summary = title;
        this.start = start;
        this.end = end;
        this.description = description;
        this.location = location;
        this.reminderType = reminderType;
        this.reminderTime = reminderTime;
        this.recurrence = recurrence;
        this.allDay = allDay;
     }

    getStartDate(): Date {
        return new Date(this.start);
    }
    getEndDate(): Date {
        return new Date(this.end);
    }
}
