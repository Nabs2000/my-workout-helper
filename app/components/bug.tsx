import { useState } from "react";
import {doc, setDoc} from "firebase/firestore";
import {getFirestore} from "firebase/firestore";

export default function Bug() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const db = getFirestore();

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const docRef = doc(db, "bugs");
      await setDoc(docRef, {
        name,
        email,
        message,
      });
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <button onClick={() => setIsSelected(!isSelected)}>{isSelected ? "Hide" : "Submit Bug"}</button>
      {isSelected && (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      )}
    </div>
  );
}
