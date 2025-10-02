import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { redirect } from "react-router";

export function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // redirect to login
            redirect("/login")
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
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}