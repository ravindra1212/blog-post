import { Injectable } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService  {

    constructor(private router : Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (this.authService.isLoggedIn()) { // if user is loggedIn then route will be activate

            return true;
        }

        return false;
    }
}