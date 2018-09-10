import { WeatherNow } from './weatherNow';
import { WeatherWeek } from './weatherWeek';

export class Weather {
    current: WeatherNow;
    week: WeatherWeek;
    timeZone: string;

    constructor() {

    }
}