import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { redirect } from "react-router";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // redirect to home
            redirect("/user")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Throw error
            throw error;
        });
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}