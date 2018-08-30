/**
 * Immutable representation of a local time. This representation have no time zone, it is meant to be local time as seen on a wall clock.
 */
export class LocalDateTime {
    date: Date;
    constructor(year: number, month: number, dayOfMonth: number, hour: number, minute: number) {
        this.date = new Date(year, month, dayOfMonth, hour, minute);
    }

    private pad(number: number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }

    toString() {
        return this.date.getFullYear() +
            '-' + this.pad(this.date.getMonth() + 1) +
            '-' + this.pad(this.date.getDate()) +
            'T' + this.pad(this.date.getHours()) +
            ':' + this.pad(this.date.getMinutes());
    }
}
