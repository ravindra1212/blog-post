import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from '@core/services';
import { catchError, map, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return next.handle(req)
                    .pipe(
                        map(res => {
                            console.log("Passed through the interceptor in response");
                            return res
                        }),
                        catchError((error: HttpErrorResponse) => {
                            let errorMsg = '';
                            if (error.error instanceof ErrorEvent) {
                                console.log('This is client side error');
                                errorMsg = `Error: ${error.error.message}`;
                            } else {
                                console.log('This is server side error');
                                errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                            }
                            console.log(errorMsg);
                            return throwError(() => errorMsg);
                        })
                    )
    }

}