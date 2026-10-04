import { useNavigate } from "react-router-dom";

import styles from "./PageNotFound.module.css";
import PageNav from "../components/PageNav";
import { Button } from "../components/Button";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <main className={styles.notFound}>
      <PageNav />
      <section>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <h1>Looks like you've wandered off the map 🧭</h1>
        <p className={styles.text}>
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>
        <div className={styles.actions}>
          <Button type="primary" onClick={() => navigate("/", { replace: true })}>
            Back to home
          </Button>
          <Button type="back" onClick={() => navigate(-1)}>
            &larr; Go back
          </Button>
        </div>
      </section>
    </main>
  );
}
