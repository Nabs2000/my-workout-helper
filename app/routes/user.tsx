import type { Route } from "./+types/user";

import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { type User } from "../types/User";

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
    return <h1>Hello {loaderData.firstName}!</h1>;
}