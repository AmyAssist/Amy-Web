import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { map, take } from 'rxjs/operators';
import { BackendResolver } from './backendResolver.service';

@Injectable({
    providedIn: 'root'
})
export class PushNotificationService {

    constructor(
        private readonly swPush: SwPush
        , private readonly http: HttpClient
        , private readonly backend: BackendResolver) {
    }

    private getVAPIDPublicKey() {
        return this.http.get(this.backend.backendURL.getValue() + 'webpush/subscription/key', {
            responseType: 'text' as 'text'
        });
    }

    private subscribe(sub: PushSubscription, name: string) {
        return this.http.post(this.backend.backendURL.getValue() + 'webpush/subscription', sub, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            params: new HttpParams().append('clientName', name),
            responseType: 'text' as 'text'
        });
    }

    public async subscribeToNotifications(name: string) {
        const key = await this.getVAPIDPublicKey().toPromise();
        const sub = await this.swPush.requestSubscription({
            serverPublicKey: key
        });
        return this.subscribe(sub, name).toPromise();
    }

    public unsubscribeFromNotifications() {
        return this.swPush.unsubscribe();
    }

    public isSubscripted(): Promise<boolean> {
        return new Promise((resolve: (value: boolean) => void, reject) =>
            this.swPush.subscription.pipe(take(1), map(sub => sub !== null)).subscribe(b => resolve(b), e => reject(e)));
    }

    public isEnabled(): boolean {
        return this.swPush.isEnabled;
    }
}
