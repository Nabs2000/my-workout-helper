import type { Route } from "./+types/contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact" },
    { name: "description", content: "Contact page" },
  ];
}

export default function ContactPage() {
  return <h1>Contact</h1>;
}
