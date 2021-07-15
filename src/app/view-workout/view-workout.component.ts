import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise } from '../models/exercise.model';
import { Workout } from '../models/workout.model';
import { WorkoutService } from '../services/workout.service';

@Component({
  selector: 'app-view-workout',
  templateUrl: './view-workout.component.html',
  styleUrls: ['./view-workout.component.css']
})
export class ViewWorkoutComponent implements OnInit {

  workout : Workout;
  errorMessage : string;
  exercises : Exercise[] = [];
  date : string;
  title : string;
  updated : boolean = false;

  constructor(private workoutService : WorkoutService, private route : ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const workoutId = this.route.snapshot.paramMap.get('workoutId') as unknown as number;
    this.workoutService.getWorkoutById(workoutId)
    .subscribe(response => {
        this.workout = response;
        this.title = this.workout.title;
        const dateFormatted = formatDate(this.workout.date, 'yyyy-MM-dd', 'en-US');
        this.workout.date = dateFormatted;
        this.date = this.workout.date;

        if (this.workout.exercises.length == 0) {
          this.exercises.push(new Exercise());
        }
        else {
          this.workout.exercises.forEach(exercise => {
            this.exercises.push(exercise);
          })
        }
    });
  }

  addExercise() {
    this.exercises.push(new Exercise());
  }

  removeExercise(exercise : Exercise) {
    this.workoutService.deleteExercise(exercise.id).subscribe(response => {
      console.log(response);
      if (this.exercises.length > 1) {
        const index : number = this.exercises.indexOf(exercise);
        if (index !== -1) {
          this.exercises.splice(index, 1);
        }
      }
    });
  }

  saveWorkout() {

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

          const dateFormatted = formatDate(this.date, 'MM-dd-yyy', 'en-US');
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
          this.workoutService.updateWorkout(this.workout).subscribe(response => {
            this.updated = true;
          });
        }
        else {
          this.errorMessage = "Please enter valid sets and reps.";
        }
    }

    }
  }
}

