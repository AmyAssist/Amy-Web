export class WeatherNow {
    search: string;
    preamble: string;
    summary: string;
    precipProbability: string;
    precipType: string;
    temperatureNow: number;
    iconSrc = 'assets/weather/cloudy.svg';
    icon: string;
    windSpeed: number;
    timestamp: number;
    time: string;

    constructor() {
    }
}
