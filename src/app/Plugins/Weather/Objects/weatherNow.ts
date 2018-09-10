export class WeatherNow {
    summary: string;
    precipProbability: number;
    precipType: string;
    precipIconSrc = 'assets/weather/rain.svg';
    temperatureNow: number;
    timestamp: number;
    windspeed: number;
    iconType: string;
    iconSrc = 'assets/weather/cloudy.svg';
    time: string;

    constructor() {
    }
}
