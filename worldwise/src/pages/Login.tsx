import { useEffect, useState } from "react";

import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import {useAuth} from "../context/AuthContext";
import { useLocation, useNavigate, type Location } from "react-router-dom";




export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const {login, isAuthenticated} = useAuth()
  const navigate = useNavigate();
  // Set by ProtectedRoutes when it redirected here from a protected page
  const location = useLocation();
  const from = (location.state as { from?: Location } | null)?.from;
  const redirectTo = from ? `${from.pathname}${from.search}` : "/app";
  const [error, setError] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      if (email.trim() && password.trim()) {
        login(email, password); 
      }
    } catch (err) {
      setError(err instanceof Error ?`Authentication failed : ${err.message}`  : "Authentication failed");
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);

  return (
    <main className={styles.login}>
      <PageNav></PageNav>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Log in to WorldWise</h2>

        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        

        <div>
          <button className={styles.button} type="submit">
            Login
          </button>
        </div>
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
      </form>
    </main>
  );
}
