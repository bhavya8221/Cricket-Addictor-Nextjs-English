import React, { useEffect } from "react";
import { useRouter } from "next/router";
import classname from 'classnames';
import styles from "./MenuOptions.module.scss";

function MenuOptions(props) {
  const router = useRouter();
  const { match, match_id, latest_inning_number, tid, gender, title, cid, season } = router.query;
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
            : element === "अवलोकन"
            ? "OVERVIEW"
            : element === "अनुसूची"
            ? "SCHEDULE"
            : element === "परिणाम"
            ? "RESULTS"
            : element === "दस्ता"
            ? "SQUAD"
            : element === "News"
            ? "NEWS"
            : element;
      });
    
    let url = `/teams/${gender}/${cid}/${title}/`;
    if (navValue.toLowerCase() === "commentary") {
      router.push("");
    } else if (navValue.toLowerCase() === "overview") {
      router.push(url + "overview");
    } else {
      router.push(url + navValue.toLowerCase());
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
      if (
        props.pathname === `/teams/${gender}/${tid}/${title}-cricket-team/` ||
        props.pathname ===
          `/ipl/${season}/${cid}/teams/${gender}/${tid}/${title}/`
      ) {
        setselectedField("OVERVIEW");
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
  }, [
    props.active,
    props.pathname,
    match_id,
    latest_inning_number,
    tid,
    gender,
    title,
    cid,
    season,
  ]);

  return (
    <>
      <div
        className={props.location === "cricket-live-score" ? classname(styles.Butns, styles.customB) : styles.Butns}
      >
        <ul
          className={props.location === "cricket-live-score" ? classname(styles.menu, styles.customM) : styles.menu}
        >
          {props.menus.map((el, i) => {
            return (
              <div
                key={i}
                onClick={() => handleChange(el)}
                className={classname(styles.list, 
                  selectedField ===
                  (el === "कमेंटरी"
                    ? "COMMENTARY"
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
                    : el === "अवलोकन"
                    ? "OVERVIEW"
                    : el === "अनुसूची"
                    ? "SCHEDULE"
                    : el === "परिणाम"
                    ? "RESULTS"
                    : el === "दस्ता"
                    ? "SQUAD"
                    : el === "News"
                    ? "NEWS"
                    : el)
                    ? styles.selectedbutn
                    : null)
                }
                style={{
                  backgroundColor:
                    props.location === "cricket-live-score/" ? "#c9c9c9" : "white",
                }}
              >
                <li className={styles.text_uppercase}>{el}</li>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default MenuOptions;
