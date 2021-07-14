import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {       

        let clonedRequest = request;
        if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
            //console.log('With Token --- ' + sessionStorage.getItem('token'));
        const clonedRequest = request.clone({
           headers: new HttpHeaders({
                 Authorization: JSON.parse(sessionStorage.getItem('token') || '{}'),
                 "Content-Type": "application/json"
               })
            });
        }
        return next.handle(clonedRequest);
    }
}