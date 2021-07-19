import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../models/workout.model';
import { CalendarOptions } from '@fullcalendar/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventClick: this.handleEventClick.bind(this), 
    events: []
  }

  handleEventClick(info) {
  //  console.log(info.event._def.publicId);
    this.router.navigate(["/view-workout/" + info.event._def.publicId]);
  }

  userId = sessionStorage.getItem("userId");
  userWorkouts : Workout[];
  showWorkouts : boolean;
  loading : boolean = true;
  workoutEvents = [];

  constructor(
    private workoutService : WorkoutService, 
    private httpClient : HttpClient, 
    private authService : AuthService,
    private router : Router) {
      this.router.onSameUrlNavigation = 'reload';
    }
  
  async getWorkouts() {
    
    await this.workoutService.getWorkoutsByUserId(this.userId as unknown as number).subscribe(data => {
      this.loading = false;
      if (data != null) {
        this.userWorkouts = data;
  
        this.userWorkouts.forEach(workout => {
          this.workoutEvents.push(workout)
        });

        this.calendarOptions.events = this.workoutEvents;
       // console.log(this.calendarOptions.events);
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


