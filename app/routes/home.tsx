import type { Route } from "./+types/home";
import { Login } from "../components/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Workout Helper" },
    { name: "description", content: "Track your workouts and weight" },
  ];
}

export default function Home() {
  return (
    <div>
      <Login />
    </div>
  );
}
