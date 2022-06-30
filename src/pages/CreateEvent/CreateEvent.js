import console from "console-browserify";
import { Country, State } from "country-state-city";

import styles from "./CreateEvent.module.scss";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Moralis from "moralis";
import BlockSelector from "../../components/BlockSelector/BlockSelector";
import FlexInput from "../../components/FlexInput/FlexInput";

function CreateEvent() {
  const [countries, setCountries] = useState([]);
  const [countryState, setCountryState] = useState([]);

  const formik = useFormik({
    initialValues: {
      location: "venue",
      eventType: "single",
      country: "",
      state: "",
    },
  });

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    const countriesData = allCountries.map((country) => {
      return { name: country.name, isoCode: country.isoCode };
    });
    setCountries(countriesData);
    window.Moralis = Moralis;
  }, []);

  useEffect(() => console.log(formik.values), [formik.values]);

  const selectCt = (e) => {
    let country = e.target.value;
    formik.setValues({ ...formik.values, country, state: "" });
    const states = State.getStatesOfCountry(country);
    const statesData = states.map((state) => {
      return { name: state.name, isoCode: state.isoCode };
    });
    setCountryState(statesData);
  };
  const selectSt = (e) => {
    let state = e.target.value;
    formik.setValues({ ...formik.values, state });
  };

  return (
    <div className={styles.Event}>
      <div className={styles.EventSector}>
        <div className={styles.EventSectorContent}>
          <h1>Basic Info</h1>
          <span>
            Name your event and tell event-goers why they should come. Add
            details that highlight what makes it unique.
          </span>
          <FlexInput
            inputs={[
              {
                className: "md100",
                title: "Event Title",
                extraData: ["Title is required", `0/75`],
                element: <input placeholder="Be clear and descriptive" />,
              },
            ]}
          />
          <FlexInput
            inputs={[
              {
                className: "md100",
                title: "Organizer",
                extraData: [
                  "This profile describes a unique organizer and shows all the events on one page. View Organizer Info",
                ],
                element: (
                  <select>
                    <option value="">Unnaamed organizer</option>
                  </select>
                ),
              },
            ]}
          />
          <FlexInput
            inputs={[
              {
                className: "md49",
                element: (
                  <select>
                    <option>Catgeory</option>
                  </select>
                ),
              },
              {
                className: "md49",
                element: (
                  <select>
                    <option>Type</option>
                  </select>
                ),
              },
            ]}
          />

          <h3>Tags</h3>
          <span style={{ width: "100%", marginTop: "1em" }}>
            Improve discoverability of your event by adding tags relevant to the
            subject matter.
          </span>
          <div className={styles.EventSectorContentTag}>
            <FlexInput
              inputs={[
                {
                  className: "md100",
                  title: "Press Enter to add a tag",
                  extraData: ["0/10 Tags", `0/25`],
                  element: (
                    <input placeholder="Add search keyword to your event" />
                  ),
                },
              ]}
            />
            <button>Add</button>
          </div>
        </div>
      </div>
      <div className={styles.EventSector}>
        <div className={styles.EventSectorContent}>
          <h1>Location</h1>
          <span>
            Help people in the area discover your event and let attendees know
            where to show up.
          </span>
          <BlockSelector
            name={"location"}
            values={[
              { name: "Venue", id: "venue" },
              { name: "Online Event", id: "online" },
              { name: "To be announced", id: "tba" },
            ]}
            currentValue={formik.values.location}
            onChange={(e) =>
              formik.setValues({ ...formik.values, location: e.target.value })
            }
          />
          {formik.values.location === "venue" && (
            <>
              <h5>Venue Location</h5>
              <FlexInput
                inputs={[
                  {
                    className: "md100",
                    title: "Venue Name",
                    extraData: ["Venue Name is required", `0/500`],
                    element: <input placeholder="e.g Qudusayo home theatre" />,
                  },
                ]}
              />

              <h3>Street Address</h3>
              <FlexInput
                inputs={[
                  {
                    className: "md49",
                    title: "Address 1",
                    element: (
                      <input type={"text"} placeholder={"e.g 155 5th Street"} />
                    ),
                  },
                  {
                    className: "md49",
                    title: "Address 2",
                    element: <input type={"text"} />,
                  },
                ]}
              />
              <FlexInput
                inputs={[
                  {
                    className: "md49",
                    title: "Country",
                    element: (
                      <select onChange={selectCt} value={formik.values.country}>
                        <option
                          defaultValue=""
                          disabled={formik.values.country !== ""}
                        >
                          Choose country
                        </option>
                        {countries.map((country) => (
                          <option key={country.isoCode} value={country.isoCode}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    ),
                  },
                  {
                    className: "md49",
                    title: "State",
                    element: (
                      <select onChange={selectSt} value={formik.values.state}>
                        <option
                          disabled={formik.values.state !== ""}
                          defaultValue=""
                        >
                          Choose state / province
                        </option>
                        {countryState.map((ctyState) => (
                          <option
                            key={ctyState.isoCode}
                            value={ctyState.isoCode}
                          >
                            {ctyState.name}
                          </option>
                        ))}
                      </select>
                    ),
                  },
                ]}
              />

              <FlexInput
                inputs={[
                  {
                    className: "md49",
                    title: "City",
                    element: <input type={"text"} placeholder={"e.g Ibadan"} />,
                  },
                  {
                    className: "md49",
                    title: "ZIP Code",
                    element: <input type={"text"} placeholder={"e.g 20084"} />,
                  },
                ]}
              />
            </>
          )}
          {formik.values.location === "online" && (
            <span>
              Online events have unique event pages where you can add links to
              livestreams and more
            </span>
          )}
        </div>
      </div>
      <div className={styles.EventSector}>
        <div className={styles.EventSectorContent}>
          <h1>Date and Time </h1>
          <span>
            Tell event-goers when your event starts and ends so they can make
            plans to attend.
          </span>
          <BlockSelector
            name={"eventType"}
            values={[
              { name: "Single Event", id: "single" },
              { name: "Recurring Event", id: "recurring" },
            ]}
            currentValue={formik.values.eventType}
            onChange={(e) =>
              formik.setValues({ ...formik.values, eventType: e.target.value })
            }
          />
          {formik.values.eventType === "single" && (
            <>
              <span>Single event happens once and can last multiple days</span>
              <FlexInput
                inputs={[
                  {
                    className: "md49",
                    title: "Event Starts",
                    element: <input type={"date"} />,
                  },
                  {
                    className: "md49",
                    title: "Start Time",
                    element: <input type={"time"} />,
                  },
                ]}
              />
              <FlexInput
                inputs={[
                  {
                    className: "md49",
                    title: "Event Ends",
                    element: <input type={"date"} />,
                  },
                  {
                    className: "md49",
                    title: "End Time",
                    element: <input type={"time"} />,
                  },
                ]}
              />
              <div className={styles.CheckBox}>
                <input type={"checkbox"} id="startTime" />
                <label htmlFor="startTime">
                  <span>Display start time</span>
                  <span>
                    The start time of your event will be displayed to attendees.
                  </span>
                </label>
              </div>
            </>
          )}

          <div className={styles.CheckBox}>
            <input type={"checkbox"} id="endTime" />
            <label htmlFor="endTime">
              <span>Display End Time</span>
              <span>
                The end time of your event will be displayed to attendees.
              </span>
            </label>
          </div>
          <FlexInput
            inputs={[
              {
                className: "md48",
                title: "Time Zone",
                element: (
                  <select>
                    <option>Choose time zone</option>
                  </select>
                ),
              },
            ]}
          />
          <FlexInput
            inputs={[
              {
                className: "md48",
                title: "Event Page Language",
                element: (
                  <select>
                    <option>English (UK)</option>
                  </select>
                ),
              },
            ]}
          />
        </div>
      </div>
      <div className={styles.EventConclusion}>
        <div>
          <button>Discard</button>
          <button>Save & Continue</button>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
