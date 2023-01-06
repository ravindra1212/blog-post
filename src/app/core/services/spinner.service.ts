import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

    constructor(private spinner: NgxSpinnerService) { }

    /**
     * Show Spinner
     */
    show() {
        this.spinner.show();
    }

    /**
     * Hide Visiable Spinner
     */
    hide() {
        this.spinner.hide();
    }
}
