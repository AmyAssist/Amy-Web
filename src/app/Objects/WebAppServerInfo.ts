/**
 * Immutable representation of the information provided by the server serving the webapp.
 */
export class WebAppServerInfo {
    defaultBackendUrl: string;
    constructor(defaultBackendUrl: string) {
        this.defaultBackendUrl = defaultBackendUrl;
    }
}
