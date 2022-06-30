import { Link } from "react-router-dom";
import Select from "react-select";

import styles from "./EventManager.module.scss";

import arrowdown from "../../assets/icons/arrow-down.svg";
import backarrow from "../../assets/icons/back-arrow.svg";
import tick from "../../assets/icons/tick.svg";
import { useState } from "react";

const options = [
  { value: "draft", label: "Draft" },
  { value: "publish", label: "Publish Now" },
  { value: "schedule", label: "Schedule Publish" },
];

function EventManager({ children }) {
  const [option, setOption] = useState("");

  const handleChange = (selectedOption) => {
    setOption(selectedOption);
  };

  return (
    <div className={styles.EventManager}>
      <div className={styles.EventManagerSidebar}>
        <Link to={"/organisation/events"} className={styles.EventManagerSidebarBack}>
          <img src={backarrow} alt="back arrow" />
          <span>Events</span>
        </Link>
        <Select
          className={styles.EventManagerSidebarSelect}
          value={option}
          onChange={handleChange}
          options={options}
        />
        <div className={styles.EventManagerSidebarInfo}>
          <h2>
            Name your event and tell event-goers why they should come. Add
            details that
          </h2>
          <span>Sun, Jul 31, 2022 7:00 PM</span>
          <span>
            <Link to="/event">Preview your event</Link>
          </span>
        </div>
        <ul>
          <li>
            <img src={tick} alt="tick" />
            <span>Basic Info</span>
          </li>
          <li>
            <img src={tick} alt="tick" />
            <span>Details</span>
          </li>
          <li>
            <span className={styles.numberTick}>3</span>
            <span>Tickets</span>
          </li>
          <li>
            <span className={styles.numberTick}>4</span>
            <span>Publish</span>
          </li>
        </ul>
        <Link to={"/myevent"} className={styles.EventManagerSidebarLink}>
          Dashboard
        </Link>
        <div className={styles.EventManagerSidebarDropdown}>
          <div className={styles.EventManagerSidebarDropdownHeader}>
            <span>Order options</span>
            <img src={arrowdown} alt="arrow down" />
          </div>
        </div>
        <div className={styles.EventManagerSidebarDropdown}>
          <div className={styles.EventManagerSidebarDropdownHeader}>
            <span>Payments</span>
            <img src={arrowdown} alt="arrow down" />
          </div>
        </div>
        <div className={styles.EventManagerSidebarDropdown}>
          <div className={styles.EventManagerSidebarDropdownHeader}>
            <span>Mange Attendees</span>
            <img src={arrowdown} alt="arrow down" />
          </div>
        </div>
      </div>
      <div className={styles.EventManagerChild}>{children}</div>
    </div>
  );
}

export default EventManager;
