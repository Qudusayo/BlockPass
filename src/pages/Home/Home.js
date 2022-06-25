import styles from "./Home.module.scss";
import image from "./../../assets/images/now-is-your-time.svg";

import musicIcon from "./../../assets/icons/music.svg";
import visualArt from "./../../assets/icons/carnival-circus.svg";
import travelIcon from "./../../assets/icons/travelling-bag.svg";
import healthIcon from "./../../assets/icons/like.svg";
import hobbiesIcon from "./../../assets/icons/hobby.svg";
import businessIcon from "./../../assets/icons/business.svg";
import foodIcon from "./../../assets/icons/food.svg";
import sportIcon from "./../../assets/icons/sport.svg";

import ivanOnTech from "./../../assets/images/ivanontech.jpeg";
import EventCard from "../../components/EventCard/EventCard";
import CategoryBlock from "../../components/CategoryBlock/CategoryBlock";

function Home() {
  return (
    <div className={styles.Home}>
      <div className={styles.HomeBanner}>
        <img
          src={image}
          className={styles.HomeBannerImage}
          alt="now is your time"
        />
        <button>Find your next event</button>
      </div>

      <div className={styles.HomeInfo}>
        <div>
          Re-open confidently with Eventbrite'ss COVID-19 Safety Playbook
        </div>
        <span>
          We partnered with risk management and health experts to empower event
          creators to thoughtfully consider potential safety and security risks
          at your event. See the playbook.
        </span>
      </div>

      <div className={styles.HomeCategories}>
        <h2>Check out trending categories</h2>
        <div className={styles.HomeCategoriesGrid}>
          <CategoryBlock icon={musicIcon} title="Music" />
          <CategoryBlock icon={visualArt} title="Visual Art" />
          <CategoryBlock icon={travelIcon} title="Travel" />
          <CategoryBlock icon={healthIcon} title="Health" />
          <CategoryBlock icon={hobbiesIcon} title="Hobbies" />
          <CategoryBlock icon={businessIcon} title="Business" />
          <CategoryBlock icon={foodIcon} title="Food" />
          <CategoryBlock icon={sportIcon} title="Sport" />
        </div>
      </div>

      <div className={styles.HomeEvents}>
        <h2>Featured events</h2>
        <div className={styles.HomeEventsFlexBox}>
          {Array(12)
            .fill("")
            .map((_, index) => (
              <EventCard key={index} imageHeader={ivanOnTech} />
            ))}
        </div>
      </div>
      <button className={styles.HomeButton}>See More</button>
    </div>
  );
}

export default Home;
