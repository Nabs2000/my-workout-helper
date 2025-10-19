import type { FormEvent } from "react";
import { useState } from "react";
import { Form } from "react-router";
import type { Workout } from "~/types/Workout";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import type { WorkoutType } from "~/types/workoutType";

export default function WorkoutForm({
  uid,
  onSubmit,
}: {
  uid: string;
  onSubmit?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [workout, setWorkout] = useState<Workout>({
    workoutName: "",
    numberSets: 0,
    numberReps: 0,
    weight: 0,
    dateLogged: "",
  });

  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(w: Workout) {
    const db = getFirestore();
    try {
      if (workout.workoutName === "") {
        setError("Please select a workout");
        return;
      }
      setError(null);
      setIsLoading(true);
      const usersRef = doc(db, "users", uid);

      // Ensure dateLogged is a Date object
      const workoutToSave = {
        ...w,
        dateLogged: w.dateLogged,
      };

      const workouts = await getDoc(usersRef);
      const workoutsData = workouts.data();
      const workoutsArray = workoutsData?.workouts || [];

      // If workout with same date exists, replace it
      const workoutIndex = workoutsArray.findIndex(
        (workout: Workout) => workout.dateLogged === workoutToSave.dateLogged
      );
      if (workoutIndex !== -1) {
        workoutsArray[workoutIndex] = workoutToSave;
      } else {
        workoutsArray.push(workoutToSave);
      }

      await updateDoc(usersRef, {
        workouts: workoutsArray,
      });
      if (onSubmit) {
        onSubmit();
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setWorkout({
        workoutName: "",
        numberSets: 0,
        numberReps: 0,
        weight: 0,
        dateLogged: "",
      });
    }
  }
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() =>
          showWorkoutForm ? setShowWorkoutForm(false) : setShowWorkoutForm(true)
        }
        type="button"
      >
        {showWorkoutForm ? "Hide Workout" : "Show Workout"}
      </button>
      {showWorkoutForm ? (
        <Form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(workout)}
        >
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
              Workout Name
            </label>
            <select
              required
              className="w-full p-2 border rounded text-black"
              value={workout.workoutName}
              onChange={(e) =>
                setWorkout({
                  ...workout,
                  workoutName: e.target.value as WorkoutType,
                })
              }
            >
              <option value="">Select a workout</option>
              <option value="Bench Press">Bench Press</option>
              <option value="Squat">Squat</option>
              <option value="Deadlift">Deadlift</option>
              <option value="RDL">RDL</option>
              <option value="Overhead Press">Overhead Press</option>
              <option value="Pull Up">Pull Up</option>
              <option value="Push Up">Push Up</option>
              <option value="Muscle Up">Muscle Up</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Number of Sets
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="numberSets"
              type="number"
              placeholder="5"
              value={workout.numberSets}
              onChange={(e) =>
                setWorkout({
                  ...workout,
                  numberSets: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Number of Reps
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="numberReps"
              type="number"
              placeholder="10"
              value={workout.numberReps}
              onChange={(e) =>
                setWorkout({
                  ...workout,
                  numberReps: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Weight Used
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="weight"
              type="number"
              placeholder="25"
              value={workout.weight}
              onChange={(e) =>
                setWorkout({
                  ...workout,
                  weight: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date Logged (DD-MM-YYYY)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dateLogged"
              type="date"
              value={workout.dateLogged}
              onChange={(e) =>
                setWorkout({
                  ...workout,
                  dateLogged: e.target.value,
                })
              }
            />
          </div>
          <button
            className={`${isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </Form>
      ) : (
        ""
      )}
    </div>
  );
}
