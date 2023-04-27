import { NotifyService } from '@core/services/notify.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { PrimeNGConfig } from 'primeng/api';
import { BaseComponent } from '@core/components/base/base.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit {

    title = 'blog-post';
    isLoggedIn:boolean = false;
    private authListnerSub :Subscription | undefined;

    constructor(private primengConfig: PrimeNGConfig) { 
        super(); 
    }

    ngOnInit(): void {

        // this.baseAuthService.autoLoginUser();

        // Get the user Authenticate or not information as boolean
        this.isLoggedIn = this.baseAuthService.isLoggedIn();

        // Update the current auth status via event
        this.authListnerSub = this.baseAuthService.getAuthStatusListener().subscribe( (status) => {
            this.isLoggedIn = status;
        });

        this.primengConfig.ripple = true;
    }

    /**
     * User Get logged Out 
     * @return void
     */
    signOut() : void {

        if (this.baseAuthService.doSignOut()) {

            this.baseNotifyService.success('User loggedOut Sucessfully.');

            this.baseRouter.navigate(['./login']);
        }
        
    }

    ngOnDestroy(): void {

        if (this.authListnerSub) {
            this.authListnerSub.unsubscribe();
        }
    }
}
