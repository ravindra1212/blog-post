import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from '@core/components/base/base.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {

    loginForm: any;
    tokenTimer:any;

    constructor(private formBuilder: FormBuilder) { 
        super(); 
    }

    ngOnInit(): void {

        this.loginForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required]
        });
    }

    /**
     * Submit Method of Login
     * @returns void
     */
    onSubmit(): any {

        if (this.loginForm.invalid) {

            this.baseNotifyService.error('User loggedIn sucessfully.');

            return false;
        }

        this.baseHttpService
            .postForm('http://localhost:3000/api/user/login', this.loginForm.getRawValue(), (response: any) => {

            let requestData = response.data;

            const token = requestData.token;

            if (token) { // if token present

                const expiresInDuration = requestData.expiresIn;

                // Start Token expry timer
                this.baseAuthService.setTokenTimer(expiresInDuration);

                const now = new Date();

                const expirationDate = now.getTime() + expiresInDuration * 1000;
                
                // Set the authorization token
                this.baseAuthService.saveToken(token, expirationDate);

                // Tirgger Event of Auth Status
                this.baseAuthService.authStatusListner.next(true);

                // serUser information
                this.baseAuthService.setUserData(requestData.user);

                this.baseRouter.navigate(['./home']);
            }

        }, (errorResponse:any) => {

            // Tirgger Event of Auth Status
            this.baseAuthService.authStatusListner.next(false);
        });

    }

    /**
     * Garbase Clearup Function
     */
    ngOnDestroy(): void {
        this.baseAuthService.authStatusListner.unsubscribe();
    }

}
