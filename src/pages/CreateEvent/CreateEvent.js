import console from "console-browserify";
import { Country, State } from "country-state-city";

import styles from "./CreateEvent.module.scss";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import BlockSelector from "../../components/BlockSelector/BlockSelector";
import FlexInput from "../../components/FlexInput/FlexInput";
import {
  useMoralis,
  useMoralisQuery,
  useNewMoralisObject,
} from "react-moralis";

import remove from "./../../assets/icons/reset.svg";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

function CreateEvent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [eventObjectId, setEventObjectId] = useState("");
  const { data, fetch } = useMoralisQuery(
    "Events",
    (query) => query.equalTo("objectId", eventObjectId),
    [eventObjectId],
    { live: true }
  );

  const { user, Moralis } = useMoralis();
  const { save } = useNewMoralisObject("Events");
  const [countries, setCountries] = useState([]);
  const [countryState, setCountryState] = useState([]);
  const [eventTags, setEventTags] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const formik = useFormik({
    initialValues: {
      eventTitle: "",
      eventOrganizer: "",
      eventCategory: "",
      eventTypeOption: "",
      eventTags: "",
      location: "venue",
      eventVenue: "",
      eventAddress1: "",
      eventAddress2: "",
      eventCountry: "",
      eventState: "",
      eventCity: "",
      eventZipCode: "",
      eventStartDate: "",
      eventStartTime: "",
      eventEndDate: "",
      eventEndTime: "",
      eventType: "single",
      country: "",
      state: "",
      eventTimeZone: "",
      eventPageLanguage: "",
      eventStatus: "Draft",
      eventImage: "",
      eventTicketTotal: 0,
      eventTicketSold: 0,
      eventTicketPrice: 0,
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      saveEvent();
    },
  });

  const addTag = () => {
    setEventTags((prevTags) => [...prevTags, formik.values.eventTags]);
    formik.setValues({ ...formik.values, eventTags: "" });
  };

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    const countriesData = allCountries.map((country) => {
      return { name: country.name, isoCode: country.isoCode };
    });
    setCountries(countriesData);

    let pathname = location.pathname.split("/");
    if (pathname.length === 5) {
      let eventId = pathname[3];
      // console.log(eventId);
      setEventObjectId(eventId);
    }
  }, []);

  useEffect(() => {
    if (data.length === 1) {
      // console.log(data[0].attributes);
      formik.setValues({ ...formik.values, ...data[0].attributes });
    }
  }, [data]);

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

  const saveEvent = async () => {
    setIsSaving(true);
    const data = {
      ...formik.values,
      eventTags,
      creator: user,
    };

    if (!!eventObjectId) {
      let eventDataKeys = Object.keys(formik.values);
      let eventData = (await fetch())[0];
      await eventDataKeys.forEach(async (attribute) => {
        await eventData.set(attribute, eventData.attributes[attribute]);
        await eventData.save();
      });
      setIsSaving(false);
      navigate(`/manage/events/${eventObjectId}/details`);
    } else {
      save(data, {
        onSuccess: async (createdEvent) => {
          const createdEventACL = new Moralis.ACL();
          createdEventACL.setPublicReadAccess(true);
          createdEventACL.setWriteAccess(user, true);
          createdEvent.setACL(createdEventACL);
          await createdEvent.save(null, { useMasterKey: true });
          setIsSaving(false);
          const eventId = createdEvent.id;
          navigate(`/manage/events/${eventId}/details`);
        },
        onError: (error) => {
          // Execute any logic that should take place if the save fails.
          // error is a Moralis.Error with an error code and message.
          alert(
            "Failed to create new object, with error code: " + error.message
          );
          setIsSaving(false);
        },
      });
    }
  };

  return (
    <form className={styles.Event} onSubmit={formik.handleSubmit}>
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
                element: (
                  <input
                    placeholder="Be clear and descriptive"
                    value={formik.values.eventTitle}
                    onChange={(e) =>
                      formik.setValues({
                        ...formik.values,
                        eventTitle: e.target.value,
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
                title: "Organizer",
                extraData: [
                  "This profile describes a unique organizer and shows all the events on one page. View Organizer Info",
                ],
                element: (
                  <select
                    value={formik.values.eventOrganizer}
                    onChange={(e) =>
                      formik.setValues({
                        ...formik.values,
                        eventOrganizer: e.target.value,
                      })
                    }
                  >
                    <option value="">Unnaamed organizer</option>
                    <option value={user?.get("ethAddress")}>
                      This event is typically organized by{" "}
                      {user?.get("ethAddress")}
                    </option>
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
                  <select
                    value={formik.values.eventTypeOption}
                    onChange={(e) =>
                      formik.setValues({
                        ...formik.values,
                        eventTypeOption: e.target.value,
                      })
                    }
                  >
                    <option value="">Type</option>
                    <option value="Appearance or Signing">
                      Appearance or Signing
                    </option>
                    <option value="Attraction">Attraction</option>
                    <option value="Camp, Trip, or Retreat">
                      Camp, Trip, or Retreat
                    </option>
                    <option value="Class, Training, or Workshop">
                      Class, Training, or Workshop
                    </option>
                    <option value="Concert or Performance">
                      Concert or Performance
                    </option>
                    <option value="Conference">Conference</option>
                    <option value="Convention">Convention</option>
                    <option value="Dinner or Gala">Dinner or Gala</option>
                    <option value="Festival or Fair">Festival or Fair</option>
                    <option value="Game or Competition">
                      Game or Competition
                    </option>
                    <option value="Meeting or Networking Event">
                      Meeting or Networking Event
                    </option>
                    <option value="Other">Other</option>
                    <option value="Party or Social Gathering">
                      Party or Social Gathering
                    </option>
                    <option value="Race or Endurance Event">
                      Race or Endurance Event
                    </option>
                    <option value="Rally">Rally</option>
                    <option value="Screening">Screening</option>
                    <option value="Seminar or Talk">Seminar or Talk</option>
                    <option value="Tour">Tour</option>
                    <option value="Tournament">Tournament</option>
                    <option value="Tradeshow, Consumer Show, or Expo">
                      Tradeshow, Consumer Show, or Expo
                    </option>
                  </select>
                ),
              },
              {
                className: "md49",
                element: (
                  <select
                    value={formik.values.eventCategory}
                    onChange={(e) =>
                      formik.setValues({
                        ...formik.values,
                        eventCategory: e.target.value,
                      })
                    }
                  >
                    <option value="">Category</option>
                    <option value="Auto, Boat & Air">
                      Auto, Boat &amp; Air
                    </option>
                    <option value="Business & Professional">
                      Business &amp; Professional
                    </option>
                    <option value="Charity & Causes">
                      Charity &amp; Causes
                    </option>
                    <option value="Community & Culture">
                      Community &amp; Culture
                    </option>
                    <option value="Family & Education">
                      Family &amp; Education
                    </option>
                    <option value="Fashion & Beauty">
                      Fashion &amp; Beauty
                    </option>
                    <option value="Film, Media & Entertainment">
                      Film, Media &amp; Entertainment
                    </option>
                    <option value="Food & Drink">Food &amp; Drink</option>
                    <option value="Government & Politics">
                      Government &amp; Politics
                    </option>
                    <option value="Health & Wellness">
                      Health &amp; Wellness
                    </option>
                    <option value="Hobbies & Special Interest">
                      Hobbies &amp; Special Interest
                    </option>
                    <option value="Home & Lifestyle">
                      Home &amp; Lifestyle
                    </option>
                    <option value="Music">Music</option>
                    <option value="Other">Other</option>
                    <option value="Performing & Visual Arts">
                      Performing &amp; Visual Arts
                    </option>
                    <option value="Religion & Spirituality">
                      Religion &amp; Spirituality
                    </option>
                    <option value="School Activities">School Activities</option>
                    <option value="Science & Technology">
                      Science &amp; Technology
                    </option>
                    <option value="Seasonal & Holiday">
                      Seasonal &amp; Holiday
                    </option>
                    <option value="Sports & Fitness">
                      Sports &amp; Fitness
                    </option>
                    <option value="Travel & Outdoor">
                      Travel &amp; Outdoor
                    </option>
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
                    <input
                      value={formik.values.eventTags}
                      onChange={(e) =>
                        formik.setValues({
                          ...formik.values,
                          eventTags: e.target.value,
                        })
                      }
                      placeholder="Add search keyword to your event"
                    />
                  ),
                },
              ]}
            />
            <button onClick={addTag} type="button">
              Add
            </button>
          </div>
          <div className={styles.EventSectorContentTags}>
            {eventTags.map((tag, index) => (
              <div key={index} className={styles.EventSectorContentTagsValue}>
                <span>{tag}</span>
                <img src={remove} alt="remove tag" />
              </div>
            ))}
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
              { name: "Online Event", id: "Online" },
              { name: "To be announced", id: "To be announced" },
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
                    element: (
                      <input
                        value={formik.values.eventVenue}
                        onChange={(e) =>
                          formik.setValues({
                            ...formik.values,
                            eventVenue: e.target.value,
                          })
                        }
                        placeholder="e.g Qudusayo home theatre"
                      />
                    ),
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
                      <input
                        type={"text"}
                        value={formik.values.eventAddress1}
                        onChange={(e) =>
                          formik.setValues({
                            ...formik.values,
                            eventAddress1: e.target.value,
                          })
                        }
                        placeholder={"e.g 155 5th Street"}
                      />
                    ),
                  },
                  {
                    className: "md49",
                    title: "Address 2",
                    element: (
                      <input
                        value={formik.values.eventAddress2}
                        onChange={(e) =>
                          formik.setValues({
                            ...formik.values,
                            eventAddress2: e.target.value,
                          })
                        }
                        type={"text"}
                      />
                    ),
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
                    element: (
                      <input
                        type={"text"}
                        value={formik.values.eventCity}
                        onChange={(e) =>
                          formik.setValues({
                            ...formik.values,
                            eventCity: e.target.value,
                          })
                        }
                        placeholder={"e.g Ibadan"}
                      />
                    ),
                  },
                  {
                    className: "md49",
                    title: "ZIP Code",
                    element: (
                      <input
                        value={formik.values.eventZipCode}
                        type={"text"}
                        onChange={(e) =>
                          formik.setValues({
                            ...formik.values,
                            eventZipCode: e.target.value,
                          })
                        }
                        placeholder={"e.g 20084"}
                      />
                    ),
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
                    element: (
                      <input
                        type={"date"}
                        value={formik.values.eventStartDate}
                        onChange={(e) =>
                          formik.setValues({
                            ...formik.values,
                            eventStartDate: e.target.value,
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
                        value={formik.values.eventStartTime}
                        onChange={(e) =>
                          formik.setValues({
                            ...formik.values,
                            eventStartTime: e.target.value,
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
                    title: "Event Ends",
                    element: (
                      <input
                        value={formik.values.eventEndDate}
                        type={"date"}
                        onChange={(e) =>
                          formik.setValues({
                            ...formik.values,
                            eventEndDate: e.target.value,
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
                        value={formik.values.eventEndTime}
                        onChange={(e) =>
                          formik.setValues({
                            ...formik.values,
                            eventEndTime: e.target.value,
                          })
                        }
                      />
                    ),
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
                  <select
                    value={formik.values.eventTimeZone}
                    onChange={(e) =>
                      formik.setValues({
                        ...formik.values,
                        eventTimeZone: e.target.value,
                      })
                    }
                  >
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
                  <select
                    value={formik.values.eventPageLanguage}
                    onChange={(e) =>
                      formik.setValues({
                        ...formik.values,
                        eventPageLanguage: e.target.value,
                      })
                    }
                  >
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
          <button onClick={() => formik.resetForm()} type="button">
            Discard
          </button>
          <button type="submit" disabled={isSaving}>
            {isSaving ? <Spinner /> : "Save & Continue"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateEvent;
