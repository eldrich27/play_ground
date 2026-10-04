import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./User.module.css";
import { useAuth } from "../context/AuthContext";

// "Jack Smith" -> "JS", shown when there's no avatar or it fails to load
function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [avatarFailed, setAvatarFailed] = useState<boolean>(false);

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  if (!user) return null;

  const showAvatar = user.avatarUrl && !avatarFailed;

  return (
    <div className={styles.user}>
      {showAvatar ? (
        <img
          className={styles.avatar}
          src={user.avatarUrl}
          alt={user.name}
          onError={() => setAvatarFailed(true)}
        />
      ) : (
        <span className={`${styles.avatar} ${styles.initials}`} aria-hidden="true">
          {getInitials(user.name)}
        </span>
      )}
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
