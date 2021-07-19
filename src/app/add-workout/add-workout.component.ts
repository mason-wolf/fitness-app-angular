import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Exercise } from '../models/exercise.model';
import { Workout } from '../models/workout.model';
import { WorkoutService } from '../services/workout.service';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css']
})
export class AddWorkoutComponent implements OnInit {

  title : string;
  date: string;
  workout : Workout;

  exercises : Exercise[] = [];
  errorMessage : string;

  constructor(private workoutService : WorkoutService, private router: Router) { }

  ngOnInit(): void {
    this.workout = new Workout();
    this.workout.userId = sessionStorage.getItem("userId") as unknown as number;
    this.exercises.push(new Exercise());
  }

  addExercise() {
    this.exercises.push(new Exercise());
  }

  removeExercise(exercise : Exercise) {
    if (this.exercises.length > 1) {
      const index : number = this.exercises.indexOf(exercise);
      if (index !== -1) {
        this.exercises.splice(index, 1);
      }
    }
  }

  addWorkout() {

    // Check if title is empty
    if (this.title == null) {
      this.errorMessage = "Please enter a title for your workout.";
    }
    else {
      this.workout.title = this.title;
    }

    // Check if there are no exercises
    if (this.exercises[0].name == null || 
      this.exercises[0].sets == null || this.exercises[0].reps == null) {
      this.errorMessage = "Add some exercises to your workout!";
    }
    else {

      // Format the date
      if (this.workout.title != null && this.exercises.length > 0) {

        let dateFormatted : string;
        if (!Date.parse(this.date)) {
          dateFormatted = formatDate(Date.now(), 'yyy-MM-dd', 'en-US');
        }
        else {
          dateFormatted = formatDate(this.date, 'yyy-MM-dd', 'en-US');
        }

          this.workout.date = dateFormatted;
        

        // Check if sets and reps are valid numbers
        let validSetsReps = true;
        this.exercises.forEach(exercise => {
          if (isNaN(exercise.sets) || isNaN(exercise.reps)
            || exercise.sets == 0 || exercise.reps == 0) {
            validSetsReps = false;
          }
        });

        if (validSetsReps) {
          this.workout.exercises = this.exercises;
          this.workoutService.addWorkout(this.workout).subscribe(response => {
            console.log(response);
          });
         this.router.navigate(['/dashboard']);
        }
        else {
          this.errorMessage = "Please enter valid sets and reps.";
        }
    }

    }
  }
}
