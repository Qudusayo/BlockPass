import styles from "./Spinner.module.scss";

function Spinner({ bg }) {
  return (
    <div className={styles.Spinner}>
      <div className={styles.bounce1}></div>
      <div className={styles.bounce2}></div>
      <div className={styles.bounce3}></div>
    </div>
  );
}

export default Spinner;
