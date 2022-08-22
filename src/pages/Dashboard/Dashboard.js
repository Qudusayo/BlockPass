import styles from "./Dashboard.module.scss";
import facebook from "../../assets/icons/facebook.svg";
import twitter from "../../assets/icons/twitter.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import { useEffect, useState } from "react";
import console from "console-browserify";
import { useLocation } from "react-router-dom";
import { useMoralisQuery } from "react-moralis";

function Dashboard() {
  const location = useLocation();
  const [eventObjectId, setEventObjectId] = useState("");
  const { fetch, data } = useMoralisQuery(
    "Events",
    (query) => query.equalTo("objectId", eventObjectId),
    [eventObjectId],
    { live: true, autoFetch: false }
  );

  useEffect(() => {
    let pathname = location.pathname.split("/");
    console.log(pathname);
    if (pathname.length === 3) {
      let eventId = pathname[2];
      setEventObjectId(eventId);
    }
  }, [location.pathname]);

  useEffect(() => {
    fetch();
  }, [eventObjectId]);

  useEffect(() => {
    console.log(data[0]);
  }, [data]);

  const getPreviewUrl = () => {
    return window.location.origin + "/event/" + eventObjectId;
  };

  return (
    <div className={styles.Dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.DashboardInfo}>
        <div className={styles.DashboardInfoBlock}>
          <h3>Tickets Sold</h3>
          <div>
            <span>
              {data[0]?.get("eventTicketSold")
                ? data[0]?.get("eventTicketSold")
                : 0}
            </span>
            /
            <span>
              {data[0]?.get("eventTicketTotal")
                ? data[0]?.get("eventTicketTotal")
                : 0}
            </span>
          </div>
        </div>
        <div className={styles.DashboardInfoBlock}>
          <h3>Page Views</h3>
          <div>
            <span>0</span>
          </div>
        </div>
      </div>
      <div className={styles.DashboardShare}>
        <h2>Share</h2>
        <span>
          <b>Event URL</b>
        </span>
        <br />
        <span className={styles.DashboardShareLink}>{getPreviewUrl()}</span>
        <div className={styles.DashboardShareIcons}>
          <span>
            <img src={facebook} alt="facebook" />
          </span>
          <span>
            <img src={twitter} alt="twitter" />
          </span>
          <span>
            <img src={linkedin} alt="linkedin" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
