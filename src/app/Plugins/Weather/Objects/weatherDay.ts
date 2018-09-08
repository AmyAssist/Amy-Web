export class WeatherDay {
    search: string;
    preamble: string;
    summary: string;
    precipProbability: string;
    precipType: string;
    precipIconSrc = 'assets/weather/rain.svg';
    temperatureMin: number;
    temperatureMax: number;
    sunriseTime: string;
    sunsetTime: string;
    iconSrc = 'assets/weather/cloudy.svg';
    icon: string;
    timestamp: number;
    time: string;

    constructor() {
    }
}
