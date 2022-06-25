import styles from "./EventCard.module.scss";

import likeIcon from "./../../assets/icons/like.svg";

function EventCard({ imageHeader }) {
  return (
    <div className={styles.EventCard}>
      <div className={styles.EventCardImage}>
        <img src={imageHeader} alt="event" />
      </div>
      <div className={styles.EventCardLike}>
        <img src={likeIcon} alt="health" />
      </div>
      <div className={styles.EventCardText}>
        <h3>
          Begin your Tai Chi journey: An introduction to essential Tai Chi
          skills
        </h3>
        <span>Sun, Jun 26, 2022 4:00 PM WAT + 2 more events</span>
        <span>Free</span>
      </div>
    </div>
  );
}

export default EventCard;
