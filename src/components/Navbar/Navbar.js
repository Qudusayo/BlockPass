import { ConnectButton } from "web3uikit";
import logo from "./../../assets/logo/BlockPass Logo.svg";
import styles from "./Navbar.module.scss";

function Navbar() {
  return (
    <nav className={styles.Nav}>
      <div className={styles.NavLogo}>
        <img src={logo} alt="BlockPass Logo" />
        <h2>LOCKPASS</h2>
      </div>
      <div className={styles.NavLink}>
        <ConnectButton />
      </div>
    </nav>
  );
}

export default Navbar;
