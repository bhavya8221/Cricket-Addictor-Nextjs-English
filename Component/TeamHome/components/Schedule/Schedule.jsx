import React, { useState, useCallback, useEffect } from "react";
import styles from "./Schedule.module.scss";
import { teamWiseMatchListAPI } from "../../../../Constants/Api/Api";
import Pagination from "@mui/material/Pagination";
import usePagination from "@mui/material/usePagination";
import { Form } from "react-bootstrap";
import HOST from "../../../../Constants/host";
import slugify from "react-slugify";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

const Schedule = () => {
  const router = useRouter();
  const { tid } = router.query;
  const [teamWiseLiveMatch, setTeamWiseLiveMatch] = useState([]);
  const [teamWiseScheduledMatch, setTeamWiseScheduledMatch] = useState([]);
  const [allTeamWiseData, setAllTeamWiseData] = useState(0);
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const pathname = router.asPath;

  // var teamWiseMatch = teamWiseLiveMatch.concat(teamWiseScheduledMatch);
  const teamWiseMatch = (teamWiseLiveMatch || []).concat(
    teamWiseScheduledMatch || []
  );

  const count = Math.ceil((allTeamWiseData || []).length / PER_PAGE);
  const _DATA = usePagination(teamWiseMatch, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  function url($url) {
    var url = $url.split("//");
    if (url[0] === "http:" || url[0] === "https:") {
      var protocol = url[0] + "//";
      var host = url[1].split("/")[0];
      url = protocol + host;
      var path = $url.split(url)[1];
      return {
        protocol: protocol,
        host: host,
        path: path,
      };
    }
  }
  var $url = url(HOST);
  // const canonicalUrl = `${$url.protocol}${HOST.split("/")[2]}${pathname}`;

  const baseUrl = `${$url.protocol}${HOST.split("/")[2]}${pathname}`;

  // const primaryUrl = `${baseUrl}`;

  const currentPageUrl = page === 1 ? `${baseUrl}` : `${baseUrl}?page=${page}`;
  const prevPageUrl = page > 1 ? `${baseUrl}?page=${page - 1}` : null;
  const nextPageUrl = page < count ? `${baseUrl}?page=${page + 1}` : null;

  function getDate(value) {
    var date = new Date(value);
    return date.toLocaleDateString();
  }

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
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // setIsLoading(true);
    teamWiseMatchListAPI(tid, "", "", "")
      .then((res) => {
        setAllTeamWiseData(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });

    teamWiseMatchListAPI(tid, "Scheduled", page, PER_PAGE)
      .then((res) => {
        setTeamWiseScheduledMatch(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });

    teamWiseMatchListAPI(tid, "Live", page, PER_PAGE)
      .then((res) => {
        setTeamWiseLiveMatch(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [tid, page, PER_PAGE]);


  return (
    <div className={styles.Schedule}>
      <Head>
        {/* <title>India National Cricket Team Schedule</title> */}

        <link rel="canonical" href={currentPageUrl} />
        {prevPageUrl && <link rel="prev" href={prevPageUrl} />}
        {nextPageUrl && <link rel="next" href={nextPageUrl} />}
      </Head>
      {teamWiseMatch.map((item, index) => {
        return (
          <div className={styles.livecomm_section} key={index}>
            <div className={styles.card_child}>
              <div className={`"row" ${styles.ss}`}>
                <div className={`"col-lg-5 col-md-12" ${styles.flex_row}`}>
                  <div className={styles.row_style}>
                    <div className={styles.card_imgs}>
                      <Image
                        alt="images"
                        className={styles.img_flag}
                        src={item.teama.logo_url}
                        width={10}
                        height={10}
                      />
                    </div>
                    <div className={styles.comment_data}>
                      <h5>{item.teama.name}</h5>
                      {/* <h4>{item.teama.scores}</h4> */}
                      <h5>{item.teama.scores_full}</h5>
                    </div>
                  </div>
                  <div className={styles.text_vs}>
                    <h4 className={styles.text_yellow}>V/S</h4>
                  </div>
                  <div className={styles.desktop}>
                    <div className={styles.row_style}>
                      <div className={styles.comment_data_right}>
                        <h5>{item.teamb.name}</h5>
                        {/* <h4>{item.teamb.scores}</h4> */}
                        <h5>{item.teamb.scores_full}</h5>
                      </div>
                      <div>
                        <Image
                          alt="images"
                          className={styles.img_flag}
                          src={item.teamb.logo_url}
                          width={10}
                          height={10}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.mobile}>
                    <div className={styles.row_style}>
                      <div>
                        <Image
                          alt="images"
                          className={styles.img_flag}
                          src={item.teamb.logo_url}
                          width={10}
                          height={10}
                        />
                      </div>
                      <div className={styles.comment_data_right}>
                        <h5>{item.teamb.name}</h5>
                        {/* <h4>{item.teamb.scores}</h4> */}
                        <h5>{item.teamb.scores_full}</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-12">
                  <div
                    className={`${styles.text_border} ${styles.comment_data}`}
                  >
                    {/* <h6 className="text-red">SUPERNOVAS WON BY 4 RUNS(WINNERS)</h6> */}
                    <Link
                      href={`/cricket-live-score/${
                        item.status_str === "Scheduled"
                          ? "upcoming-matches"
                          : "live-matches"
                      }/${item.match_id}/${item.latest_inning_number}/${slugify(
                        item.short_title
                      )}-${slugify(item.subtitle)}-${slugify(
                        item.competition.title
                      )}/`}
                      className="match-box"
                    >
                      MATCH CENTRE
                    </Link>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12">
                  <div className={styles.comment_data_col3}>
                    <div className={styles.status_button}>
                      <div>
                        <h6 className={styles.live_text}>
                          {item.status_str === "Live" ? (
                            "Live"
                          ) : item.status_str === "Completed" ? (
                            "Match Ended"
                          ) : item.status_str === "Scheduled" ? (
                            // ? "Notify"
                            <>
                              <Form>
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="Notify"
                                />
                              </Form>
                            </>
                          ) : (
                            "-"
                          )}
                          {item.status_str === "live" ? (
                            <div id="div1"></div>
                          ) : null}
                        </h6>
                      </div>
                      <div>
                        {/* {item.status_str === "Scheduled" ? (
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckDefault"
                              disabled
                            />
                          </div>
                        ) : null} */}
                      </div>
                    </div>
                    <h6>
                      <b>
                        {" "}
                        {getDay(item.competition.datestart)},{" "}
                        {getDate(item.date_start)}
                      </b>
                    </h6>
                    <h6>
                      {item.subtitle} at {item.venue.name},(
                      {item.venue.location}),{getDate(item.date_start)}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div>
        {teamWiseMatch.length <= 1 ? null : (
          <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default Schedule;
