import React, { useEffect } from "react";
import styles from "./MenuOptionsNew.module.scss";
import { useRouter } from "next/router";

function MenuOptionsNew(props) {
  const router = useRouter();
  const navigate = router.replace;
  const { slug } = router.query;
  const match_id = slug === undefined ? null : slug[0];
  const latest_inning_number = slug === undefined ? null : slug[1];
  const match = slug === undefined ? null : slug[2];
  const [selectedField, setselectedField] = React.useState("Overview");

  const handleChange = (value) => {
    let navValue = "";
    value
      .replace(/\s+/g, "")
      .split(" ")
      .forEach((element) => {
        navValue +=
          element === "कमेंटरी"
            ? "COMMENTARY"
            : element === "लाइवब्लॉग"
            ? "LIVEBLOG"
            : element === "उपलब्धिः"
            ? "SCORECARD"
            : element === "Team"
            ? "TEAMS"
            : element === "Videos"
            ? "VIDEOS"
            : element === "तस्वीरें"
            ? "PHOTOS"
            : element === "वैगनव्हील"
            ? "WAGONWHEEL"
            : element === "मैनहट्टन"
            ? "MANHATTAN"
            : element;
      });
    if (navValue.toLowerCase() === "commentary") {
      navigate(`/cricket-live-score/live-matches/${slug}/liveblog/`);
    } else if (navValue.toLowerCase() === "overview") {
      navigate(`/cricket-live-score/live-matches/${slug}/`);
    } else {
      navigate(`/cricket-live-score/live-matches/${slug}/${navValue.toLowerCase()}/`);
    }
  };
  

  useEffect(() => {
    if (props.active === undefined) {
      if (
        props.pathname ===
          `/cricket-live-score/live-matches/${match_id}/${latest_inning_number}/${match}/` ||
        props.pathname ===
          `/cricket-live-score/recent-matches/${match_id}/${latest_inning_number}/${match}/`
      ) {
        setselectedField("COMMENTARY");
      }
    } else {
      if (props.active === "LIVEBLOG") {
        setselectedField("LIVE BLOG");
      } else if (props.active === "WAGONWHEEL") {
        setselectedField("WAGON WHEEL");
      } else {
        setselectedField(props.active);
      }
    }
  }, [props.active, props.pathname, match_id, match, latest_inning_number]);

  return (
    <>
      <div className={styles.MenuOptionsNew}>
        <div className={styles.menuOptionNewRow}>
          {props.menus.map((el, i) => {
            return (
              <div
                key={i}
                onClick={() => handleChange(el)}
                className={`${styles.menucontain} ${
                  selectedField ===
                  (el === "कमेंटरी"
                    ? "COMMENTARY"
                    : el === "लाइव ब्लॉग"
                    ? "LIVE BLOG"
                    : el === "उपलब्धिः"
                    ? "SCORECARD"
                    : el === "Team"
                    ? "TEAMS"
                    : el === "Videos"
                    ? "VIDEOS"
                    : el === "तस्वीरें"
                    ? "PHOTOS"
                    : el === "वैगन व्हील"
                    ? "WAGON WHEEL"
                    : el === "मैनहट्टन"
                    ? "MANHATTAN"
                    : el.toUpperCase())
                    ? styles.menucontainActive
                    : null
                }`}
              >
                <div>{el}</div>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
    </>
  );
}

export default MenuOptionsNew;
