import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Events.module.scss";

import lensImg from "../../assets/icons/lens.svg";
import reset from "../../assets/icons/reset.svg";
import ivanontech from "../../assets/images/ivanontech.jpeg";
import polygonvillage from "../../assets/images/polygonvillage.jpg";
import noimg from "../../assets/images/noimg.png";
import BlockSelector from "../../components/BlockSelector/BlockSelector";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { useEffect } from "react";
import console from "console-browserify";
import moment from "moment";

function Events() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      display: "list",
      search: "",
      eventStatus: "",
      organizer: "",
    },
  });
  const { user } = useMoralis();

  const { data, error, isLoading } = useMoralisQuery(
    "Events",
    (query) => query.equalTo("creator", user),
    [user],
    { live: true }
  );

  useEffect(() => {
    console.log(data);
    window.moment = moment;
  }, [data]);

  const getDate = (date, type) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (type === "mon") {
      let month = parseInt(date.split("-")[1]) - 1;
      return months[month];
    } else if (type === "day") {
      return date.split("-")[2];
    }
  };

  const editEvent = (eventObjectId) =>
    navigate(`/manage/events/${eventObjectId}/basicinfo`);

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
        <BlockSelector
          name={"display"}
          values={[
            { name: "List", id: "list" },
            { name: "Calender", id: "calender" },
          ]}
          currentValue={formik.values.display}
          onChange={(e) =>
            formik.setValues({ ...formik.values, display: e.target.value })
          }
        />
        <Link to={"/manage/events/create"}>Create Event</Link>
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
            <option value={"all"}>All</option>
            <option value={"pending"}>Pending</option>
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
        {data?.map((event, index) => {
          return (
            <div
              className={styles.EventsTableBody}
              onClick={() => editEvent(event.id)}
              key={index}
            >
              <div className={styles.EventsTableBodyRow}>
                <div className={styles.EventsTableBodyRowDate}>
                  <span>
                    {getDate(event.get("eventStartDate"), "mon")?.toUpperCase()}
                  </span>
                  <span>{getDate(event.get("eventStartDate"), "day")}</span>
                </div>
                <img
                  src={
                    event.get("eventImage") ? event.get("eventImage") : noimg
                  }
                  alt="noimg"
                />
                <div className={styles.EventsTableBodyRowInfo}>
                  <span className={styles.EventsTableBodyRowInfoTitle}>
                    {event.get("eventTitle")}
                  </span>
                  <span className={styles.EventsTableBodyRowInfoDate}>
                    {event.get("location") === "venue"
                      ? event.get("eventAddress1")
                      : event.get("location")}
                  </span>
                  <span className={styles.EventsTableBodyRowInfoDate}>
                    {moment(
                      `${event.get("eventStartDate")} ${event.get(
                        "eventStartTime"
                      )}`
                    ).format("llll")}
                  </span>
                </div>
                <span className={styles.EventsTableBodyRowSold}>
                  {event.get("eventTicketSold")}/{event.get("eventTicketTotal")}
                </span>
                <span className={styles.EventsTableBodyRowGross}>
                  $
                  {(
                    event.get("eventTicketPrice") * event.get("eventTicketSold")
                  ).toFixed(2)}
                </span>
                <span className={styles.EventsTableBodyRowStatus}>
                  {event.get("eventStatus")}
                </span>
                <span className={styles.EventsTableBodyRowOptions}>...</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Events;
