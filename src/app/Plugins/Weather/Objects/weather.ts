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
    timestamp: number;
    time: string;

    constructor(private readonly weather: Weather) {
        this.search = weather.search;
        this.preamble = weather.preamble;
        this.summary = weather.summary;
        this.precipProbability = weather.precipProbability;
        this.precipType = weather.precipType,
        this.temperatureMin = weather.temperatureMin;
        this.temperatureMax = weather.temperatureMax;
        this.sunriseTime = weather.sunriseTime;
        this.sunsetTime = weather.sunsetTime;
        this.iconSrc = weather.iconSrc;
        this.icon = weather.icon;
        this.timestamp = weather.timestamp;
        this.time = weather.time;
    }
}
