import { SpinnerService } from './spinner.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifyService } from './notify.service';
import { has, isFunction } from 'lodash-es';
import { ErrorService } from './error.service';

@Injectable({
    providedIn: 'root'
})
export abstract class HttpService {

    constructor(
        private httpClient : HttpClient,
        private notifyService : NotifyService,
        private spinnerService : SpinnerService
    ) {}

    /**
     * Fetch data from server
     * @param url - string
     * @param callback - function
     * @return Object | Void
     */
    public get(url: string, callback: any): any  {

        return this.httpClient.get(url).subscribe({
            next: response => {

                if (isFunction(callback)) {
                    callback.call(this, response);
                }
            },
            error: error => {
                this.notifyService.error(ErrorService.getHttpErrMsg(error));
            }
        });
        
    }

    /**
     * Send post data to server
     * @param url - string
     * @param data - function
     * @return Object | Void
     */
    public post(url:string, object:object, callback: any) {

        return this.httpClient.post(url, object).subscribe({
            next: response => {

                if (isFunction(callback)) {
                    callback.call(this, response);
                }
            },
            error: error => {
                
                this.notifyService.error(ErrorService.getHttpErrMsg(error));
            }
        });
    }

    /**
     * Send form data to server
     * @param url - string
     * @param Object | Void
     * @param sucessCallback | function 
     * @param errorCallBack = null  | function
     * @return void
     */
    public postForm(url: string, object: any, sucessCallback: any, errorCallBack:any = null) {

        if (has(object, 'spinner') == false || (has(object, 'spinner') == true && object.spinner !== false)) {
           // this.spinnerService.show(); // Show spinner
        }

        let payload = has(object, 'payload') ? object.payload : object;

        // Check if "formData" is present then payload will be formated as 'multi/part'
        if (has(object, 'formData') && object.formData) {

            const formData = new FormData();
            
            for( const key of Object.keys(payload) ) {
                const value = payload[key];
                formData.append(key, value);
            }
            
           payload = formData;
        }

        return this.httpClient.post(url, payload).subscribe({
            next: (response:any) => {

                this.spinnerService.hide(); // Hide Spinner

                if (isFunction(sucessCallback)) {
                    sucessCallback.call(this, response);
                }

                // Handle success message automatically
                // if developer want to handle manually success message
                // then he need to set "object" showSuccessMsg = false;
                const showSuccessMsg = has(object, 'showSuccessMsg') ? object.showSuccessMsg : true;

                if (showSuccessMsg) { // check if 
                    this.notifyService.success(response.message);
                }

            },
            error: error => {

                this.spinnerService.hide(); // Hide Spinner

                if (isFunction(errorCallBack)) {
                    errorCallBack.call(this, error);
                }

                this.notifyService.error(ErrorService.getHttpErrMsg(error));
            }
        });
    }

    /**
     * Send delete record data to server
     * @param url - string
     * @param data - function
     * @return Object | Void
     */
    public delete(url: string, object: object, callback: any) {

        return this.httpClient.delete(url, object).subscribe({
            next : response => {
                
                if (isFunction(callback)) {
                    callback.call(this, response);
                }
            },
            error: error => {
                this.notifyService.error(ErrorService.getHttpErrMsg(error));
            }
        });
    }

}
