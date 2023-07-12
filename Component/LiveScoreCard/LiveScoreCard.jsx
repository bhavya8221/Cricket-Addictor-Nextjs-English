import React, { useCallback, useState } from "react";
import { Alert, Card, Form } from "react-bootstrap";
import logo from "../../public/Images/no-flag.png";
import v1 from "../../public/Images/v1.png";
import v2 from "../../public/Images/v2.png";
import v3 from "../../public/Images/v3.png";
import v4 from "../../public/Images/v4.png";
import v11 from "../../public/Images/v11.png";
import v22 from "../../public/Images/v22.png";
import v33 from "../../public/Images/v33.png";
import v44 from "../../public/Images/v44.png";

import axios from "axios";
import { useEffect } from "react";
import { Snackbar } from "@mui/material";
import slugify from "react-slugify";
import styles from "./LiveScoreCard.module.scss";
import { notifyApi, notifyListAPI } from "../../Constants/Api/Api";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

function LiveScoreCard(props) {
  const [notify, setNotify] = useState();
  const authTokenAccess = localStorage.getItem("authTokenAccessLogin");
  const NotifyMatch = localStorage.getItem("NotifyMatch");
  const [toggle, setToggle] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  // const navigate = useNavigate();
  const router = useRouter();
  const pathname = router.asPath;
  const [showAlert, setShowAlert] = useState(false);
  const [notiFyList, setNotiFyList] = useState([]);
  const { title } = router.query;
  const handleSubmit = () => {
    notifyApi(props.data.match_id)
      .then((response) => {
        if (toggle === true) {
          setToggle(false);
        } else {
          setToggle(true);
        }
      })
      .catch((error) => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      });
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
    if (props.type === "upcoming-matches") {
      notifyListAPI()
        .then((res) => {
          setNotiFyList(res.data.data.rows);
          res.data.data.rows.some(
            (row) => row.match_id === props.data.match_id
          ) === true
            ? setToggle(true)
            : setToggle(false);
        })
        .catch((e) => {});
    }
  }, [props.data.match_id]);

  // const eventSchema = {
  //   "@context": "http://schema.org",
  //   "@type": "SportsEvent",
  //   name: `${props.data.teama.name} vs ${props.data.teamb.name}`,
  //   description: title,
  //   startDate: props.data.date_start,
  //   endDate: props.data.date_end,
  //   location: {
  //     "@type": "Place",
  //     name: props.data.venue.location,
  //     address: {
  //       "@type": "PostalAddress",
  //       addressLocality: props.data.venue.name,
  //       // addressRegion: "CA",
  //       // postalCode: "90301",
  //       addressCountry: props.data.venue.country,
  //     },
  //   },
  //   competitor: [
  //     {
  //       "@type": "SportsTeam",
  //       name: props.data.teama.name,
  //       image: props.data.teama.logo_url,
  //     },
  //     {
  //       "@type": "SportsTeam",
  //       name: props.data.teamb.name,
  //       image: props.data.teamb.logo_url,
  //     },
  //   ],
  // };

  return (
    <>
      {showAlert && <Alert severity="error">Please Login First</Alert>}
      <div className={styles.liveScore_section}>
        <Head>
          {/* <script type="application/ld+json">
            {JSON.stringify(eventSchema)}
          </script> */}
        </Head>
        <Card className={`${styles.OG_card} "mx-2")`}>
          <Card.Body className={styles.custom_live_card}>
            <div className={styles.full_card}>
              <div className={styles.upper}>
                <div className={styles.match_center}>
                  <h1
                    className={styles.match_center_text}
                    onClick={() => {
                      const path = `/cricket-live-score/${props.type}/${
                        props.data.match_id
                      }/${props.data.latest_inning_number}/${slugify(
                        props.data.short_title
                      )}-${slugify(props.data.subtitle)}-${slugify(
                        props.location === "series"
                          ? props.data.short_title
                          : props.data.competition.title
                      )}/`;
                      router.push(path);
                    }}
                    
                    // className={styles.link_color}
                  >
                    Match Center
                  </h1>
                </div>

                <div className={`${styles.upper_row} ${styles.upper_live_row}`}>
                  <div className={"switcherBtn"}>
                    <h1 className={styles.live_text}>
                      {props.type === "live-matches" ? (
                        "Live"
                      ) : props.type === "recent-matches" ? (
                        "Match Ended"
                      ) : props.type === "upcoming-matches" ? (
                        <>
                          <Form>
                            {/* <Form.Check
                              type="switch"
                              id="custom-switch"
                              label="Notify"
                              // checked={false}
                              // checked={props.notifyList.some(
                              //   (row) => row.match_id === props.data.match_id
                              // )}
                              // checked={props.notifyList.includes(
                              //   props.data.match_id
                              // )}
                              onClick={handleSubmit}
                            /> */}
                            <Form.Check
                              type="switch"
                              id="custom-switch"
                              label="Notify"
                              onClick={handleSubmit}
                              // checked={toggle===true? props.notifyList.some(
                              //   (row) => row.match_id === props.data.match_id
                              // )}
                              checked={toggle}
                            />
                          </Form>
                        </>
                      ) : (
                        "-"
                      )}
                      {props.type === "live-matches" ? (
                        <div id="div1"></div>
                      ) : null}
                    </h1>

                    {/* {props.type === "upcoming-matches" ? (
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="switch"
                          id="custom-switch"
                          label="Check this switch"
                        />
                      </div>
                    ) : null} */}
                  </div>
                  <h
                    className={
                      props.type === "upcoming-matches"
                        ? `${styles.header_text} ${styles.top}`
                        : styles.header_text
                    }
                  >
                    {props.data.subtitle},&nbsp;
                    {props.type === "upcoming-matches"
                      ? null
                      : ` ${props.data.venue.location} (${props.data.venue.name}), `}
                    {new Date(props.data.date_start).toLocaleDateString(
                      "en-us",
                      { day: "numeric", month: "short", year: "numeric" }
                    )}
                  </h>
                </div>
                <Link
                  href={`/cricket-live-score/${props.type}/${
                    props.data.match_id
                  }/${props.data.latest_inning_number}/${slugify(
                    props.data.short_title
                  )}-${slugify(props.data.subtitle)}-${slugify(
                    props.location === "series"
                      ? props.data.short_title
                      : props.data.competition.title
                  )}`}
                  className={styles.link_color}
                >
                  <div className={styles.upper_row}>
                    <div className={styles.team_left}>
                      <img
                        src={
                          props.data.teama.logo_url === null ||
                          props.data.teama.logo_url === "" ||
                          props.data.teama.logo_url.includes("/") === false
                            ? logo
                            : props.data.teama.logo_url
                        }
                        alt="images"
                        className={styles.imgF}
                      />
                      <h1 className={styles.team_name}>
                        {props.location === "home"
                          ? props.data.teama.short_name
                          : props.data.teama.name}
                      </h1>
                    </div>
                    <div className={styles.team_right}>
                      <h1 className={styles.run}>
                        {props.type ===
                        "upcoming-matches" ? null : props.type ===
                          "live-matches" ? (
                          <>
                            {" "}
                            <span style={{ fontSize: 18 }}>
                              {" "}
                              {props.data.teama.scores_full === undefined
                                ? "-"
                                : props.data.teama.scores_full.split(" ")[0]}
                              &nbsp;
                            </span>
                            {props.data.teama.scores_full === undefined
                              ? "-"
                              : props.data.teama.scores_full.split(" ")[1]}
                            &nbsp;
                            {props.data.teama.scores_full === undefined
                              ? "-"
                              : props.data.teama.scores_full.split(" ")[2]}
                          </>
                        ) : props.data.teama.scores === undefined ? (
                          ""
                        ) : (
                          <>
                            {" "}
                            <span style={{ fontSize: 18 }}>
                              {" "}
                              {props.data.teama.scores_full === undefined
                                ? "-"
                                : props.data.teama.scores_full.split(" ")[0]}
                              &nbsp;
                            </span>
                            {props.data.teama.scores_full === undefined
                              ? "-"
                              : props.data.teama.scores_full.split(" ")[1]}
                            &nbsp;
                            {props.data.teama.scores_full === undefined
                              ? "-"
                              : props.data.teama.scores_full.split(" ")[2]}
                          </>
                        )}
                      </h1>
                    </div>
                  </div>
                  <div className={styles.upper_row}>
                    <div className={styles.team_left}>
                      <img
                        src={
                          props.data.teamb.logo_url === null ||
                          props.data.teamb.logo_url === "" ||
                          props.data.teama.logo_url.includes("/") === false
                            ? logo
                            : props.data.teamb.logo_url
                        }
                        alt="images"
                        className={styles.imgF}
                      />
                      <h1 className={styles.team_name}>
                        {props.location === "home"
                          ? props.data.teamb.short_name
                          : props.data.teamb.name}
                      </h1>
                    </div>
                    <div className={styles.team_right}>
                      <h1 className={styles.run}>
                        {props.type === "upcoming" ? null : props.type ===
                          "live-matches" ? (
                          <>
                            {" "}
                            <span style={{ fontSize: 18 }}>
                              {" "}
                              {props.data.teamb.scores_full === undefined
                                ? "-"
                                : props.data.teamb.scores_full.split(" ")[0]}
                              &nbsp;
                            </span>
                            {props.data.teamb.scores_full === undefined
                              ? "-"
                              : props.data.teamb.scores_full.split(" ")[1]}
                            &nbsp;
                            {props.data.teamb.scores_full === undefined
                              ? "-"
                              : props.data.teamb.scores_full.split(" ")[2]}
                          </>
                        ) : props.data.teamb.scores === undefined ? (
                          ""
                        ) : (
                          <>
                            {" "}
                            <span style={{ fontSize: 18 }}>
                              {" "}
                              {props.data.teamb.scores_full === undefined
                                ? "-"
                                : props.data.teamb.scores_full.split(" ")[0]}
                              &nbsp;
                            </span>
                            {props.data.teamb.scores_full === undefined
                              ? "-"
                              : props.data.teamb.scores_full.split(" ")[1]}
                            &nbsp;
                            {props.data.teamb.scores_full === undefined
                              ? "-"
                              : props.data.teamb.scores_full.split(" ")[2]}
                          </>
                        )}
                      </h1>
                    </div>
                  </div>
                  <div className={styles.upper_row}>
                    <h1 className={styles.footer_text}>
                      {props.type === "upcoming-matches"
                        ? // ? ` ${props.data.venue.location} (${props.data.venue.name})`
                          `Match Starts in ${props.data.time_left}`
                        : props.type === "recent-matches"
                        ? props.data.status_note
                        : props.type === "live-matches"
                        ? props.data.status_note
                        : props.data.toss.text === undefined
                        ? ""
                        : props.data.toss.text}
                    </h1>
                  </div>
                </Link>
              </div>
              <div className={styles.lower}>
                <div className={styles.lower_box_left}>
                  <Image
                    src={v1}
                    alt="images"
                    className={styles.imgV}
                    height={20}
                    width={15}
                  />
                  {/* <Image src={v11} alt="images" className={styles.imgVs} /> */}
                  <h1 className={styles.imgText}>fantasy team</h1>
                </div>
                <div className={styles.lower_box}>
                  <Image
                    src={v2}
                    alt="images"
                    className={styles.imgV}
                    height={20}
                    width={15}
                  />
                  {/* <Image src={v22} alt="images" className={styles.imgVs} /> */}
                  <h1 className={styles.imgText}>Place a bet</h1>
                </div>
                <div className={styles.lower_box}>
                  <Image
                    src={v3}
                    alt="images"
                    className={styles.imgV}
                    height={20}
                    width={15}
                  />
                  {/* <Image src={v33} alt="images" className={styles.imgVs} /> */}
                  <h1 className={styles.imgText}>Buy Ticket</h1>
                </div>
                <div className={styles.lower_box_right}>
                  <Image
                    src={v4}
                    alt="images"
                    className={styles.imgV}
                    height={20}
                    width={15}
                  />
                  {/* <Image src={v44} alt="images" className={styles.imgVs} /> */}
                  <h1 className={styles.imgText}>News</h1>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default LiveScoreCard;
