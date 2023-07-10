import React, { useEffect, useState } from "react";
import { upcomingMatchByIdApi } from "../../Constants/Api/Api";
// import { Link, useLocation, useParams } from "react-router-dom";
// import NoPlayer from "../../../assets/Images/no-player.png";
// import noFlag from "../../../assets/Images/no-flag.png";
import styles from "./ScorePanelUpcomingNew.module.scss";
import { Col, Row } from "react-bootstrap";
// import BreadcrumbsSchema from "../BreadcrumbsSchema/BreadcrumbsSchema";
import HOST from "../../Constants/host";
import slugify from "react-slugify";
import Link from "next/link";
import { useRouter } from "next/router";
import Breadcrumbs from "../../Common/BreadcrumbsSchema/Breadcrumbs";
import Head from "next/head";

const ScorePanelUpcomingNew = (props) => {
  const router = useRouter();
  const { slug } = router.query;
  const match_id = slug === undefined ? null : slug[0];
  const [upcomingMatchData, setUpcomingMatchData] = useState([]);
  const pathname = router.asPath;

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
  const canonicalUrl = `${$url.protocol}${HOST.split("/")[2]}${pathname}`;

  useEffect(() => {
    upcomingMatchByIdApi(match_id)
      .then((res) => {
        setUpcomingMatchData(res.data.data);
        
      })
      .catch((e) => {
       
      });
  }, [match_id]);

  const articleBreadcrumb = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${HOST}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cricket Upcoming Matches",
        item: `${HOST}cricket-live-score/live-matches/all`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: upcomingMatchData === undefined ? null : upcomingMatchData.title,
        item: `${HOST}${pathname}`,
      },
    ],
  };
  const eventSchema = {
    "@context": "http://schema.org",
    "@type": "SportsEvent",
    name:
      upcomingMatchData.length === 0
        ? null
        : upcomingMatchData.competition.title,
    startDate:
      upcomingMatchData.length === 0 ? null : upcomingMatchData.date_start,
    endDate: upcomingMatchData.length === 0 ? null : upcomingMatchData.date_end,
    location: {
      "@type": "Place",
      name:
        upcomingMatchData.length === 0
          ? null
          : upcomingMatchData.venue.location,
      address: {
        "@type": "PostalAddress",
        addressLocality:
          upcomingMatchData.length === 0 ? null : upcomingMatchData.venue.name,
        addressCountry:
          upcomingMatchData.length === 0
            ? null
            : upcomingMatchData.venue.country,
      },
    },
    competitor: [
      {
        "@type": "SportsTeam",
        name:
          upcomingMatchData.length === 0 ? null : upcomingMatchData.teama.name,
        image:
          upcomingMatchData.length === 0
            ? null
            : upcomingMatchData.teama.logo_url,
      },
      {
        "@type": "SportsTeam",
        name:
          upcomingMatchData.length === 0 ? null : upcomingMatchData.teamb.name,
        image:
          upcomingMatchData.length === 0
            ? null
            : upcomingMatchData.teamb.logo_url,
      },
    ],
  };
  

  return (
    <>
      {upcomingMatchData.length === 0 ? null : (
        <>
          <Breadcrumbs itemListElement={articleBreadcrumb.itemListElement} />

          <div className={styles.ScorePanelUpcoming_section_New}>
            <Head>
              <title itemprop="name">
                {pathname.split("/")[6] === "" ||
                pathname.split("/")[6] === null
                  ? upcomingMatchData.teama.name +
                    " बनाम " +
                    upcomingMatchData.teamb.name +
                    " Live Score " +
                    " , " +
                    upcomingMatchData.title
                  : pathname.split("/")[6] === "liveblog"
                  ? upcomingMatchData.teama.name +
                    " बनाम " +
                    upcomingMatchData.teamb.name +
                    " मैच लाइव ब्लॉग " +
                    " , " +
                    upcomingMatchData.title
                  : pathname.split("/")[6] === "scorecard"
                  ? upcomingMatchData.teama.name +
                    " बनाम " +
                    upcomingMatchData.teamb.name +
                    " Completed स्कोरकार्ड " +
                    " , " +
                    upcomingMatchData.title
                  : pathname.split("/")[6] === "teams"
                  ? upcomingMatchData.teama.name +
                    " बनाम " +
                    upcomingMatchData.teamb.name +
                    " Team " +
                    " , " +
                    upcomingMatchData.title
                  : pathname.split("/")[6] === "videos"
                  ? upcomingMatchData.teama.name +
                    " बनाम " +
                    upcomingMatchData.teamb.name +
                    " मैच Videos " +
                    " , " +
                    upcomingMatchData.title
                  : pathname.split("/")[6] === "photos"
                  ? upcomingMatchData.teama.name +
                    " बनाम " +
                    upcomingMatchData.teamb.name +
                    "मैच की तस्वीरें" +
                    " , " +
                    upcomingMatchData.title
                  : pathname.split("/")[6] === "wagonwheel"
                  ? upcomingMatchData.teama.name +
                    " बनाम " +
                    upcomingMatchData.teamb.name +
                    " वैगनव्हील " +
                    " , " +
                    upcomingMatchData.title
                  : pathname.split("/")[6] === "manhattan"
                  ? upcomingMatchData.teama.name +
                    " बनाम " +
                    upcomingMatchData.teamb.name +
                    " मैनहटन " +
                    " , " +
                    upcomingMatchData.title
                  : upcomingMatchData.teama.name +
                    " बनाम " +
                    upcomingMatchData.teamb.name +
                    " मैच कमेंट्री " +
                    " , " +
                    upcomingMatchData.title}
              </title>

              <meta
                name="description"
                itemprop="description"
                content={`${upcomingMatchData.teama.name} बनाम ${upcomingMatchData.teamb.name} Live Score, ${upcomingMatchData.title}  ${upcomingMatchData.teama.name} बनाम ${upcomingMatchData.teamb.name} Live Score क्रिकेट स्कोर, मैच परिणाम, Completed स्कोरबोर्ड और News प्राप्त करें।.`}
              />
              <link rel="canonical" href={canonicalUrl} />
                <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleBreadcrumb),
          }}
        />
              <script type="application/ld+json">
                {JSON.stringify(eventSchema)}
              </script>
            </Head>

            <Row className={styles.Row1}>
              <div className={styles.Row1_inner}>
                <h1>
                  {" "}
                  {/* <span style={{ color: "red" }}>Match Ended</span>{" "} */}
                  <Link
                    href={`/cricket-series/${
                      upcomingMatchData.status_str === "Scheduled"
                        ? "upcoming"
                        : "schedule"
                    }/${upcomingMatchData.competition.cid}/${slugify(
                      upcomingMatchData.title
                    )}-${upcomingMatchData.season}/schedule/`}
                    className={styles.link}
                  >
                    {upcomingMatchData.competition.title}{" "}
                    {upcomingMatchData.competition.season}
                  </Link>
                </h1>
                <h2>{upcomingMatchData.venue.name}</h2>{" "}
              </div>
            </Row>
            <Row className={styles.Row2}>
              <Col sm={7} className={styles.col1}>
                <Row className={styles.Col1Row1}>
                  <Col>
                    <div className={styles.Col1Row1_inner}>
                      <div className={styles.top}>
                        <div className={styles.top1}>
                          <div className={styles.switcherBtn}>
                            <div className={styles.live_move}>
                              <h6 className={styles.live_text}>
                                Upcoming
                                {/* <div id="div1"></div> */}
                              </h6>
                            </div>
                          </div>
                        </div>
                        <div className={styles.top2}>{/* <h6></h6> */}</div>
                      </div>
                      <div className={styles.teamA}>
                        <div className={styles.logo}>
                          {/* <h5>
                        <img
                          src={
                            upcomingMatchData.teama.logo_url === "" ||
                            upcomingMatchData.teama.logo_url.includes("/") ===
                              false
                              ? noFlag
                              : upcomingMatchData.teama.logo_url
                          }
                          height="40px"
                          width="40px"
                          alt="images"
                          className="imgF"
                        />
                      </h5> */}
                          {/* {teamId === 0
                        ? setTeamId(upcomingMatchData.teama.team_id.toString())
                        : null} */}

                          <h5
                          // onClick={() =>
                          //   handleTeamID(upcomingMatchData.teama.team_id)
                          // }
                          >
                            <Link
                              href={`/teams/${
                                upcomingMatchData === undefined ||
                                upcomingMatchData.teama.name.indexOf(
                                  "Women"
                                ) !== -1
                                  ? "women"
                                  : "men"
                              }/${upcomingMatchData.teama.team_id}/${slugify(
                                upcomingMatchData.teama.name
                              )}/`}
                              className={styles.link}
                            >
                              {upcomingMatchData.teama.name}
                            </Link>
                          </h5>
                        </div>
                        {upcomingMatchData.format_str === "Test" ? (
                          <div className={styles.score}>
                            {upcomingMatchData.teama.scores_full === "" ? (
                              <h6>(0.0&nbsp;ov ) &nbsp; 0/0</h6>
                            ) : (
                              <h6>
                                {" "}
                                {upcomingMatchData.teama.scores +
                                  " " +
                                  "(" +
                                  upcomingMatchData.teama.scores_full
                                    .split(" (")
                                    .pop()}
                              </h6>
                            )}
                            {/* <h5>156/10</h5> */}
                          </div>
                        ) : (
                          <div className={styles.score}>
                            {upcomingMatchData.teama.scores === "" ? (
                              <h6>(0.0&nbsp;ov ) &nbsp; 0/0</h6>
                            ) : (
                              <h6>{upcomingMatchData.teama.scores_full}</h6>
                            )}
                            {/* <h5>156/10</h5> */}
                          </div>
                        )}
                      </div>
                      <div className={styles.teamB}>
                        <div className={styles.logo}>
                          {/* <h5>
                        <img
                          src={
                            upcomingMatchData.teama.logo_url === "" ||
                            upcomingMatchData.teama.logo_url.includes("/") ===
                              false
                              ? noFlag
                              : upcomingMatchData.teama.logo_url
                          }
                          height="40px"
                          width="40px"
                          alt="images"
                          className="imgF"
                        />
                      </h5> */}
                          <h5
                            className={styles.team_name}
                            // onClick={() =>
                            //   handleTeamID(upcomingMatchData.teamb.team_id)
                            // }
                          >
                            <Link
                              href={`/teams/${
                                upcomingMatchData === undefined ||
                                upcomingMatchData.teamb.name.indexOf(
                                  "Women"
                                ) !== -1
                                  ? "women"
                                  : "men"
                              }/${upcomingMatchData.teamb.team_id}/${slugify(
                                upcomingMatchData.teamb.name
                              )}/`}
                              className={styles.link}
                            >
                              {upcomingMatchData.teamb.name}
                            </Link>
                          </h5>
                        </div>
                        {upcomingMatchData.format_str === "Test" ? (
                          <div className={styles.score}>
                            {upcomingMatchData.teamb.scores_full === "" ? (
                              <h6>(0.0&nbsp;ov ) &nbsp; 0/0</h6>
                            ) : (
                              <h6>
                                {" "}
                                {upcomingMatchData.teamb.scores +
                                  " " +
                                  "(" +
                                  upcomingMatchData.teamb.scores_full
                                    .split(" (")
                                    .pop()}
                              </h6>
                            )}
                            {/* <h5>156/10</h5> */}
                          </div>
                        ) : (
                          <div className={styles.score}>
                            {upcomingMatchData.teamb.scores === "" ? (
                              <h6>(0.0&nbsp;ov ) &nbsp; 0/0</h6>
                            ) : (
                              <h6>{upcomingMatchData.teamb.scores_full}</h6>
                            )}
                            {/* <h5>156/10</h5> */}
                          </div>
                        )}
                      </div>
                      <div className={styles.won}>
                        <h6>{upcomingMatchData.status_note}</h6>
                      </div>
                    </div>
                  </Col>
                  <Col style={{ alignSelf: "center", textAlign: "end" }}>
                    <div
                      className={`${styles.Col1Row1_inner} ${styles.TimerInner}`}
                    >
                      <h6 className={styles.startTime}>
                        {upcomingMatchData.start_time}
                      </h6>
                      <h6 className={styles.TimeLeft}>
                        {upcomingMatchData.time_left}
                      </h6>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col sm={5} className={styles.col2}></Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default ScorePanelUpcomingNew;
