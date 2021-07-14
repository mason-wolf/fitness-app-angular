import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://e74253c68c4544da8a5b1eeeecdad56f.vfs.cloud9.us-east-2.amazonaws.com/user/';
  constructor(private http: HttpClient) { }
  
  getAllUsers(): Observable<any> {
    return this.http.get(this.baseUrl+'allusers', {responseType:'text'})
      .pipe(catchError(this.handleError));
  }
  
  private handleError(httpError: HttpErrorResponse) {
    let message : string='';
    if (httpError.error instanceof ProgressEvent) {
      message = "network error";
    }
    else {
      message = JSON.parse(httpError.error).message;
    }
    
    return throwError('something went wrong:'  + message);
  }
}
