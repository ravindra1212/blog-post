import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare const window: any;

/**
 * This Service will be help into to get the user online offline status 
 * 
 * @author Ravindra Lande
 */
@Injectable({ providedIn: 'root' })
export class OnlineOfflineService {

    private internalConnectionChanged = new Subject<boolean>();

    constructor() {
        window.addEventListener('online', () => this.updateOnlineStatus());
        window.addEventListener('offline', () => this.updateOnlineStatus());
    }

    /**
     * Check the  
     * @return object
     */
    get connectionChanged() : object {
        return this.internalConnectionChanged.asObservable();
    }

    /**
     * Get the status of user is online or offline 
     * @return boolean
     */
    get isOnline() :boolean {
        return !!window.navigator.onLine;
    }

    /**
     * Update online status through the Observable
     * @return void
     */
    private updateOnlineStatus(): void {
        this.internalConnectionChanged.next(window.navigator.onLine);
    }
}