import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
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
    return this.httpClient.get<Workout>(this.apiUrl + '/view?workoutId=' + workoutId);
  }

  getWorkoutsByUserId(userId: number) : Observable<Workout[]> {
    return this.httpClient.get<Workout[]>(this.apiUrl + "/" + userId);
  }

  deleteExercise(exerciseId: number) : Observable<any> {
    return this.httpClient.delete(this.apiUrl + "/exercises/" + exerciseId);
  }

  updateWorkout(workout : Workout) : Observable<any> {
    return this.httpClient.put(this.apiUrl + "/", workout);
  }

  deleteWorkout(workout : Workout) : Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: workout,
    };
    return this.httpClient.delete(this.apiUrl + "/", options);
  }
}

