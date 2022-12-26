import { NotifyService } from 'src/app/services/notify.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

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
        private notifyService : NotifyService
    ) {}

    ngOnInit(): void {
        
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
