import type { FormEvent } from "react";
import { useState } from "react";
import { Form } from "react-router";
import type { Workout } from "~/types/Workout";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export default function WorkoutForm({ uid }: { uid: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [workout, setWorkout] = useState<Workout>({
    workoutName: "",
    numberSets: 0,
    numberReps: 0,
    weight: 0,
  });

  async function handleSubmit(w: Workout) {
    const db = getFirestore();
    try {
      console.log(workout);
      setIsLoading(true);
      const usersRef = doc(db, "users", uid);

      console.log("Document written with ID: ", usersRef.id);

      await updateDoc(usersRef, {
        workouts: arrayUnion(w),
      });
    } catch (error: any) {
      console.log("Error!");
    } finally {
      setIsLoading(false);
      setWorkout({
        workoutName: "",
        numberSets: 0,
        numberReps: 0,
        weight: 0,
      });
    }
  }
  return (
    <div>
      <Form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(workout)}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Workout Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="workoutName"
            type="text"
            placeholder="Muscle-ups"
            value={workout.workoutName}
            onChange={(e) =>
              setWorkout({
                ...workout,
                workoutName: String(e.target.value),
              })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Number of Sets
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numberSets"
            type="text"
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
            type="text"
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
            type="text"
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
        <button
          className={`${isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </Form>
    </div>
  );
}
