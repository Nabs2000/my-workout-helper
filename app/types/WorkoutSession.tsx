import type { Workout } from "./Workout.tsx"

export interface WorkoutSession {
    workouts: Workout[],
    dateStarted: Date,
    dateCompleted: Date

}