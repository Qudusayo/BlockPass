import styles from "./Event.module.scss";

import like from "../../assets/icons/like.svg";
import upload from "../../assets/icons/share.svg";
import facebook from "../../assets/icons/facebook.svg";
import twitter from "../../assets/icons/twitter.svg";
import linkedin from "../../assets/icons/linkedin.svg";

import ivanontech from "./../../assets/images/ivanontech.jpeg";
import { useEffect, useRef, useState } from "react";
import EventCard from "../../components/EventCard/EventCard";

function Event() {
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef();

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

  return (
    <div className={styles.Event}>
      <div className={styles.EventBG}>
        <div className={styles.EventBGBlur}></div>
      </div>

      <div className={styles.EventCard}>
        <div className={styles.EventCardHeader}>
          <div
            className={styles.EventCardHeaderBanner}
            style={{ backgroundImage: `url("${ivanontech}")` }}
          ></div>
          <div className={styles.EventCardHeaderTitle}>
            <div>
              <span>
                AUG <br /> 1
              </span>
            </div>
            <div>
              <h3>Moralis Weekly Livestream from Ivan Liljeqvist</h3>
              <span>by Ivan On Tech</span>
              <span>Follow</span>
            </div>
            <div>$200</div>
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
            <span className={styles.price}>$200</span>
          </div>
          <div className={styles.EventButtonsPurchase}>
            <button>Tickets</button>
          </div>
        </div>
        <div className={styles.EventInfo}>
          <div className={styles.EventInfoLocation}>
            <div>
              <h3>Date and Time</h3>
              <span>Thu, 30 Jun 2022, 22:00 -</span>
              <br />
              <span>Fri, 1 Jul 2022, 04:00 WEST</span>
            </div>
            <div>
              <h3>Location</h3>
              <address>
                Mojito Temple
                <br />
                Rua António Feu
                <br />
                8500-802 Portimão
                <br />
                Portugal
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
            <h4>Blockchain Technology and its applications in finance</h4>
            <h3>About this event</h3>
            <p>
              Blockchain Technology has been considered as the most fundamental
              and revolutionising invention since the Internet. Because of its
              immutable nature and its associated security and privacy benefits,
              it has widely attracted the attention of banks, governments,
              techno-corporations, as well as venture investors, entrepreneurs,
              and academics. Every year, thousands of Blockchain projects are
              launched, and various types of new cryptocurrencies are issued and
              circulated in the market.
            </p>

            <p>
              Blockchain applications range from decentralised finance to
              healthcare, from education to media and logistics, from supply
              chains and energy economics to non-fungible tokens and many more.
              However, the theoretical limitations and technical challenges in
              the wider adoption of the blockchain technology, such as
              scalability, latency, privacy, and security need to be further
              studied and addressed in high quality research.
            </p>

            <p>
              The International Conference on Mathematical Research for
              Blockchain Economy (MARBLE), now in its 3rd edition, focuses on
              the mathematics behind blockchain to bridge the gap between
              practice and theory. It aims to provide a high-profile,
              cutting-edge platform for mathematicians, computer scientists and
              economists to present latest advances and innovations in key
              theories of blockchain.
            </p>
            <img src={ivanontech} alt="ivanontech" />
            <h3 className={styles.EventInfoHeader}>Tags</h3>
            <div className={styles.EventInfoDataTags}>
              <span>blockchain</span>
              <span>crypto</span>
              <span>blockchain</span>
              <span>ethereum</span>
              <span>Ivan</span>
              <span>Ivanontech</span>
              <span>Moralis</span>
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
          <h3>Moralis Weekly Livestream from Ivan Liljeqvist</h3>
          <span>at</span>
          <h3>Mojito Temple</h3>
          <span>Rua António Feu 8500-802 Portimão</span>
        </div>
        <div className={styles.EventOwner}>
          <h3>Moralis Web3</h3>
          <span>
            Orginiser of Moralis Weekly Livestream from Ivan Liljeqvist
          </span>
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
