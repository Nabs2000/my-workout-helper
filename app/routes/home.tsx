import type { Route } from "./+types/home";
import {Login} from "../components/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <h1>Welcome to My Workout Helper</h1>
      <Login />
    </div>
  )
}
