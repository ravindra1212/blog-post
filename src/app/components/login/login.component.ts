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

            const token = response.token;

            if (token) { // if token present

                const expiresInDuration = response.expiresIn;

                // Start Token expry timer
                this.baseAuthService.setTokenTimer(expiresInDuration);

                const now = new Date();

                const expirationDate = now.getTime() + expiresInDuration * 1000;
                
                // Set the authorization token
                this.baseAuthService.saveToken(response.token, expirationDate);

                this.baseRouter.navigate(['./home']);
            }
        });

    }

    /**
     * Garbase Clearup Function
     */
    ngOnDestroy(): void {
        clearTimeout(this.tokenTimer);
    }

}
