import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private workoutService : WorkoutService) { }

  ngOnInit(): void {
    this.workout = new Workout();
    this.workout.userId = sessionStorage.getItem("userId") as unknown as number;
    this.exercises.push(new Exercise());
  }

  addExercise() {
    this.exercises.push(new Exercise());
  }

  removeExercise(exercise : Exercise) {
    const index : number = this.exercises.indexOf(exercise);
    if (index !== -1) {
      this.exercises.splice(index, 1);
    }
  }

  addWorkout() {

    if (this.title == null) {
      this.errorMessage = "Please enter a title for your workout.";
    }
    else {
      this.workout.title = this.title;
    }

    if (this.exercises.length == 0) {
      this.errorMessage = "Add some exercises to your workout!";
    }
    else {
      for (var i = 0; i < this.exercises.length; i++) {
        if (this.exercises[i] == null) {
          this.removeExercise(this.exercises[i]);
        }
      }
    }

    if (this.workout.title != null && this.exercises.length > 0) {
      if(!Date.parse(this.date)) {
        const dateFormatted = formatDate(Date.now(), 'MM-dd-yyy', 'en-US');
        this.workout.date = dateFormatted;
      }

      this.workout.exercises = this.exercises;
      console.log(this.workout);
      this.workoutService.addWorkout(this.workout).subscribe(response => {
        console.log(response);
      });
    }
  }
}
