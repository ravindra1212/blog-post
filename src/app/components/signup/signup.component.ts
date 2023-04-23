import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from '@core/components/base/base.component';
import CoreValidator from '@core/services/validator.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
})
export class SignupComponent extends BaseComponent implements OnInit {

    signupForm: any;
    constructor(private formBuilder: FormBuilder) { 
        super();
    }

    ngOnInit(): void {

        this.signupForm = this.formBuilder.group({
            fname: ["", Validators.required],
            lname: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required],
            confirm_password: ["", Validators.required],
            
        }, 
        {
            validators: [CoreValidator.match('password', 'confirm_password')]
        });
    }

    /**
     * Submit Method of signup
     * @returns void
     */
    onSubmit(): any {

        if (this.signupForm.invalid) {

            this.baseNotifyService.error('User loggedIn sucessfully.');

            return false;
        }

        this.baseHttpService.postForm('http://localhost:3000/api/user/signup', {
            payload: this.signupForm.getRawValue()
        }, (response:any) => {
            this.baseRouter.navigate(['./login']);
        });
    }

}
