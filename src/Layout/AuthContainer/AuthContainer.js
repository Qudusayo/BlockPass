import styles from "./AuthContainer.module.scss";

import console from "console-browserify";
import logo from "../../assets/logo/BlockPass Logo.svg";
import event from "./../../assets/icons/date.svg";
import order from "./../../assets/icons/voucher-cart.svg";
import marketing from "./../../assets/icons/marketing.svg";
import reports from "./../../assets/icons/analytics.svg";
import finance from "./../../assets/icons/finance.svg";
import settings from "./../../assets/icons/setting-log.svg";
import marketplace from "./../../assets/icons/marketplace.svg";
import help from "./../../assets/icons/help.svg";
import { Link, NavLink, useLocation } from "react-router-dom";

function AuthContainer({ children }) {
  const location = useLocation();

  return (
    <div className={styles.AuthContainer}>
      <div className={styles.AuthContainerSidebar}>
        <div className={styles.AuthContainerSidebarTop}>
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
          <NavLink
            className={({ isActive }) =>
              isActive || location.pathname === "/manage/events/create"
                ? styles.activeLink
                : undefined
            }
            to={"/organisation/events"}
          >
            <img src={event} alt="event" />
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.activeLink : undefined
            }
            to="/"
          >
            <img src={order} alt="order" />
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.activeLink : undefined
            }
            to="/"
          >
            <img src={marketing} alt="marketing" />
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.activeLink : undefined
            }
            to="/"
          >
            <img src={reports} alt="reports" />
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.activeLink : undefined
            }
            to="/"
          >
            <img src={finance} alt="finance" />
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.activeLink : undefined
            }
            to="/"
          >
            <img src={settings} alt="settings" />
          </NavLink>
        </div>
        <div className={styles.AuthContainerSidebarBottom}>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.activeLink : undefined
            }
            to="/"
          >
            <img src={marketplace} alt="marketplace" />
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.activeLink : undefined
            }
            to="/"
          >
            <img src={help} alt="help" />
          </NavLink>
        </div>
      </div>
      <div className={styles.AuthContainerChild}>{children}</div>
    </div>
  );
}

export default AuthContainer;
