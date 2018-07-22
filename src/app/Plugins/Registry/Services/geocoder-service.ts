import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GeocoderResponse} from '../Objects/geocoderresponse';

/**
 * Simple google geocoder service
 *
 * @author Benno Krauß
 */
@Injectable({
    providedIn: 'root'
})
export class GeocoderService {
    path: string;

    constructor(private readonly http: HttpClient) {
        this.path = 'http://maps.google.com/maps/api/geocode/json';
    }

    /**
     *
     * @param {string} address A full address string
     */
    geocode(address: string) {
        const params = new HttpParams().set('address', address);
        return this.http.get<GeocoderResponse>(this.path, {
            params,
            headers: new HttpHeaders({'Accept': 'application/json'})
        });
    }


}
