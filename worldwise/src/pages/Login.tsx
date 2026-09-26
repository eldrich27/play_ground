import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Login.module.css";
import PageNav from "../components/PageNav";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  return (
    <main className={styles.login}>
      <PageNav></PageNav>
      <form className={styles.form}>
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
          <Link to="/app"><button className={styles.button}>Login</button></Link>
        </div>
      </form>
    </main>
  );
}
