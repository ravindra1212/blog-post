import { SpinnerService } from './spinner.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifyService } from './notify.service';
import isFunction from 'lodash/isFunction';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(
        private httpClient : HttpClient,
        private notifyService : NotifyService,
        private spinnerService : SpinnerService
    ) {}

    /**
     * Fetach data from server
     * @param url - string
     * @param callback - function
     * @return Object | Void
     */
    get(url: string, callback: any): any  {

        return this.httpClient.get(url).subscribe({
            next: response => {

                if (isFunction(callback)) {
                    callback.call(this, response);
                }
            },
            error: error => {
                this.notifyService.error(error.message);
            }
        });
        
    }

    /**
     * Send post data to server
     * @param url - string
     * @param data - function
     * @return Object | Void
     */
    post(url:string, object:object, callback: any) {

        return this.httpClient.post(url, object).subscribe({
            next: response => {

                if (isFunction(callback)) {
                    callback.call(this, response);
                }
            },
            error: error => {
                this.notifyService.error(error.message);
            }
        });
    }

    /**
     * Send form data to server
     * @param url - string
     * @param data - function
     * @return Object | Void
     */
    postForm(url: string, object: object, callback: any) {

        this.spinnerService.show(); // Show spinner

        return this.httpClient.post(url, object).subscribe({
            next: response => {

                this.spinnerService.hide(); // Hide Spinner

                if (isFunction(callback)) {
                    callback.call(this, response);
                }
            },
            error: error => {

                this.spinnerService.hide(); // Hide Spinner
                
                this.notifyService.error(error.message);
            }
        });
    }

    /**
     * Send delete record data to server
     * @param url - string
     * @param data - function
     * @return Object | Void
     */
    delete(url: string, object: object, callback: any) {

        return this.httpClient.delete(url, object).subscribe({
            next : response => {
                
                if (isFunction(callback)) {
                    callback.call(this, response);
                }
            },
            error: error => {
                this.notifyService.error(error.message);
            }
        });
    }
}
