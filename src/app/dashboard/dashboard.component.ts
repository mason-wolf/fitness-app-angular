import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../models/workout.model';
import { CalendarOptions } from '@fullcalendar/angular';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: []
  }

  handleDateClick(arg) {
    console.log(arg);
  }

  userId = sessionStorage.getItem("userId");
  userWorkouts : Workout[];
  showWorkouts : boolean;
  loading : boolean = true;
  workoutEvents = [];

  constructor(
    private workoutService : WorkoutService, 
    private httpClient : HttpClient, 
    private authService : AuthService) {}
  
  async getWorkouts() {
    this.workoutService.getWorkoutsByUserId(this.userId as unknown as number).subscribe(data => {
      this.loading = false;
      if (data != null) {
        this.userWorkouts = data;
  
        this.userWorkouts.forEach(workout => {
          this.workoutEvents.push(workout)
        });

        this.calendarOptions.events = this.workoutEvents;

        if (this.userWorkouts.length == 0) {
          this.showWorkouts = false;
        }
        else {
          this.showWorkouts = true;
        }
      }
      else {
        console.error("Empty data set.");
      }
    })
  }

  ngOnInit(): void {
    this.getWorkouts();
  }
}


