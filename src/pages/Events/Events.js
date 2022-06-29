import React from "react";
import { Link } from "react-router-dom";

import styles from "./Events.module.scss";

import lensImg from "../../assets/icons/lens.svg";
import reset from "../../assets/icons/reset.svg";
import ivanontech from "../../assets/images/ivanontech.jpeg";
import polygonvillage from "../../assets/images/polygonvillage.jpg";
import noimg from "../../assets/images/noimg.png";

function Events() {
  return (
    <div className={styles.Events}>
      <h1>Events</h1>
      <nav>
        <ul>
          <li>Events</li>
          <li>Collections</li>
        </ul>
      </nav>
      <div className={styles.EventsSelector}>
        <div>
          <label>
            <input type="radio" />
            List
          </label>
          <label>
            <input type="radio" />
            Calender
          </label>
        </div>
        <Link to={"/"}>Create Event</Link>
      </div>

      <form className={styles.Form}>
        <label className={styles.FormInputSearch}>
          <img src={lensImg} alt="lens" />
          <input type={"text"} placeholder={"Search events"} />
          <span className={styles.FormInputSearchReset}>
          <img src={reset} alt="reset" />
          </span>
        </label>
        <label className={styles.FormInputLg}>
          <span>Event Status</span>
          <select>
            <option>Pending</option>
          </select>
        </label>
        <label className={styles.FormInputLg}>
          <span>Organizer</span>
          <select>
            <option>All</option>
          </select>
        </label>
      </form>

      <div className={styles.EventsTable}>
        <div className={styles.EventsTableHead}>
          <span>Event</span>
          <span>Sold</span>
          <span>Gross</span>
          <span>Status</span>
        </div>

        <div className={styles.EventsTableBody}>
          <div className={styles.EventsTableBodyRow}>
            <div className={styles.EventsTableBodyRowDate}>
              <span>JUN</span>
              <span>24</span>
            </div>
            <img src={ivanontech} alt="ivanontech" />
            <div className={styles.EventsTableBodyRowInfo}>
              <span className={styles.EventsTableBodyRowInfoTitle}>
                Ivanon Tech
              </span>
              <span className={styles.EventsTableBodyRowInfoDate}>
                Friday, June 24, 2022 at 7:00 PM WAT
              </span>
            </div>
            <span className={styles.EventsTableBodyRowSold}>0/100</span>
            <span className={styles.EventsTableBodyRowGross}>$0.00</span>
            <span className={styles.EventsTableBodyRowStatus}>Pending</span>
            <span className={styles.EventsTableBodyRowOptions}>...</span>
          </div>
        </div>
        <div className={styles.EventsTableBody}>
          <div className={styles.EventsTableBodyRow}>
            <div className={styles.EventsTableBodyRowDate}>
              <span>JUN</span>
              <span>24</span>
            </div>
            <img src={polygonvillage} alt="ivanontech" />
            <div className={styles.EventsTableBodyRowInfo}>
              <span className={styles.EventsTableBodyRowInfoTitle}>
                Polygon Village Meetup
              </span>
              <span className={styles.EventsTableBodyRowInfoDate}>
                Friday, June 24, 2022 at 7:00 PM WAT
              </span>
            </div>
            <span className={styles.EventsTableBodyRowSold}>0/0</span>
            <span className={styles.EventsTableBodyRowGross}>$0.00</span>
            <span className={styles.EventsTableBodyRowStatus}>Pending</span>
            <span className={styles.EventsTableBodyRowOptions}>...</span>
          </div>
        </div>
        <div className={styles.EventsTableBody}>
          <div className={styles.EventsTableBodyRow}>
            <div className={styles.EventsTableBodyRowDate}>
              <span>JUN</span>
              <span>24</span>
            </div>
            <img src={noimg} alt="noimg" />
            <div className={styles.EventsTableBodyRowInfo}>
              <span className={styles.EventsTableBodyRowInfoTitle}>
                Test Event
              </span>
              <span className={styles.EventsTableBodyRowInfoDate}>
                Friday, June 24, 2022 at 7:00 PM WAT
              </span>
            </div>
            <span className={styles.EventsTableBodyRowSold}>0/10</span>
            <span className={styles.EventsTableBodyRowGross}>$0.00</span>
            <span className={styles.EventsTableBodyRowStatus}>Pending</span>
            <span className={styles.EventsTableBodyRowOptions}>...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
