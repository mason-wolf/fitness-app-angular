import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Workout } from '../models/workout.model';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  
  private apiUrl = "http://localhost:8080/workouts"

  constructor(private httpClient : HttpClient) { 
  }

  addWorkout(workout : Workout) : Observable<any> {
    return this.httpClient.post(this.apiUrl + "/add/", workout, {headers, responseType : 'text'});
  }

  getWorkoutById(workoutId : number) : Observable<Workout> {
    return this.httpClient.get<Workout>(this.apiUrl + '/display/' + workoutId);
  }

  getWorkoutsByUserId(userId: number) : Observable<Workout[]> {
    return this.httpClient.get<Workout[]>(this.apiUrl + "/" + userId);
  }
}

