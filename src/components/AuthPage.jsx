import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login user
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password);
        setLoading(false);
      } else {
        // Sign-up new user
        setLoading(true);
        await createUserWithEmailAndPassword(auth, email, password);
        setLoading(false);
      }
      onLogin(); // notify App that user is logged in
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-200">
      <form onSubmit={handleAuth} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-stone-900 text-white p-2 w-full rounded">
          {isLogin ? `${loading ? "Logging in..." : "Login"}` : `${loading ? "Signing up..." : "Sign Up"}`}
        </button>
        <p
          className="mt-3 text-stone-600 cursor-pointer font-bold"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create an account" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}
