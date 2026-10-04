import { useNavigate } from "react-router-dom";

import styles from "./User.module.css";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  if (!user) return null;

  return (
    <div className={styles.user}>
      <Avatar name={user.name} src={user.avatarUrl} />
      <span className={styles.name}>
        Welcome, <strong>{user.name.split(" ")[0]}</strong>
      </span>
      <button className={styles.logout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default User;
