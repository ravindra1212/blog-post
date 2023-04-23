import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from '@core/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next:HttpHandler) {
        
        const authToken = this.authService.getToken();
        
        const authRequest = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${authToken}`)
        });

        return next.handle(authRequest);

    }

}