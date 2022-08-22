import styles from "./Event.module.scss";
import console from "console-browserify";

import like from "../../assets/icons/like.svg";
import upload from "../../assets/icons/share.svg";
import facebook from "../../assets/icons/facebook.svg";
import twitter from "../../assets/icons/twitter.svg";
import linkedin from "../../assets/icons/linkedin.svg";

import ivanontech from "./../../assets/images/ivanontech.jpeg";
import { useEffect, useRef, useState } from "react";
import EventCard from "../../components/EventCard/EventCard";
import Spinner from "../../components/Spinner/Spinner";
import {
  useMoralis,
  useMoralisQuery,
  useNativeBalance,
  useWeb3ExecuteFunction,
} from "react-moralis";
import { useLocation } from "react-router-dom";
import moment from "moment";
import ticketMetadata from "./../../assets/ticket_metadata.json";

function Event() {
  const { account } = useMoralis();
  const location = useLocation();
  const eventId = location.pathname.split("/")[2];
  const { fetch } = useWeb3ExecuteFunction();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const { data } = useMoralisQuery(
    "Events",
    (query) => query.equalTo("objectId", eventId),
    [eventId],
    { autoFetch: true }
  );
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef();
  const { getBalances } = useNativeBalance();
  const { isInitialized, isAuthenticated } = useMoralis();

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      getBalances({
        onSuccess: (res) => console.log(res),
      });
    }
  }, [isInitialized, isAuthenticated]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    const cachedRef = ref.current,
      observer = new IntersectionObserver(
        ([e]) => setIsSticky(e.intersectionRatio < 1),
        {
          threshold: [1],
        }
      );

    observer.observe(cachedRef);

    // unmount
    return function () {
      observer.unobserve(cachedRef);
    };
  }, []);

  useEffect(() => {
    let date = moment(data[0]?.get("eventStartDate")).format("MMM");
    console.log(date);
  }, [data]);

  const purchaseTicket = () => {
    console.log("Purchasing Ticket");
    setIsPurchasing((init) => !init);
    let contractAddress = data[0].get("ticketAddress");
    console.log(contractAddress);
    fetch({
      params: {
        abi: ticketMetadata,
        functionName: "safeMint",
        contractAddress,
        params: {
          to: account,
        },
      },
      onSuccess: async (res) => {
        console.log(res);
        let tx = res;
        await tx.wait();
        console.log(tx);
        data[0].set(
          "eventTicketSold",
          parseInt(data[0].get("eventTicketSold")) + 1
        );
        await data[0].save();
        return setIsPurchasing((init) => !init);
      },
      onError: (error) => {
        console.log(error);
        return setIsPurchasing((init) => !init);
      },
    });
  };

  const shortenAddress = (address) => {
    return !!address
      ? address.slice(0, 7) +
          "...." +
          address.slice(address.length - 7, address.length)
      : null;
  };

  return (
    <div className={styles.Event}>
      <div
        className={styles.EventBG}
        style={{
          backgroundImage: `url("${
            ivanontech && data[0] && data[0]?.get("eventImage")
          }")`,
        }}
      >
        <div className={styles.EventBGBlur}></div>
      </div>

      <div className={styles.EventCard}>
        <div className={styles.EventCardHeader}>
          <div
            className={styles.EventCardHeaderBanner}
            style={{
              backgroundImage: `url("${
                ivanontech && data[0] && data[0]?.get("eventImage")
              }")`,
            }}
          ></div>
          <div className={styles.EventCardHeaderTitle}>
            <div>
              <span>
                {moment(data[0]?.get("eventStartDate")).format("MMM")} <br />{" "}
                {moment(data[0]?.get("eventStartDate")).format("D")}
              </span>
            </div>
            <div>
              <h3>{data[0]?.get("eventTitle")}</h3>
              <span>
                by {shortenAddress(data[0]?.get("creator")?.get("ethAddress"))}
              </span>
              <br />
              <span>Follow</span>
            </div>
            <div>${data[0]?.get("eventTicketPrice")}</div>
          </div>
        </div>
        <div
          className={[
            styles.EventButtons,
            isSticky ? styles.EventButtonsSticky : null,
          ].join(" ")}
          ref={ref}
        >
          <div className={styles.EventButtonsShare}>
            <div className={styles.EventButtonsShareIcons}>
              <div>
                <img src={upload} alt="share" />
              </div>
              <div>
                <img src={like} alt="like" />
              </div>
            </div>
            <span className={styles.price}>
              ${data[0]?.get("eventTicketPrice")}
            </span>
          </div>
          {data[0]?.get("ticketAddress") ? (
            <div className={styles.EventButtonsPurchase}>
              <button onClick={purchaseTicket} disabled={isPurchasing}>
                {isPurchasing ? <Spinner /> : "Get Ticket"}
              </button>
            </div>
          ) : null}
        </div>
        <div className={styles.EventInfo}>
          <div className={styles.EventInfoLocation}>
            <div>
              <h3>Date and Time</h3>
              <span>
                {data[0]?.get("eventStartDate")
                  ? moment(
                      `${data[0]?.get("eventStartDate")} ${data[0]?.get(
                        "eventStartTime"
                      )}`
                    ).format("llll")
                  : null}{" "}
                -
              </span>
              <br />
              <span>
                {data[0]?.get("eventEndDate")
                  ? moment(
                      `${data[0]?.get("eventEndDate")} ${data[0]?.get(
                        "eventEndTime"
                      )}`
                    ).format("llll")
                  : null}
              </span>
            </div>
            <div>
              <h3>Location</h3>
              <address>
                {data[0]?.get("eventAddress1")}
                <br />
                {data[0]?.get("eventAddress2")}
                <br />
                {data[0]?.get("eventZipCode")} {data[0]?.get("eventCity")}
                <br />
                {data[0]?.get("eventCountry")}
                <br />
              </address>
            </div>
            <div>
              <h3>Refund Policy</h3>
              Contact the organiser to request a refund. Eventbrite's fee is
              nonrefundable.
            </div>
          </div>
          <div className={styles.EventInfoData}>
            <h4>{data[0]?.get("eventTitle")}</h4>
            <h3>About this event</h3>
            <div
              dangerouslySetInnerHTML={{ __html: data[0]?.get("eventDetails") }}
            ></div>
            <h3 className={styles.EventInfoHeader}>Tags</h3>
            <div className={styles.EventInfoDataTags}>
              {data[0]?.get("eventTags").map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </div>
            <h3 className={styles.EventInfoHeader}>Share with friends</h3>
            <div className={styles.EventInfoShareIcons}>
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
        <div className={styles.EventLoc}>
          <h3>{data[0]?.get("eventTitle")}</h3>
          <span>at</span>
          <h3>Mojito Temple</h3>
          <span>Rua António Feu 8500-802 Portimão</span>
        </div>
        <div className={styles.EventOwner}>
          <h3>Moralis Web3</h3>
          <span>Orginiser of {data[0]?.get("eventTitle")}</span>
          <div className={styles.EventOwnerButton}>
            <button>Follow</button>
            <button>Contact</button>
          </div>
        </div>
      </div>

      <div className={styles.EventExtra}>
        <h2>Other events you may like</h2>
        <div className={styles.EventExtraFlexBox}>
          {Array(3)
            .fill("")
            .map((_, index) => (
              <EventCard key={index} imageHeader={ivanontech} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Event;
