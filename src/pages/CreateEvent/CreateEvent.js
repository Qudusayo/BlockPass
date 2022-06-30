import console from "console-browserify";
import { Country, State } from "country-state-city";

import styles from "./CreateEvent.module.scss";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Moralis from "moralis";
import BlockSelector from "../../components/BlockSelector/BlockSelector";

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
          <label className={styles.EventSectorContentInputLg}>
            <span>Event Title</span>
            <input placeholder="Be clear and descriptive" />
          </label>
          <div className={styles.InputExtraData}>
            <span>Title is required</span>
            <span>{0}/75</span>
          </div>
          <label className={styles.EventSectorContentInputLg}>
            <span>Organizer</span>
            <select>
              <option value="">Unnaamed organizer</option>
            </select>
          </label>
          <span style={{ fontSize: ".75em", width: "100%", marginTop: ".5em" }}>
            This profile describes a unique organizer and shows all of the
            events on one page. View Organizer Info
          </span>
          <div className={styles.EventSectorContentFlex}>
            <label className={styles.EventSectorContentInputLg}>
              <select style={{ padding: "1em 0" }}>
                <option>Type</option>
              </select>
            </label>
            <label className={styles.EventSectorContentInputLg}>
              <select style={{ padding: "1em 0" }}>
                <option>Catgeory</option>
              </select>
            </label>
          </div>
          <h3>Tags</h3>
          <span style={{ width: "100%", marginTop: "1em" }}>
            Improve discoverability of your event by adding tags relevant to the
            subject matter.
          </span>
          <div className={styles.EventSectorContentTag}>
            <div>
              <label className={styles.EventSectorContentInputLg}>
                <span>Press Enter to add a tag</span>
                <input placeholder="Add search keyword to your event" />
              </label>
              <div className={styles.InputExtraData}>
                <span>{0}/10 Tags</span>
                <span>{0}/25</span>
              </div>
            </div>
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
              <label className={styles.EventSectorContentInputLg}>
                <span>Venue Name</span>
                <input placeholder="e.g Qudusayo home theatre" />
              </label>
              <div className={styles.InputExtraData}>
                <span>Venue Name is required</span>
                <span>{0}/500</span>
              </div>
              <h3>Street Address</h3>
              <div className={styles.EventSectorContentFlex}>
                <label className={styles.EventSectorContentInputLg}>
                  <span>Address 1</span>
                  <input type={"text"} placeholder={"e.g 155 5th Street"} />
                </label>
                <label className={styles.EventSectorContentInputLg}>
                  <span>Address 2</span>
                  <input type={"text"} />
                </label>
              </div>
              <div className={styles.EventSectorContentFlex}>
                <label className={styles.EventSectorContentInputLg}>
                  <span>Country</span>
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
                </label>
                <label className={styles.EventSectorContentInputLg}>
                  <span>State</span>
                  <select onChange={selectSt} value={formik.values.state}>
                    <option
                      disabled={formik.values.state !== ""}
                      defaultValue=""
                    >
                      Choose state / province
                    </option>
                    {countryState.map((ctyState) => (
                      <option key={ctyState.isoCode} value={ctyState.isoCode}>
                        {ctyState.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className={styles.EventSectorContentFlex}>
                <label className={styles.EventSectorContentInputLg}>
                  <span>City</span>
                  <input type={"text"} placeholder={"e.g Ibadan"} />
                </label>
                <label className={styles.EventSectorContentInputLg}>
                  <span>ZIP Code</span>
                  <input type={"text"} placeholder={"e.g 20084"} />
                </label>
              </div>
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
              <div className={styles.EventSectorContentFlex}>
                <label className={styles.EventSectorContentInputLg}>
                  <span>Event Starts</span>
                  <input type={"date"} />
                </label>
                <label className={styles.EventSectorContentInputLg}>
                  <span>Start Time</span>
                  <input type={"time"} />
                </label>
              </div>
              <div className={styles.EventSectorContentFlex}>
                <label className={styles.EventSectorContentInputLg}>
                  <span>Event Ends</span>
                  <input type={"date"} />
                </label>
                <label className={styles.EventSectorContentInputLg}>
                  <span>End Time</span>
                  <input type={"time"} />
                </label>
              </div>
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
          {formik.values.eventType === "recurring" && (
            <>
              {" "}
              <span>
                You'll be able to set a schedule for your recurring event in the
                next step. Event details and ticket types will apply to all
                instances.
              </span>
              <div className={styles.EventSectorContentFlex}>
                <label className={styles.EventSectorContentInputLg}>
                  <span>Event Ends</span>
                  <input type={"date"} />
                </label>
                <label className={styles.EventSectorContentInputLg}>
                  <span>End Time</span>
                  <input type={"time"} />
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
          <div
            className={styles.EventSectorContentFlex}
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <label className={styles.EventSectorContentInputLg}>
              <span>Time Zone</span>
              <select>
                <option>Choose time zone</option>
              </select>
            </label>
            <label className={styles.EventSectorContentInputLg}>
              <span>Event Page Language</span>
              <select>
                <option>English (UK)</option>
              </select>
            </label>
          </div>
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
