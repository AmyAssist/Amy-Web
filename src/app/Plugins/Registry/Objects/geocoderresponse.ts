/**
 * Google geocoder API response model object
 *
 * @author Benno Krauß
 */
export class GeocoderResponse {
    results: GeocoderResult[];
    status: string;
}

class GeocoderResult {
    geometry: GeocoderGeometry;
}

class GeocoderGeometry {
    location: GeocoderLocation;
}

class GeocoderLocation {
    lat: number;
    lng: number;
}
