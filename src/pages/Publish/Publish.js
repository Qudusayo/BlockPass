import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import console from "console-browserify";
import {
  useApiContract,
  useMoralis,
  useMoralisQuery,
  useWeb3ExecuteFunction,
} from "react-moralis";
import FlexInput from "../../components/FlexInput/FlexInput";
import styles from "./Publish.module.scss";
import noimg from "../../assets/images/noimg.png";
import mainMetadata from "./../../assets/main_metadata.json";
import Spinner from "../../components/Spinner/Spinner";

function Publish() {
  const { Moralis } = useMoralis();
  const navigate = useNavigate();
  const { fetch } = useWeb3ExecuteFunction();
  const { runContractFunction } = useApiContract({
    chain: "0x13881",
    address: "0x6a13a751F5588Ec691e1A7704e939d2126A351F4",
    functionName: "createdTicket",
    abi: mainMetadata,
  });
  const location = useLocation();
  const [eventObjectId, setEventObjectId] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [eventAttributes, setEventAttributes] = useState({
    eventImage: noimg,
    eventTitle: "",
  });
  const { data } = useMoralisQuery(
    "Events",
    (query) => query.equalTo("objectId", eventObjectId),
    [eventObjectId],
    { live: true }
  );

  useEffect(() => {
    let pathname = location.pathname.split("/");
    if (pathname.length === 5) {
      let eventId = pathname[3];
      console.log(eventId);
      setEventObjectId(eventId);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (data.length === 1) {
      console.log(data[0].attributes);
      let { eventImage, eventTitle } = data[0].attributes;
      setEventAttributes({
        eventImage,
        eventTitle,
      });
    }
  }, [data]);

  const getPreviewUrl = () => {
    return window.location.origin + "/event/" + eventObjectId;
  };

  const publishEvent = async () => {
    console.log("Publishing Event");
    setIsPublishing((init) => !init);
    const eventStartDate = data[0].get("eventStartDate");
    const date = new Date(eventStartDate);
    const unixTimestamp = Math.floor(date.getTime() / 1000);

    const metadata = {
      description: data[0].get("eventSummary"),
      external_url: "https://blockpass.me",
      image:
        "https://gateway.pinata.cloud/ipfs/QmXUp6yM7hVTBCsRSwC9LD1f9kXfrEx1sYScvDXvVrHbs1",
      name: data[0].get("eventTitle"),
      attributes: [
        {
          trait_type: "Ticket",
          value: "Event",
        },
        {
          trait_type: "Purchased",
          value: "True",
        },
        {
          display_type: "date",
          trait_type: "Event Date",
          value: unixTimestamp,
        },
      ],
    };

    const file = new Moralis.File("metadata.json", {
      base64: btoa(JSON.stringify(metadata)),
    });
    await file.saveIPFS();
    const ipfsHash = file._hash;

    console.log(ipfsHash);
    fetch({
      params: {
        abi: mainMetadata,
        functionName: "createTicket",
        contractAddress: "0x6a13a751F5588Ec691e1A7704e939d2126A351F4",
        params: {
          _baseUrl: ipfsHash,
          _price: 0,
          _objectId: eventObjectId,
        },
      },
      onSuccess: async (res) => {
        console.log(res);
        let tx = res;
        await tx.wait();
        let ticketAddress = await runContractFunction();
        console.log(ticketAddress);
        data[0].set("ticketAddress", ticketAddress);
        await data[0].save();
        setIsPublishing((init) => !init);
        return navigate(`/myevent/${eventObjectId}`);
      },
      onError: (error) => {
        console.log(error);
        return setIsPublishing((init) => !init);
      },
    });
    // REACT_APP_MAIN_CONTRACT_ADDRESS
  };

  return (
    <div className={styles.Publish}>
      <h2>Publish your event</h2>
      <div className={styles.PublishCard}>
        <div
          className={styles.PublishCardImg}
          style={{
            backgroundImage: !!eventAttributes.eventImage
              ? `url(${eventAttributes.eventImage})`
              : `url(${noimg})`,
          }}
        ></div>
        <div className={styles.PublishCardContent}>
          <h3>{eventAttributes.eventTitle}</h3>
          <p>Sunday, July 31, 2022 at 7:00 PM WAT</p>
          <p>Ajibode Road, Ibadan, YO 200132</p>
          <span>A simple summary</span>
          <div className={styles.PublishCardLine}></div>
          <a href={getPreviewUrl()} target="_blank" rel="noopener noreferer">
            Preview
          </a>
        </div>
      </div>

      <div className={styles.PublishOptions}>
        <div className={styles.PublishOptionsViews}>
          <h2>Who can see your event?</h2>
          <label htmlFor="public">
            <input id="public" name="view" type="radio" />
            <span>Public</span>
          </label>
          <label htmlFor="private">
            <input id="private" name="view" type="radio" />
            <span>Private</span>
          </label>
        </div>
        <div className={styles.PublishOptionsSchedule}>
          <h2>When should we publish your event?</h2>
          <label htmlFor="publish-now">
            <input id="publish-now" name="schedule" type="radio" />
            <span>Publish Now</span>
          </label>
          <label htmlFor="scheduled">
            <input id="scheduled" name="schedule" type="radio" />
            <span>Schedule for later</span>
          </label>
          <FlexInput
            inputs={[
              {
                className: "md49",
                title: "Start Date",
                element: <input type={"date"} />,
              },
              {
                className: "md49",
                title: "Start Time",
                element: <input type={"time"} />,
              },
            ]}
          />
        </div>
      </div>
      <div className={styles.PublishFooter}>
        <div>
          <button type="button" onClick={publishEvent} disabled={isPublishing}>
            {isPublishing ? <Spinner /> : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Publish;
