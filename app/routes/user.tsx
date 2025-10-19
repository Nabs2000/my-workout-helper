import { useState } from "react";
import type { Route } from "./+types/user";
import type { User } from "../types/User";

import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import WorkoutForm from "../components/workoutForm";
import WorkoutChart from "~/components/workoutProgGraph";
import WeightForm from "~/components/weightForm";
import WeightChart from "~/components/weightProgGraph";
import { Link } from "react-router";

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

  return (
    <div>
      <h1 className="text-2xl font-bold text-black">Hello {loaderData.firstName}!</h1>
      <WorkoutForm uid={loaderData.uid} />
      <WorkoutChart user={loaderData} />
      <WeightForm uid={loaderData.uid} />
      <WeightChart user={loaderData} />
      <Link className="text-blue-500 hover:text-blue-700" to="/">Logout</Link>
    </div>
  );
}
