import { Injectable } from '@angular/core';
import { has, hasIn, isEmpty } from 'lodash-es';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    /**
     * Auth Service Properties
     */
    private token:any;
    private tokenTimer:any;

    /**
     * Auth Service events
     */
    public authStatusListner = new Subject<boolean>();

    constructor() { }

    /**
     * Observer the status of authenticated user
     * @return void
     */
    getAuthStatusListener() {
        return this.authStatusListner.asObservable();
    }

    /**
     * set the user into localstorage
     * @param data -object
     * return void
     */

    setUserData(data: object) : void {
        localStorage.setItem('userData', JSON.stringify(data));
    }

    /**
     * set the user data from local storage
     * @returns object | Boolean
     */
    getUserData() {
        
        let userData = localStorage.getItem('userData');

        if (!userData) {
            return false;
        }

        return JSON.parse(userData);
    }

    /**
     * Remove user data from local storage 
     * @return void
     */
    private clearUserData() {
        localStorage.removeItem('userData');
    }

    /**
     * is Loggned In
     * @return boolean
     */
    isLoggedIn() : boolean {

        let token = this.getToken();

        return isEmpty(token) ? false : true;
    }

    /**
     * Remove the logged In User Imformation
     * @return boolean
     */
    doSignOut() : boolean {

        this.token = null;
        this.authStatusListner.next(false);
        this.clearToken();
        clearTimeout(this.tokenTimer);
        this.clearUserData();

        return true;
    }

    /**
     * Get loggedIn userId
     * @return Number
     */
    getUserId() : Number {

        let userData = this.getUserData();

        return userData._id;
    }

    /**
     * Set the tocken in variable
     * @param token - string
     * @return void
     */
    setToken(token:string) : void {
        this.token = token;
    }

    /**
     * Get the token
     * @returns string | null
     */
    getToken() : string {

        const info = this.fetchTokenInfo();

        return info ? info.token : '';
    }

    /**
     * Fetch the token information form local storage
     * @returns object | null
     */
    private fetchTokenInfo(): any {

        const token = localStorage.getItem('__token');
        const expirationDate = localStorage.getItem('__expiration');

        if (!token || !expirationDate) {
            return false;
        }

        return {
            token: token,
            expirationDate: new Date(expirationDate)
        };
    }
    
    /**
     * Save Token in Local Storage
     * @param token 
     * @param expirationDate 
     * @return void
     */
    saveToken(token: string, expirationDate: any) : void {

        const date = new Date(expirationDate);

        localStorage.setItem('__token', token);
        localStorage.setItem('__expiration', date.toISOString());
    }

    /**
     * Clear Token from local storage
     * @return void 
     */
    private clearToken() : void {
        localStorage.removeItem('__token');
        localStorage.removeItem('__expiration');
    }

    /**
     * Auto login user and update state
     * @return void
     */
    autoLoginUser() : void {

        const authInformation = this.fetchTokenInfo();

        const now = new Date();

        if (has(authInformation, 'expirationDate')) {
            
            const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
            
            if (expiresIn >= 0) {
                this.token = authInformation.token;
                this.setTokenTimer(expiresIn / 1000);
                this.authStatusListner.next(true);
            }
        }

        return;
    }

    /**
     * 
     * @param duration - number
     * @return void
     */
    setTokenTimer(duration: number) : void {

        this.tokenTimer = setTimeout(() => {

            // get user logOut After expiration
            this.doSignOut(); 

        }, duration * 1000); // 1 Hour

    }

}
