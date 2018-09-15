import {Component, Input} from '@angular/core';
import {WeatherReportDay} from '../../Objects/weatherReportDay';
import * as moment from 'moment-timezone';


@Component({
    selector: 'app-weather-day',
    templateUrl: './day.component.html',
    styleUrls: ['./day.component.css']
})
export class DayComponent {
    @Input() dayReport: WeatherReportDay;

    getWeatherIcon(iconType: WeatherReportDay['iconType']): string {
        switch (iconType) {
            case 'clear-day': {
                return 'assets/weather/sunny.svg';
            }
            case 'partly-cloudy-day':
            case 'partly-cloudy-night':
            case 'cloudy': {
                return 'assets/weather/cloudy.svg';
            }
            case 'clear-night': {
                return 'assets/weather/moon.svg';
            }
            case 'sleet': {
                return 'assets/weather/sleet.svg';
            }
            case 'rain': {
                return 'assets/weather/rain.svg';
            }
            case 'snow': {
                return 'assets/weather/snows.svg';
            }
            case 'wind': {
                return 'assets/weather/wind.svg';
            }
            case 'fog': {
                return 'assets/weather/hazy.svg';
            }
            default: {
                return 'assets/weather/rain.svg';
            }
        }
    }

    round(x: number): number {
        return Math.round(x);
    }

    private getDateFromZonedDateTime(stamp: string) {
        // Regex used to extract date and timezone from ZonedDateTime string
        const regex = /(.*)\[(.*)\]/;
        const matches = regex.exec(stamp);

        return moment(matches[1]).tz(matches[2]);
    }

    convertDateTime(stamp: string): string {
        return this.getDateFromZonedDateTime(stamp).format('dddd, MMMM DD');
    }
}
