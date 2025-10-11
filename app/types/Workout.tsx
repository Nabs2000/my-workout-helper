import type { WorkoutType } from "./workoutType";

export interface Workout {
  workoutName: WorkoutType;
  numberSets: number;
  numberReps: number;
  weight: number;
  dateLogged: Date;
}
