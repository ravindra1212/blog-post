import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { NotifyService } from '@core/services/notify.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    loginForm: any;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private httpClient: HttpClient,
        private notifyService: NotifyService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userId: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
        });
    }

    /**
     * Submit Method of Login
     * @returns void
     */
    onSubmit(): any {

        if (this.loginForm.invalid) {

            this.notifyService.error('User loggedIn sucessfully.');

            return false;
        }

        this.httpClient
            .get('https://jsonplaceholder.typicode.com/users')
            .subscribe((response: any): any => {

            if (response) {

                let userData = response.find((value: any, key: any) => (value.id == this.loginForm.value.userId &&
                    value.email == this.loginForm.value.email));

                if (typeof userData == 'undefined') {  // If login data not found then it will show error message
                    
                    this.notifyService.error('Invalid Credentials.');

                    return false;

                } 

                this.authService.setUserData(userData); // Set login data in local storage

                this.notifyService.success('User loggedIn sucessfully.');

                this.router.navigate(['./home']);

            }

        });
    }

}
