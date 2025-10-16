import {type Workout} from "./Workout"
import {type UserWeight} from "./UserWeight"

export interface User {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    workouts: Workout[];
    weights: UserWeight[]
}