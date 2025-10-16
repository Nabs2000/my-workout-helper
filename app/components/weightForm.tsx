import type { FormEvent } from "react";
import { useState } from "react";
import { Form } from "react-router";
import type { Workout } from "~/types/Workout";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import type { WorkoutType } from "~/types/workoutType";
import type { UserWeight } from "~/types/UserWeight";

export default function WeightForm({ uid }: { uid: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [weight, setWeight] = useState<UserWeight>({
    weight: 0.00,
    dateLogged: new Date(),
  });

  const [showWeightForm, setShowWeightForm] = useState(false);

  async function handleSubmit(weight: UserWeight) {
    const db = getFirestore();
    try {
      console.log(weight);
      setIsLoading(true);
      const usersRef = doc(db, "users", uid);

      const weightToSave = {
        weight: weight,
        dateLogged: new Date(),
      }

      console.log("Document written with ID: ", usersRef.id);

      await updateDoc(usersRef, {
        weights: arrayUnion(weightToSave),
      });
    } catch (error: any) {
      console.log("Error!");
    } finally {
      setIsLoading(false);
      setWeight({
        weight: 0.00,
        dateLogged: new Date(),
      });
    }
  }
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() =>
          showWeightForm ? setShowWeightForm(false) : setShowWeightForm(true)
        }
        type="button"
      >
        {showWeightForm ? "Hide Weight" : "Show Weight"}
      </button>
      {showWeightForm ? (
        <Form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(weight)}
        >
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
              Weight
            </label>
            <input
              className="w-full p-2 border rounded"
              value={weight.weight}
              onChange={(e) =>
                setWeight({
                  ...weight,
                  weight: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date Logged (YYYY-MM-DD)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dateLogged"
              type="date"
              value={
                weight.dateLogged instanceof Date
                  ? weight.dateLogged.toISOString().slice(0, 10)
                  : ""
              }
              onChange={(e) =>
                setWeight({
                  ...weight,
                  dateLogged: new Date(e.target.value),
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
