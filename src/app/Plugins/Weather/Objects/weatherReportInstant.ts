export class WeatherReportInstant {
    summary: string;
    precipProbability: number;
    precipType: string;
    precipIconSrc = 'assets/weather/rain.svg';
    temperature: number;
    timestamp: number;
    windSpeed: number;
    iconType: string;
    iconSrc = 'assets/weather/cloudy.svg';
    time: string;

    sunriseTime: string;
    sunsetTime: string;

    constructor() {

    }
}
