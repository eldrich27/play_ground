import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
import { useAuth } from "../context/AuthContext";
import { Button } from "./Button";

function PageNav() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className={styles.nav}>
        <Link to="/">
            <Logo />
        </Link>

      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          {isAuthenticated ? (
            <>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <Button type="primary" onClick={logout}>
                Logout
              </Button>
            </>
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
