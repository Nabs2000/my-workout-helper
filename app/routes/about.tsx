import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About" },
    { name: "description", content: "About page" },
  ];
}

export default function AboutPage() {
  return <h1>About</h1>;
}
