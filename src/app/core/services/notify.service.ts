import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotifyService {

    constructor(private messageService: MessageService) { }

    /**
     * Show sucess notification
     * @return void
     */
    success(message = '') {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    }

    /**
     * Show sucess notification
     * @return void
     */
    error(message = '') {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }
    
}
