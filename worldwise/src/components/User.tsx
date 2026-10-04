import styles from "./User.module.css";
import type { User } from "../types/User";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FAKE_USER: User = JSON.parse(import.meta.env.VITE_FAKE_USER);

function User() {
  const user = FAKE_USER;
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleClick() {
    setError("");

    try {
      login(user.email, user.password);
      navigate("/app");
    } catch {
      setError("Authentication failed");
    }
  }

  return (
    <div className={styles.user}>
      <img src={user.avatarUrl} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
