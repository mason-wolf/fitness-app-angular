import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, pipe } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private router: Router) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler, ): Observable<HttpEvent<any>> {       

        let clonedRequest = request;
        if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
            clonedRequest = request.clone({
                setHeaders: {
                    Authorization: sessionStorage.getItem('token')
                  }
            });
        }
        
        return next.handle(clonedRequest)
        .pipe(
            catchError((error) => {
                if (error === 401) {
                    this.router.navigate(["/login"]);
                }
                return of(error);
            })
        )
    }
}