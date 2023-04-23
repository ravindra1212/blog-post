import { NotifyService } from '@core/services/notify.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { PrimeNGConfig } from 'primeng/api';
import { BaseComponent } from '@core/components/base/base.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit {

    title = 'blog-post';
    
    constructor(private primengConfig: PrimeNGConfig) { 
        super(); 
    }

    ngOnInit(): void {

        this.baseAuthService.autoLoginUser();

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
}
