import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

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
     * is Loggned In
     * @return boolean
     */
    isLoggedIn() : boolean {

        let userData = this.getUserData();

        return (userData == false) ? false : true;
    }

    /**
     * Remove the logged In User Imformation
     * @return boolean
     */
    doSignOut() : boolean {
           
        if (this.isLoggedIn()) { // clear "userData" from localstorage
            localStorage.removeItem('userData');
        }

        return true;
    }

    /**
     * Get loggedIn userId
     * @return Number
     */
    getUserId() : Number {

        let userData = this.getUserData();

        return userData.id;
    }

}
