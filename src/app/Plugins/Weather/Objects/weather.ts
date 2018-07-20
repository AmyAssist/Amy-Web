export class Weather {
    search: string;
    preamble: string;
    summary: string;
    precipProbability: string;
    precipType: string;
    temperatureMin: number;
    temperatureMax: number;
    sunriseTime: string;
    sunsetTime: string;
    iconSrc = 'assets/weather/cloudy.svg';
    icon: string;

    constructor() {
    }
}
