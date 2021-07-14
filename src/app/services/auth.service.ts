import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private baseUrl = 'http://localhost:8080/auth/';
  
  constructor(private httpClient: HttpClient, private router: Router) {}
  
  register(user : User) : Observable<any> {
    return this.httpClient.post(this.baseUrl + 'register', user, { headers, responseType: 'text'})
        .pipe(catchError(this.handleError));
  }
  
  login(user: string, password: string) {
    return this.httpClient.post<any>(this.baseUrl + 'login', {userName: user, password :password }, { headers })
    .pipe(catchError(this.handleError),
      map(userData => {
        sessionStorage.setItem("username", user);
        sessionStorage.setItem("userId", userData.userId);
        let token = "Bearer " + userData.token;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("roles", JSON.stringify(userData.roles));
        return userData;
      })
      );
  }
  
  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
  
  isLoggedIn(): boolean {
    return sessionStorage.getItem('username') !== null;
  }
  
  private handleError(httpError: HttpErrorResponse) {
    let message:string = '';
    
    if (httpError.error instanceof ProgressEvent) {
      message = "Network Error";
    }
    else {
  //    message = httpError.error.message;
      if (httpError.status == 401) {
        message = "Incorrect username or password.";
        console.error("Unauthorized");
      }
  //    console.error(httpError.status);
  //    console.error(httpError.error);
    }
    
    return throwError(message);
  }
}