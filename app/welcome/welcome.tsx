import { Register } from "~/auth/register"
// Initialize Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "../../config/firebaseConfig"

export function Welcome() {
  const app = initializeApp(firebaseConfig);

  const analytics = getAnalytics(app);

  return (
    <div>
        <h1>My Workout Helper</h1>
        <p>My Workout Helper is a workout app that helps you track your workouts and progress.</p>
        <Register />
    </div>
    )
}