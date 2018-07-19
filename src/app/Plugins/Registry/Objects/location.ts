/**
 * Location model object
 *
 * @author Benno Krauß
 */
export class Location {
    id?: number;
    name?: string;
    zipCode?: string;
    city?: string;
    street?: string;
    houseNumber?: number;
    longitude?: number;
    latitude?: number;
    work?: boolean;
    home?: boolean;
    getAddressString(): string {
        return `${this.street} ${this.houseNumber}, ${this.zipCode} ${this.city}`;
    }
}

