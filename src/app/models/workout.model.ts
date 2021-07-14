import { Exercise } from "./exercise.model";

export class Workout {
    id: number;
    userId: number;
    title: string;
    date: string;
    exercises: Exercise[];
}