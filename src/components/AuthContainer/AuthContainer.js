import styles from "./AuthContainer.module.scss";

import logo from "../../assets/logo/BlockPass Logo.svg";
import event from "./../../assets/icons/date.svg";
import order from "./../../assets/icons/voucher-cart.svg";
import marketing from "./../../assets/icons/marketing.svg";
import reports from "./../../assets/icons/analytics.svg";
import finance from "./../../assets/icons/finance.svg";
import settings from "./../../assets/icons/setting-log.svg";
import marketplace from "./../../assets/icons/marketplace.svg";
import help from "./../../assets/icons/help.svg";

function AuthContainer({ children }) {
  return (
    <div className={styles.AuthContainer}>
      <div className={styles.AuthContainerSidebar}>
        <div className={styles.AuthContainerSidebarTop}>
          <span>
            <img src={logo} alt="logo" />
          </span>
          <span>
            <img src={event} alt="event" />
          </span>
          <span>
            <img src={event} alt="event" />
          </span>
          <span>
            <img src={order} alt="order" />
          </span>
          <span>
            <img src={marketing} alt="marketing" />
          </span>
          <span>
            <img src={reports} alt="reports" />
          </span>
          <span>
            <img src={finance} alt="finance" />
          </span>
          <span>
            <img src={settings} alt="settings" />
          </span>
        </div>
        <div className={styles.AuthContainerSidebarBottom}>
          <span>
            <img src={marketplace} alt="marketplace" />
          </span>
          <span>
            <img src={help} alt="help" />
          </span>
        </div>
      </div>
      <div className={styles.AuthContainerChild}>{children}</div>
    </div>
  );
}

export default AuthContainer;
