import styles from "./AppLayout.module.css";


export function AppLayout(){
    return (
        <main className={styles.app}>
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
          <br />
          Hellow from the App page
        </h1>
      </section>
    </main>
    )
}