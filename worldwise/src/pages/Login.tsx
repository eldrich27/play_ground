import { useState } from "react";

import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";




export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const {login} = useAuth()
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      login(email, password);
      navigate("/app", {replace: true});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    }
  }

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

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <div>
          <button className={styles.button} type="submit">
            Login
          </button>
        </div>
      </form>
    </main>
  );
}
