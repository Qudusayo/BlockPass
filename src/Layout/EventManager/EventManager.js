import { Link, NavLink, useLocation } from "react-router-dom";
import Select from "react-select";
import console from "console-browserify";

import styles from "./EventManager.module.scss";

import arrowdown from "../../assets/icons/arrow-down.svg";
import backarrow from "../../assets/icons/back-arrow.svg";
import tick from "../../assets/icons/tick.svg";
import { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";
import moment from "moment";

const options = [
  { value: "draft", label: "Draft" },
  { value: "publish", label: "Publish Now" },
  { value: "schedule", label: "Schedule Publish" },
];

function EventManager({ children }) {
  const [option, setOption] = useState("");
  const [eventObjectId, setEventObjectId] = useState("");
  const { fetch, data } = useMoralisQuery(
    "Events",
    (query) => query.equalTo("objectId", eventObjectId),
    [eventObjectId],
    { live: true, autoFetch: false }
  );

  const handleChange = (selectedOption) => {
    setOption(selectedOption);
  };

  const location = useLocation();

  useEffect(() => {
    let pathname = location.pathname.split("/");
    if (pathname.length === 5) {
      let eventId = pathname[3];
      setEventObjectId(eventId);
    }
  }, [location.pathname]);

  useEffect(() => {
    fetch();
  }, [eventObjectId]);

  const getPreviewUrl = () => {
    return window.location.origin + "/event/" + eventObjectId;
  };

  return (
    <div className={styles.EventManager}>
      <div className={styles.EventManagerSidebar}>
        <Link
          to={"/organisation/events"}
          className={styles.EventManagerSidebarBack}
        >
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
          <h2>{data[0]?.get("eventTitle")}</h2>
          <span>
            {data[0]
              ? moment(
                  `${data[0]?.get("eventStartDate")} ${data[0]?.get(
                    "eventStartTime"
                  )}`
                ).format("llll")
              : null}
          </span>
          <span>
            <a target="_blank" href={getPreviewUrl()}>
              Preview your event
            </a>
          </span>
        </div>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ||
                location.pathname ===
                  `/manage/events/${eventObjectId}/basicinfo`
                  ? styles.activeLink
                  : undefined
              }
              to={`/manage/events/${eventObjectId}/basicinfo`}
            >
              <img src={tick} alt="tick" />
              <span>Basic Info</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ||
                location.pathname === `/manage/events/${eventObjectId}/details`
                  ? styles.activeLink
                  : undefined
              }
              to={`/manage/events/${eventObjectId}/details`}
            >
              <img src={tick} alt="tick" />
              <span>Details</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ||
                location.pathname === `/manage/events/${eventObjectId}/tickets`
                  ? styles.activeLink
                  : undefined
              }
              to={`/manage/events/${eventObjectId}/tickets`}
            >
              <span className={styles.numberTick}>3</span>
              <span>Tickets</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ||
                location.pathname === `/manage/events/${eventObjectId}/publish`
                  ? styles.activeLink
                  : undefined
              }
              to={`/manage/events/${eventObjectId}/publish`}
            >
              <span className={styles.numberTick}>4</span>
              <span>Publish</span>
            </NavLink>
          </li>
        </ul>
        <NavLink
          className={({ isActive }) =>
            isActive || location.pathname === `/myevent/${eventObjectId}`
              ? [
                  styles.EventManagerSidebarLinkActiveLink,
                  styles.EventManagerSidebarLink,
                ].join(" ")
              : styles.EventManagerSidebarLink
          }
          to={`/myevent/${eventObjectId}`}
        >
          Dashboard
        </NavLink>
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
