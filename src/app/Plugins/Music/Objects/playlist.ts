import { music } from '../Objects/music'

export class playlist{
    name: string;
    songs: Array<music>;
    uri: string;
    imageUrl: string;
    
    constructor(name: string) {
        this.name = name;
    }
}