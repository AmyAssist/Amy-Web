export class WeatherNow {
    search: string;
    preamble: string;
    summary: string;
    precipProbability: string;
    precipType: string;
    precipIconSrc = 'assets/weather/rain.svg';
    temperatureNow: number;
    iconSrc = 'assets/weather/cloudy.svg';
    icon: string;
    windspeed: number;
    timestamp: number;
    time: string;

    constructor() {
    }
}
