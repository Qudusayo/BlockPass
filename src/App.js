import logo from "./assets/logo/BlockPass Logo.svg";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <img src={logo} className={styles.AppLogo} alt="logo" />
        <h2>BLOCK PASS</h2>
        <span className={styles.AppLink}>Blockchain Pass System</span>
      </header>
    </div>
  );
}

export default App;
