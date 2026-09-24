"use client";
import styles from "./page.module.scss";
import CpuThing from "./_components/cpuThing";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heading}>
            <span className={styles.highlight}>Almira</span> Systems
          </h1>
          <h2 className={styles.subheading}>software for humanity.</h2>
          <br />
          <p className={styles.description}>
            this site is currently under construction!
          </p>
          <CpuThing />
        </section>
        <section className={styles.services}></section>
        <section className={styles.about}></section>
        <section className={styles.contact}></section>
      </main>
    </div>
  );
}
