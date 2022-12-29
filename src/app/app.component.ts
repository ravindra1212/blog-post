import { NotifyService } from 'src/app/core/services/notify.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'blog-post';

    constructor(
        public authService: AuthService,
        private router : Router,
        private notifyService : NotifyService,
        private primengConfig: PrimeNGConfig
    ) {}

    ngOnInit(): void {
        this.primengConfig.ripple = true;
    }

    /**
     * User Get logged Out 
     * @return void
     */
    signOut() : void {

        if (this.authService.doSignOut()) {

            this.notifyService.success('User loggedOut Sucessfully.');

            this.router.navigate(['./login']);
        }
        
    }
}
