import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";

function PageNav() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <nav className={styles.nav}>
        <Link to="/">
            <Logo />
        </Link>

      <ul>
        <li>
          <NavLink to="/pricing" className={styles.navLink}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product" className={styles.navLink}>Product</NavLink>
        </li>
        <li>
          {isAuthenticated && user ? (
            <div className={styles.userMenu}>
              {/* The avatar doubles as a shortcut back into the app */}
              <Link to="/app" className={styles.avatarLink} title="Go to the app">
                <Avatar name={user.name} src={user.avatarUrl} size={3.2} />
              </Link>
              <button className={styles.logout} onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
