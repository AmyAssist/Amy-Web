import { WeatherReportInstant } from './weatherReportInstant';
import { WeatherReportWeek } from './weatherReportWeek';

export class WeatherReport {
    current: WeatherReportInstant;
    week: WeatherReportWeek;
    timeZone: string;

    constructor() {

    }
}
