export class WeatherNow {
    search: string;
    preamble: string;
    summary: string;
    precipProbability: string;
    precipType: string;
    temperatureNow: number;
    iconSrc = 'assets/weather/cloudy.svg';
    icon: string;
    timestamp: number;
    time: string;

    constructor() {
    }
}
