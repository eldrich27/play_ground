import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";


export default function AppLayout(){
    return (
        <main className={styles.app}>
            <Sidebar />
        </main>
    )
}