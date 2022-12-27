import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-form-errors',
    templateUrl: './form-errors.component.html',
    styleUrls: ['./form-errors.component.css'],
    standalone : true,
    imports: [
        CommonModule
    ]
})
export class FormErrorsComponent implements OnInit {

    @Input('formObject') formObject:any;
    @Input('controlName') controlName:any;

    ngOnInit() {

        console.log({
            formObject: this.formObject.get(this.controlName).errors
        });


        console.log({
            controlName: this.controlName
        });
    }

    
}
