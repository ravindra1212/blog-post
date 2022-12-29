import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-form-errors',
    templateUrl: './form-errors.component.html',
    styleUrls: ['./form-errors.component.css'],
    standalone : true,
    imports: [
        CommonModule
    ]
})
export class FormErrorsComponent {

    @Input('formObject') formObject:any;
    @Input('controlName') controlName:any;
    
}
