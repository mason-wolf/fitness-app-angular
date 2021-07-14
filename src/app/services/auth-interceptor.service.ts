import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {       

        let clonedRequest = request;
        if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
            clonedRequest = request.clone({
                setHeaders: {
                    Authorization: sessionStorage.getItem('token')
                  }
            });
        }
        
        return next.handle(clonedRequest);
    }
}