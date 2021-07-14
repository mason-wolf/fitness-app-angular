import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../models/workout.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userId = sessionStorage.getItem("userId");
  userWorkouts : Workout[];
  noWorkouts : string;

  constructor(private workoutService : WorkoutService, 
    private httpClient : HttpClient, private authService : AuthService) {

      this.workoutService.getWorkoutsByUserId(this.userId as unknown as number).subscribe(data => {
        this.userWorkouts = data;

        if (this.userWorkouts.length < 2) {
          this.noWorkouts = "No workouts yet!";
        }
      });
  }
  
  
  ngOnInit(): void {
  }

}

