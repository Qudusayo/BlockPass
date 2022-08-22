import console from "console-browserify";

import styles from "./Details.module.scss";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.bubble.css";
import FlexInput from "../../components/FlexInput/FlexInput";
import image from "../../assets/icons/image.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useMoralis, useMoralisQuery } from "react-moralis";
import Spinner from "../../components/Spinner/Spinner";

function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const { Moralis } = useMoralis();
  const [eventObjectId, setEventObjectId] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { fetch, data } = useMoralisQuery(
    "Events",
    (query) => query.equalTo("objectId", eventObjectId),
    [eventObjectId],
    { live: true, autoFetch: false }
  );
  const formik = useFormik({
    initialValues: {
      eventDetails: "",
      eventSummary: "",
      eventImage: "",
    },
  });
  const [modules, setModules] = useState({
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  });

  const [formats, setFormats] = useState([
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ]);

  useEffect(() => {
    let pathname = location.pathname.split("/");
    if (pathname.length === 5) {
      let eventId = pathname[3];
      console.log(eventId);
      setEventObjectId(eventId);
    }
  }, []);

  useEffect(() => {
    !!eventObjectId &&
      fetch({
        onSuccess: (data) => {
          console.log(data[0].attributes);
          return formik.setValues({ ...formik.values, ...data[0].attributes });
        },
        onError: (err) => {
          console.log(err);
          console.log("Should redirect to 404 Page");
        },
      });
  }, [eventObjectId]);
  useEffect(() => console.log(formik.values), [formik.values]);

  const onDrop = useCallback(async (acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles[0]);
    console.log(formik.values);
    let content = await fileToBase64(acceptedFiles[0]);
    formik.setValues({ ...formik.value, eventImage: content });
    console.log(content);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const fileToBase64 = async (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (e) => reject(e);
    });

  const handleChange = (value) => {
    console.log(value);
    formik.setValues({ ...formik.values, eventDetails: value });
  };

  const saveInput = async () => {
    try {
      setIsSaving(true);
      let bannerUrl;
      console.log(formik.values.eventImage);
      // console.log(formik.values.eventImage)
      // console.log(
      //   !!formik.values.eventImage &&
      //     !formik.values.eventImage.startsWith(
      //       "https://ipfs.moralis.io:2053/ipfs"
      //     )
      // );
      if (
        formik.values.eventImage &&
        !formik.values.eventImage.startsWith(
          "https://ipfs.moralis.io:2053/ipfs"
        )
      ) {
        let file = new Moralis.File("banner.png", {
          base64: formik.values.eventImage,
        });
        await file.saveIPFS();
        bannerUrl = file._ipfs;
      }
      if (data.length === 1) {
        let obj = data[0];
        const { eventDetails, eventSummary, eventImage } = formik.values;
        console.log(bannerUrl);

        obj.set("eventDetails", eventDetails);
        obj.set("eventSummary", eventSummary);
        obj.set("eventImage", bannerUrl ? bannerUrl : eventImage);
        let updatedObj = await obj.save();
        console.log(updatedObj);

        setIsSaving(false);
        const eventId = obj.id;
        navigate(`/manage/events/${eventId}/tickets`);
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  const resetInput = () => {
    console.log("Reset Input");
  };

  return (
    <div className={styles.Event}>
      <div className={styles.EventSector}>
        <div className={styles.EventSectorContent}>
          <h1>Main Event Image</h1>
          <span className={styles.EventSectorContentInfo}>
            This is the first image attendees will see at the top of your
            listing. Use a high quality image: 2160x1080px (2:1 ratio).Learn
            more
          </span>
          <div
            className={styles.EventSectorContentFile}
            {...getRootProps()}
            style={{
              backgroundImage: formik.values.eventImage
                ? `url(${formik.values.eventImage})`
                : "https://thumbs.dreamstime.com/b/frosted-glass-background-horizontal-top-view-66466722.jpg",
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div className={styles.EventSectorContentFileInput}>
                <img src={image} alt="altimage" />
                <p>Drag & drop or click to add main event image</p>
                <span>JPEG or PNG, no larger than 5MB</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.EventSector}>
        <div className={styles.EventSectorContent}>
          <h1>Description</h1>
          <span className={styles.EventSectorContentInfo}>
            Add more details to your event like your schedule, sponsors, or
            featured guests.Learn more
          </span>
          <FlexInput
            inputs={[
              {
                className: "md100",
                title: "Summary",
                extraData: ["Summary is required", `0/140`],
                element: (
                  <textarea
                    value={formik.values.eventSummary}
                    onChange={(e) =>
                      formik.setValues({
                        ...formik.values,
                        eventSummary: e.target.value,
                      })
                    }
                    placeholder="Write a short event summary to get attendees excited."
                  ></textarea>
                ),
              },
            ]}
          />
          <ReactQuill
            className={styles.EventSectorContentEditor}
            theme="snow"
            value={formik.values.eventDetails}
            onChange={(value) =>
              formik.setValues({
                ...formik.values,
                eventDetails: value,
              })
            }
            modules={modules}
            formats={formats}
          />
          {/* <div className={styles.EventSectorContentEditorArea} />
          </ReactQuill> */}
        </div>
      </div>
      <div className={styles.EventConclusion}>
        <div>
          <button onClick={resetInput} type="button">
            Discard
          </button>
          <button onClick={saveInput}>
            {isSaving ? <Spinner /> : "Save & Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Details;
