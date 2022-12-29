import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import isFunction from 'lodash/isFunction';


@Injectable({
    providedIn: 'root'
})
export class ConfirmPopupService {

    constructor(
        private confirmationService : ConfirmationService
    ) { }

    confirm(event: any, object: any, acceptCallback: any, rejectCallback: any = null) {

        this.confirmationService.confirm({
            target: event.target,
            message: object.message,
            accept: (accept:any) => {
                // confirm action
                if (isFunction(acceptCallback)) {
                    acceptCallback.call(this, accept);
                }
            },
            reject: (reject:any) => {
                // reject action
                if (isFunction(acceptCallback)) {
                    rejectCallback.call(this, reject);
                }
            }
        });
    }

}
