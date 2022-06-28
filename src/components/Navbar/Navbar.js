import { ConnectButton } from "web3uikit";

import plus from "../../assets/icons/plus.svg";
import like from "../../assets/icons/like.svg";
import ticket from "../../assets/icons/ticket.svg";
import logo from "./../../assets/logo/BlockPass Logo.svg";
import styles from "./Navbar.module.scss";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";

function Navbar() {
  const { isAuthenticated } = useMoralis();

  return (
    <nav className={styles.Nav}>
      <div className={styles.NavLogo}>
        <Link to={"/"}>
          <img src={logo} alt="BlockPass Logo" />
          <h2>LOCKPASS</h2>
        </Link>
      </div>
      <div className={styles.NavLink}>
        {isAuthenticated && (
          <>
            <div className={styles.NavLinkItem}>
              <Link to={"/manage/events/create"}>
                <span>
                  <img src={plus} alt="plus" />
                </span>
                <span>Create an event</span>
              </Link>
            </div>
            <div className={styles.NavLinkItem}>
              <span>
                <img src={like} alt="like" />
              </span>
              <span>Likes</span>
            </div>
            <div className={styles.NavLinkItem}>
              <span>
                <img src={ticket} alt="ticket" />
              </span>
              <span>Tickets</span>
            </div>
          </>
        )}
        <ConnectButton />
      </div>
    </nav>
  );
}

export default Navbar;
