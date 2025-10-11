import type { WorkoutType } from "./workoutType";
import { Timestamp } from "firebase/firestore";

export interface Workout {
  workoutName: WorkoutType;
  numberSets: number;
  numberReps: number;
  weight: number;
  dateLogged: Date | Timestamp;
}
