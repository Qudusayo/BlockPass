import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import BlockSelector from "../../components/BlockSelector/BlockSelector";
import FlexInput from "../../components/FlexInput/FlexInput";
import console from "console-browserify";

import ticketIcon from "./../../assets/icons/ticket.png";

import styles from "./Ticket.module.scss";
import { useMoralisQuery, useNewMoralisObject } from "react-moralis";
import { Link, useLocation } from "react-router-dom";

function TicketForm(props) {
  const location = useLocation();
  const ticketObject = useNewMoralisObject("Ticket");
  const [eventObjectId, setEventObjectId] = useState("");
  const { fetch, data: eventData } = useMoralisQuery(
    "Events",
    (query) => query.equalTo("objectId", eventObjectId),
    [eventObjectId],
    { live: true, autoFetch: false }
  );

  const formik = useFormik({
    initialValues: {
      type: "paid",
      ticketName: "",
      ticketQuantity: 0,
      ticketPrice: "",
      ticketSaleStartDate: "",
      ticketSaleStartTime: "",
      ticketSaleEndDate: "",
      ticketSaleEndTime: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      addTicketEvent();
    },
  });

  useEffect(() => {
    let pathname = location.pathname.split("/");
    if (pathname.length === 5) {
      let eventId = pathname[3];
      console.log(eventId);
      setEventObjectId(eventId);
    }
  }, []);

  useEffect(() => {
    !!eventObjectId && fetch();
  }, [eventObjectId]);

  const addTicketEvent = async () => {
    let event = eventData[0];
    const ticketInfo = { ...formik.values };
    const savedTicket = await ticketObject.save(ticketInfo);
    event.set("ticket", savedTicket);
    await event.save();
    console.log(ticketInfo);
  };

  const cancelEntryAndReset = () => {
    formik.resetForm();
    return props.setIsActive();
  };

  return (
    <form
      className={[
        styles.TicketForm,
        props.isActive ? styles.TicketFormIn : styles.TicketFormOut,
      ].join(" ")}
      onSubmit={formik.handleSubmit}
    >
      <div className={styles.TicketFormHeader}>
        <h2>Add tickets</h2>
        <a>Learn More</a>
      </div>
      <div className={styles.TicketFormContent}>
        <BlockSelector
          name={"type"}
          values={[
            { name: "Paid", id: "paid" },
            { name: "Free", id: "free" },
            { name: "Donation", id: "donation" },
          ]}
          currentValue={formik.values.type}
          onChange={(e) =>
            formik.setValues({ ...formik.values, type: e.target.value })
          }
        />
        <FlexInput
          inputs={[
            {
              className: "md100",
              title: "Name",
              extraData: ["Title is required", `0/50`],
              element: (
                <input
                  placeholder="Ticket name"
                  value={formik.values.ticketName}
                  onChange={(e) =>
                    formik.setValues({
                      ...formik.values,
                      ticketName: e.target.value,
                    })
                  }
                />
              ),
            },
          ]}
        />
        <FlexInput
          inputs={[
            {
              className: "md100",
              title: "Available quantity",
              extraData: ["Quantity is required"],
              element: (
                <input
                  value={formik.values.ticketQuantity}
                  onChange={(e) =>
                    formik.setValues({
                      ...formik.values,
                      ticketQuantity: e.target.value,
                    })
                  }
                />
              ),
            },
          ]}
        />
        <FlexInput
          inputs={[
            {
              className: "md100",
              title: "Price - ($MATIC)",
              element: (
                <input
                  placeholder="0.00"
                  disabled={["free", "donation"].includes(formik.values.type)}
                  value={formik.values.ticketPrice}
                  onChange={(e) =>
                    formik.setValues({
                      ...formik.values,
                      ticketPrice: e.target.value,
                    })
                  }
                />
              ),
            },
          ]}
        />
        <FlexInput
          inputs={[
            {
              className: "md49",
              title: "Sales Starts",
              element: (
                <input
                  type={"date"}
                  value={formik.values.ticketSaleStartDate}
                  onChange={(e) =>
                    formik.setValues({
                      ...formik.values,
                      ticketSaleStartDate: e.target.value,
                    })
                  }
                />
              ),
            },
            {
              className: "md49",
              title: "Start Time",
              element: (
                <input
                  type={"time"}
                  value={formik.values.ticketSaleStartTime}
                  onChange={(e) =>
                    formik.setValues({
                      ...formik.values,
                      ticketSaleStartTime: e.target.value,
                    })
                  }
                />
              ),
            },
          ]}
        />
        <FlexInput
          inputs={[
            {
              className: "md49",
              title: "Sales Ends",
              element: (
                <input
                  type={"date"}
                  value={formik.values.ticketSaleEndDate}
                  onChange={(e) =>
                    formik.setValues({
                      ...formik.values,
                      ticketSaleEndDate: e.target.value,
                    })
                  }
                />
              ),
            },
            {
              className: "md49",
              title: "End Time",
              element: (
                <input
                  type={"time"}
                  value={formik.values.ticketSaleEndTime}
                  onChange={(e) =>
                    formik.setValues({
                      ...formik.values,
                      ticketSaleEndTime: e.target.value,
                    })
                  }
                />
              ),
            },
          ]}
        />
      </div>
      <div className={styles.TicketFormFooter}>
        <div>
          <button onClick={cancelEntryAndReset} type="button">
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}

function Ticket() {
  const [isActive, setIsActive] = useState(false);
  const [ticket, setTicket] = useState({});
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
    if (pathname.length === 5) {
      let eventId = pathname[3];
      setEventObjectId(eventId);
    }
  }, []);

  useEffect(() => {
    !!eventObjectId &&
      fetch({
        onSuccess: async (data) => {
          let ticket = data[0].get("ticket");
          await ticket.fetch();
          setTicket(ticket);
        },
        onError: (err) => {
          console.log(err);
          console.log("Should redirect to 404 Page");
        },
      });
  }, [eventObjectId]);

  useEffect(() => console.log(ticket), [ticket]);

  const setIsActiveHandler = () => setIsActive((prevValue) => !prevValue);

  return (
    <div className={styles.Ticket}>
      {ticket.attributes ? (
        <div className={styles.Events}>
          <h1>Tickets</h1>
          <nav>
            <ul>
              <li>Admission</li>
              <li>Add-on</li>
              <li>Promo Codes</li>
              <li>Holds</li>
              <li>Settings</li>
            </ul>
          </nav>
          <div className={styles.EventsSelector}>
            <button onClick={setIsActiveHandler}>Add tickets</button>
          </div>

          <div className={styles.EventsTable}>
            <div className={styles.EventsTableBody}>
              <div className={styles.EventsTableBodyRow}>
                <div className={styles.EventsTableBodyRowInfo}>
                  <span className={styles.EventsTableBodyRowInfoTitle}>
                    {ticket.get("ticketName")}
                  </span>
                  <span className={styles.EventsTableBodyRowInfoDate}>
                    Friday, June 24, 2022 at 7:00 PM WAT
                  </span>
                </div>
                <span className={styles.EventsTableBodyRowSold}>
                  0/{ticket.get("ticketQuantity")}
                </span>
                <span className={styles.EventsTableBodyRowGross}>
                  {ticket.get("type") === "free"
                    ? ticket.get("type")
                    : `$ ` + ticket.get("ticketPrice")}
                </span>
                <span className={styles.EventsTableBodyRowOptions}>...</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.TicketPage}>
          <img src={ticketIcon} alt="ticketIcon" />
          <h2>Let's create tickets</h2>
          <p>
            Create a section if you want to sell multiple ticket types that
            share the same inventory. i.e. Floor, Mezzanine.
          </p>
          <div className={styles.TicketPageButton}>
            <div>
              <button>Create a section</button>
              <button onClick={setIsActiveHandler}>Add tickets</button>
            </div>
          </div>
        </div>
      )}
      <TicketForm setIsActive={setIsActiveHandler} isActive={isActive} />
    </div>
  );
}

export default Ticket;
