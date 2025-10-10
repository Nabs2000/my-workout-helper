import {type Workout} from "./Workout"

export interface User {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    workouts: Workout[];
}