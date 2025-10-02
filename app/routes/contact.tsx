import type { Route } from "./+types/home";
import { Contact } from "../contact/contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact" },
    { name: "description", content: "Contact page" },
  ];
}

export default function ContactPage() {
  return <Contact />;
}
