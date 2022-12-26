import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifyService } from './notify.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(
        private httpClient : HttpClient,
        private notifyService : NotifyService
    ) {}

    /**
     * Fetach data from server
     * @param url - string
     * @param callback - function
     * @return Object | Void
     */
    get(url: string, callback: any): any  {

        return this.httpClient.get(url).subscribe( 
            (response) => {
                callback.call(this, response);
            }
        );
        
    }

    /**
     * Send post data to server
     * @param url - string
     * @param data - function
     * @return Object | Void
     */
    post(url:string, object:object, callback: any) {

        return this.httpClient.post(url, object).subscribe( 
            (response) => {
                callback.call(this, response);
            }
        );
    }
}
