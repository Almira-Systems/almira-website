import styles from "./loading.module.scss";
const RootLoading = () => {
  return (
    <main className={styles.loading}>
      <span className={styles.loader} />
    </main>
  );
};

export default RootLoading;
