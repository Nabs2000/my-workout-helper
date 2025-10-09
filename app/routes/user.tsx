import { useState } from "react";
import type { Route } from "./+types/user";
import { type User } from "../types/User";

import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";


export async function loader({ params }: Route.LoaderArgs) {
  const userId = params.userId;
  const db = getFirestore();
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}

export default function User({ loaderData }: { loaderData: User }) {
  const [workoutisLoading, setWorkoutisLoading] = useState(false);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  return (
    <div>
      <h1>Hello {loaderData.firstName}!</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => 
            showWorkoutForm ? setShowWorkoutForm(false) : setShowWorkoutForm(true)
        }
        type="submit"
      >
        {showWorkoutForm ? "Add Workout" : "Hide Workout"}
      </button>
    </div>
  );
}
