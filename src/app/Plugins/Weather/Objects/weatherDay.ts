export class WeatherDay {
    summary: string;
    precipProbability: number
    precipType: string;
    precipIconSrc = 'assets/weather/rain.svg';
    temperatureMin: number;
    temperatureMax: number;
    timestamp: number;
    time: string;
    sunriseTime: string;
    sunsetTime: string;
    iconType: string;
    iconSrc = 'assets/weather/cloudy.svg';
    
    constructor() {
        
    }
}
