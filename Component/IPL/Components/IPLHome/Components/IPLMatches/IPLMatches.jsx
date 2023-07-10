import React, { useState, useEffect } from "react";
import styles from "./IPLMatches.module.scss";
import { seriesMatchAPI } from "../../../../../../Constants/Api/Api";
// import { Helmet } from "react-helmet";
import slugify from "react-slugify";
import { useRouter } from "next/router";
import Link from "next/link";

function IPLMatches() {
  const router = useRouter();
  const { cid } = router.query;
  const [iplMatch, setIplMatch] = useState([]);

  const getDay = (data) => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekday[new Date(data).getDay()];
  };
  // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    seriesMatchAPI("", cid)
      .then((res) => {
        setIplMatch(res.data.data.rows);
      })
      .catch((e) => {
        
       
      });
  }, [cid]);

  return (
    <div className={styles.IPL_section}>
      <div className={styles.Results}>
        {iplMatch.length === 0
          ? null
          : iplMatch.map((item, index) => {
              return (
                <div className={styles.livecomm_section} key={index}>
                  {/* <Helmet>
                    <script type="application/ld+json">
                      {JSON.stringify(
                        eventSchema(
                          item.short_title,
                          item.date_start,
                          item.date_end
                        )
                      )}
                    </script>
                  </Helmet> */}
                  <div className={styles.card_child}>
                    <div className={`row ${styles.ss}`}>
                      <div className={`col-lg-5 col-md-12 ${styles.flex_row}`}>
                        <div className={styles.row_style}>
                          <div>
                            <img
                              alt="images"
                              className={styles.img_flag}
                              src={item.teama.logo_url}
                            />
                          </div>
                          <div className={styles.comment_data}>
                            <h5>{item.teama.short_name}</h5>
                            <h5>{item.teama.scores}</h5>
                            <h5>({item.teama.overs})</h5>
                          </div>
                        </div>
                        <div className={styles.text_vs}>
                          <h4 className={styles.text_yellow}>V/S</h4>
                        </div>
                        <div className={styles.desktop}>
                          <div className={styles.row_style}>
                            <div className={styles.comment_data_right}>
                              <h5>{item.teamb.short_name}</h5>
                              <h5>{item.teamb.scores}</h5>
                              <h5>({item.teamb.overs})</h5>
                            </div>
                            <div>
                              <img
                                alt="images"
                                className={styles.img_flag}
                                src={item.teamb.logo_url}
                              />
                            </div>
                          </div>
                        </div>

                        <div className={styles.mobile}>
                          <div className={styles.row_style}>
                            <div>
                              <img
                                alt="images"
                                className={styles.img_flag}
                                src={item.teamb.logo_url}
                              />
                            </div>
                            <div className={styles.comment_data_right}>
                              <h5>{item.teamb.short_name}</h5>
                              <h5>{item.teamb.scores}</h5>
                              <h5>({item.teamb.overs})</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div
                          className={`${styles.text_border} ${styles.comment_data}`}
                        >
                          {/* <h6>{item.toss.text}</h6> */}
                          <Link
                            href={`/cricket-live-score/recent-matches/${
                              item.match_id
                            }/${item.latest_inning_number}/${slugify(
                              item.short_title
                            )}-${slugify(item.subtitle)}-${slugify(
                              item.competition === undefined
                                ? item.title
                                : item.competition.title
                            )}/`}
                            className={styles.matchCenter}
                          >
                            Match Center
                          </Link>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className={styles.comment_data_col3}>
                          {/* <div className="status_button">
                      <div>
                        <h6 className="live_text">Match Ended</h6>
                      </div>
                    </div> */}
                          <h6 className={styles.location}>
                            {" "}
                            {item.subtitle}&nbsp;|&nbsp;
                            {getDay(item.start_date)}, {item.start_date}
                          </h6>
                          <h6>{item.start_time}</h6>
                          <h6>{item.venue.name}</h6>
                          <h6>{item.result}</h6>
                          <h6 className={styles.won}>{item.status_note}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default IPLMatches;
