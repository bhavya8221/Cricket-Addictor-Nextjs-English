import React, { useCallback, useEffect, useState } from "react";
import styles from "./ScorePanelRecentNew.module.scss";
import { recentMatcByIdApi, teamListDetailAPI } from "../../Constants/Api/Api";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import noFlag from "../../public/Images/no-flag.png";
import { Col, Row, Table } from "react-bootstrap";
import { RxDotFilled } from "react-icons/rx";
import slugify from "react-slugify";
import { CircularProgress } from "@mui/material";
// import BreadcrumbsSchema from "../BreadcrumbsSchema/BreadcrumbsSchema";
// import { Helmet } from "react-helmet";
import HOST from "../../Constants/host";
import Link from "next/link";
import { useRouter } from "next/router";
import Breadcrumbs from "../../Common/BreadcrumbsSchema/Breadcrumbs";
import Head from "next/head";
const ScorePanelRecentNew = (props) => {
  const [recentMatchDetail, setRecentMatchDetail] = useState();
  const [teamId, setTeamId] = useState(0);
  const [teamDetails, setTeamsDetails] = useState();
  const router = useRouter();
  const { slug } = router.query;
  const match_id = slug === undefined ? null : slug[0];
  const [visible, setVisible] = useState(false);
  const pathname = router.asPath;
  const navigate = router.replace;

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

  const handleTeamID = (value) => {
    // setTeamId(value);
    teamListDetailAPI(value)
      .then((res) => {
        // setTeamsDetails(res.data.data);
        navigate(
          `/teams/${res.data.data.sex === "male" ? "men" : "women"}/${
            res.data.data.tid
          }/${slugify(res.data.data.title)}-cricket-team}`
        );
      })
      .catch((e) => {
      
      });
  };

  useEffect(() => {
    recentMatcByIdApi(match_id)
      .then((res) => {
        setRecentMatchDetail(res.data.data);
        // setTeamId(res.data.data)
        setVisible(true);
      })
      .catch((e) => {
        // Navigation();
      });
  }, [match_id, teamId]);

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
        name: "Cricket Completed Matches",
        item: `${HOST}cricket-live-score/live-matches/all`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: recentMatchDetail === undefined ? null : recentMatchDetail.title,
        item: `${HOST}${pathname.split("/")[1]}/${pathname.split("/")[2]}/${
          pathname.split("/")[3]
        }/${pathname.split("/")[4]}/${pathname.split("/")[5]}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name:
          pathname?.split("/")[6] === ""
            ? "Commentary"
            : pathname.split("/")[6],
        item: `${HOST}${pathname}`,
      },
    ],
  };
  const eventSchema = {
    "@context": "http://schema.org",
    "@type": "SportsEvent",
    name: recentMatchDetail === undefined ? null : recentMatchDetail.title,
    startDate:
      recentMatchDetail === undefined ? null : recentMatchDetail.date_start,
    endDate:
      recentMatchDetail === undefined ? null : recentMatchDetail.date_end,
    description:
      recentMatchDetail === undefined ? null : recentMatchDetail.toss.text,
    location: {
      "@type": "Place",
      name:
        recentMatchDetail === undefined
          ? null
          : recentMatchDetail.venue.location,
      address: {
        "@type": "PostalAddress",
        addressLocality:
          recentMatchDetail === undefined ? null : recentMatchDetail.venue.name,
        addressCountry:
          recentMatchDetail === undefined
            ? null
            : recentMatchDetail.venue.country,
      },
    },
    competitor: [
      {
        "@type": "SportsTeam",
        name:
          recentMatchDetail === undefined ? null : recentMatchDetail.teama.name,
        image:
          recentMatchDetail === undefined
            ? null
            : recentMatchDetail.teama.logo_url,
      },
      {
        "@type": "SportsTeam",
        name:
          recentMatchDetail === undefined ? null : recentMatchDetail.teamb.name,
        image:
          recentMatchDetail === undefined
            ? null
            : recentMatchDetail.teamb.logo_url,
      },
    ],
  };

  return (
    <>
      {recentMatchDetail === undefined ? null : (
        <>
          <Breadcrumbs itemListElement={articleBreadcrumb.itemListElement} />

          <div className={styles.scorePanel_sectio_recent_New}>
            <Head>
            <title itemprop="name">
              {pathname.split("/")[6] === "" || pathname.split("/")[6] === null
                ? recentMatchDetail.teama.name +
                  " बनाम " +
                  recentMatchDetail.teamb.name +
                  " Live Score " +
                  " , " +
                  recentMatchDetail.title
                : pathname.split("/")[6] === "liveblog"
                ? recentMatchDetail.teama.name +
                  " बनाम " +
                  recentMatchDetail.teamb.name +
                  " मैच लाइव ब्लॉग " +
                  " , " +
                  recentMatchDetail.title
                : pathname.split("/")[6] === "scorecard"
                ? recentMatchDetail.teama.name +
                  " बनाम " +
                  recentMatchDetail.teamb.name +
                  " Completed स्कोरकार्ड " +
                  " , " +
                  recentMatchDetail.title
                : pathname.split("/")[6] === "teams"
                ? recentMatchDetail.teama.name +
                  " बनाम " +
                  recentMatchDetail.teamb.name +
                  " Team " +
                  " , " +
                  recentMatchDetail.title
                : pathname.split("/")[6] === "videos"
                ? recentMatchDetail.teama.name +
                  " बनाम " +
                  recentMatchDetail.teamb.name +
                  " मैच Videos " +
                  " , " +
                  recentMatchDetail.title
                : pathname.split("/")[6] === "photos"
                ? recentMatchDetail.teama.name +
                  " बनाम " +
                  recentMatchDetail.teamb.name +
                  "मैच की तस्वीरें" +
                  " , " +
                  recentMatchDetail.title
                : pathname.split("/")[6] === "wagonwheel"
                ? recentMatchDetail.teama.name +
                  " बनाम " +
                  recentMatchDetail.teamb.name +
                  " वैगनव्हील " +
                  " , " +
                  recentMatchDetail.title
                : pathname.split("/")[6] === "manhattan"
                ? recentMatchDetail.teama.name +
                  " बनाम " +
                  recentMatchDetail.teamb.name +
                  " मैनहटन " +
                  " , " +
                  recentMatchDetail.title
                : recentMatchDetail.teama.name +
                  " बनाम " +
                  recentMatchDetail.teamb.name +
                  " मैच कमेंट्री " +
                  " , " +
                  recentMatchDetail.title}
            </title>

            <meta
              name="description"
              itemprop="description"
              content={`${recentMatchDetail.teama.name} बनाम ${recentMatchDetail.teamb.name} Live Score, ${recentMatchDetail.title}  ${recentMatchDetail.teama.name} बनाम ${recentMatchDetail.teamb.name} Live Score क्रिकेट स्कोर, मैच परिणाम, Completed स्कोरबोर्ड और News प्राप्त करें.`}
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
                  <Link
                    href={`/cricket-series/${
                      recentMatchDetail.status_str === "Completed"
                        ? "result"
                        : "upcoming"
                    }/${recentMatchDetail.id}/${slugify(
                      recentMatchDetail.title
                    )}-${recentMatchDetail.season}/schedule/`}
                    className={styles.link}
                  >
                    {recentMatchDetail.title}
                  </Link>
                </h1>
                <h2>
                  {" "}
                  {recentMatchDetail.venue.name},{" "}
                  {recentMatchDetail.venue.location},
                  {recentMatchDetail.venue.country}
                </h2>{" "}
              </div>
            </Row>
            <Row className={styles.Row2}>
              <Col sm={7} className={styles.col1}>
                <Row className={styles.Col1Row1}>
                  <div className={styles.Col1Row1_inner}>
                    <div className={styles.top}>
                      <div className={styles.top1}>
                        <div className={styles.switcherBtn}>
                          <div className={styles.live_move}>
                            <h6 className={styles.live_text}>Match Ended</h6>
                          </div>
                        </div>
                      </div>
                      <div className={styles.top2}>
                        <h6></h6>
                      </div>
                    </div>
                    <div className={styles.teamA}>
                      <div className={styles.logo}>
                        {/* <h5>
                      <img
                        src={
                          recentMatchDetail.teama.logo_url === "" ||
                          recentMatchDetail.teama.logo_url.includes("/") === false
                            ? noFlag
                            : recentMatchDetail.teama.logo_url
                        }
                        height="40px"
                        width="40px"
                        alt="images"
                        className="imgF"



                      />
                    </h5> */}
                        <h5
                        // onClick={() =>
                        //   handleTeamID(recentMatchDetail.teama.team_id)
                        // }
                        >
                          {/* str.match(/women/) */}
                          <Link
                            href={`/teams/${
                              recentMatchDetail === undefined ||
                              recentMatchDetail.teama.name.indexOf("Women") !==
                                -1
                                ? "women"
                                : "men"
                            }/${recentMatchDetail.teama.team_id}/${slugify(
                              recentMatchDetail.teama.name
                            )}/`}
                            className={styles.link}
                          >
                            {recentMatchDetail === undefined
                              ? null
                              : recentMatchDetail.teama.name}
                          </Link>
                        </h5>
                      </div>
                      {recentMatchDetail.format_str === "Test" ? (
                        <div className={styles.score}>
                          {recentMatchDetail.teama.scores_full === "" ? (
                            <h6>(0.0&nbsp;ov)&nbsp;0/0</h6>
                          ) : (
                            // <h6>
                            //   {" "}
                            //   {recentMatchDetail.teama.scores +
                            //     " " +
                            //     "(" +
                            //     recentMatchDetail.teama.scores_full.split(" (").pop()}
                            // </h6>
                            <h6>
                              {recentMatchDetail.teama.scores +
                                " " +
                                "(" +
                                recentMatchDetail.teama.scores_full
                                  .split(" (")
                                  .pop()}
                            </h6>
                          )}
                          {/* <h5>156/10</h5> */}
                        </div>
                      ) : (
                        <div className={styles.score}>
                          {recentMatchDetail.teama.scores === "" ? (
                            <h6>(0.0&nbsp;ov )&nbsp;0/0</h6>
                          ) : (
                            <h6>{recentMatchDetail.teama.scores_full}</h6>
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
                          recentMatchDetail.teamb.logo_url === null ||
                          recentMatchDetail.teamb.logo_url === "" ||
                          recentMatchDetail.teamb.logo_url.includes("/") === false
                            ? noFlag
                            : recentMatchDetail.teamb.logo_url
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
                          //   handleTeamID(recentMatchDetail.teamb.team_id)
                          // }
                        >
                          <Link
                            href={`/teams/${
                              recentMatchDetail === undefined ||
                              recentMatchDetail.teamb.name.indexOf("Women") !==
                                -1
                                ? "women"
                                : "men"
                            }/${recentMatchDetail.teamb.team_id}/${slugify(
                              recentMatchDetail.teamb.name
                            )}/`}
                            className={styles.link}
                          >
                            {recentMatchDetail === undefined
                              ? null
                              : recentMatchDetail.teamb.name}
                          </Link>
                        </h5>
                      </div>
                      {recentMatchDetail.format_str === "Test" ? (
                        <div className={styles.score}>
                          {recentMatchDetail.teamb.scores_full === "" ? (
                            <h6>(0.0&nbsp;ov ) &nbsp; 0/0</h6>
                          ) : (
                            // <h6>
                            //   {" "}
                            //   {recentMatchDetail.teamb.scores +
                            //     " " +
                            //     "(" +
                            //     recentMatchDetail.teamb.scores_full.split(" (").pop()}
                            // </h6>
                            <h6>
                              {" "}
                              {recentMatchDetail.teama.scores +
                                " " +
                                "(" +
                                recentMatchDetail.teama.scores_full
                                  .split(" (")
                                  .pop()}
                            </h6>
                          )}
                          {/* <h5>156/10</h5> */}
                        </div>
                      ) : (
                        <div className={styles.score}>
                          {recentMatchDetail.teamb.scores === "" ? (
                            <h6>
                              (0.0&nbsp;ov ) &nbsp; (0.0&nbsp;ov ) &nbsp;0/0
                            </h6>
                          ) : (
                            <h6>{recentMatchDetail.teamb.scores_full}</h6>
                          )}
                          {/* <h5>156/10</h5> */}
                        </div>
                      )}
                    </div>
                    <div className={styles.won}>
                      <h6>
                        {/* {recentMatchDetail.venue.name}, {recentMatchDetail.venue.location},
                      {recentMatchDetail.venue.country} */}
                        {recentMatchDetail.status_note}
                      </h6>
                    </div>
                  </div>
                </Row>
                <Row className={styles.Col1Row2}>
                  <div className={styles.Col1Row2_inner}>
                    {visible === true && recentMatchDetail !== undefined ? (
                      <>
                        <div className={styles.playerDetail}>
                          <Table className={styles.Batting}>
                            <thead>
                              <tr>
                                <th
                                  className={`${styles.name} ${styles.BattingName}`}
                                >
                                  Batting
                                </th>
                                <th className={styles.heading}>R</th>
                                <th className={styles.heading}>B</th>
                                <th className={styles.heading}>4s</th>
                                <th className={styles.heading}>6s</th>
                                <th className={styles.heading}>SR</th>
                              </tr>
                            </thead>
                            {recentMatchDetail === undefined ||
                            recentMatchDetail.length === 0 ? null : ( // </div> //   /> //     style={{ color: "var(--primary)" }} //   <CircularProgress // <div style={{ textAlign: "center" }}>
                              <tbody>
                                {recentMatchDetail === undefined ||
                                recentMatchDetail.livedata.response.batsmen ===
                                  undefined ||
                                recentMatchDetail.livedata.response.batsmen
                                  .length === 0 ? ( //    <div style={{ textAlign: "center" }}>
                                  //   <CircularProgress
                                  //     style={{ color: "var(--primary)" }}
                                  //   />
                                  // </div>
                                  <tr>
                                    <td className={styles.name}>
                                      <span className={styles.dot_blank}>
                                        <RxDotFilled />
                                      </span>{" "}
                                      ---
                                    </td>
                                    <td className={styles.headingData}>--</td>
                                    <td className={styles.headingData}>--</td>
                                    <td className={styles.headingData}>--</td>
                                    <td className={styles.headingData}>--</td>
                                    <td className={styles.headingData}>--</td>
                                  </tr>
                                ) : recentMatchDetail.livedata.response.batsmen
                                    .length === 1 ? (
                                  <tr>
                                    <td className={styles.name}>
                                      <span className={styles.dot_icon}>
                                        <RxDotFilled />
                                      </span>{" "}
                                      <span
                                      // onClick={() =>
                                      //   handleTeamID(
                                      //     recentMatchDetail.teama.team_id
                                      //   )
                                      // }
                                      >
                                        <Link
                                          href={`/players/${
                                            recentMatchDetail.livedata.response
                                              .batsmen[0].batsman_id
                                          }/${slugify(
                                            recentMatchDetail.livedata.response
                                              .batsmen[0].name
                                          )}`}
                                          className={styles.link}
                                        >
                                          {
                                            recentMatchDetail.livedata.response
                                              .batsmen[0].name
                                          }
                                        </Link>
                                      </span>
                                    </td>
                                    <td className={styles.headingData}>
                                      {
                                        recentMatchDetail.livedata.response
                                          .batsmen[0].runs
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {
                                        recentMatchDetail.livedata.response
                                          .batsmen[0].balls_faced
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {
                                        recentMatchDetail.livedata.response
                                          .batsmen[0].fours
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {
                                        recentMatchDetail.livedata.response
                                          .batsmen[0].sixes
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {
                                        recentMatchDetail.livedata.response
                                          .batsmen[0].runs
                                      }
                                    </td>
                                  </tr>
                                ) : (
                                  <>
                                    <tr>
                                      <td className={styles.name}>
                                        <span className={styles.dot_icon}>
                                          <RxDotFilled />
                                        </span>
                                        <Link
                                          href={`/players/${
                                            recentMatchDetail.livedata.response
                                              .batsmen[0].batsman_id
                                          }/${slugify(
                                            recentMatchDetail.livedata.response
                                              .batsmen[0].name
                                          )}`}
                                          className={styles.link}
                                        >
                                          {
                                            recentMatchDetail.livedata.response
                                              .batsmen[0].name
                                          }
                                        </Link>
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          recentMatchDetail.livedata.response
                                            .batsmen[0].runs
                                        }
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          recentMatchDetail.livedata.response
                                            .batsmen[0].balls_faced
                                        }
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          recentMatchDetail.livedata.response
                                            .batsmen[0].fours
                                        }
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          recentMatchDetail.livedata.response
                                            .batsmen[0].sixes
                                        }
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          recentMatchDetail.livedata.response
                                            .batsmen[0].strike_rate
                                        }
                                      </td>
                                    </tr>
                                    <tr style={{ color: "#878A93" }}>
                                      <td className={styles.name}>
                                        <span className={styles.dot_blank}>
                                          <RxDotFilled />
                                        </span>
                                        <Link
                                          href={`/players/${
                                            recentMatchDetail.livedata.response
                                              .batsmen[1].batsman_id
                                          }/${slugify(
                                            recentMatchDetail.livedata.response
                                              .batsmen[1].name
                                          )}`}
                                          className={styles.link}
                                        >
                                          {
                                            recentMatchDetail.livedata.response
                                              .batsmen[1].name
                                          }
                                        </Link>
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          recentMatchDetail.livedata.response
                                            .batsmen[1].runs
                                        }
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          recentMatchDetail.livedata.response
                                            .batsmen[1].balls_faced
                                        }
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          recentMatchDetail.livedata.response
                                            .batsmen[1].fours
                                        }
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          recentMatchDetail.livedata.response
                                            .batsmen[1].sixes
                                        }
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          recentMatchDetail.livedata.response
                                            .batsmen[1].strike_rate
                                        }
                                      </td>
                                    </tr>
                                  </>
                                )}
                              </tbody>
                            )}
                          </Table>
                        </div>

                        <div className={styles.playerDetail}>
                          <Table className={styles.Batting}>
                            <thead>
                              <tr>
                                <th
                                  className={`${styles.name} ${styles.BattingName}`}
                                >
                                  Bowling
                                </th>
                                <th className={styles.heading}>O</th>
                                <th className={styles.heading}>M</th>
                                <th className={styles.heading}>R</th>
                                <th className={styles.heading}>W</th>
                                <th className={styles.heading}>ECO</th>
                              </tr>
                            </thead>
                            <tbody>
                              {recentMatchDetail === undefined ||
                              recentMatchDetail.livedata.response.bowlers ===
                                undefined ||
                              recentMatchDetail.livedata.response.bowlers
                                .length === 0 ? (
                                <tr>
                                  <td className={styles.name}>
                                    <span className={styles.dot_blank}>
                                      <RxDotFilled />
                                    </span>{" "}
                                    ---
                                  </td>
                                  <td className={styles.headingData}>--</td>
                                  <td className={styles.headingData}>--</td>
                                  <td className={styles.headingData}>--</td>
                                  <td className={styles.headingData}>--</td>
                                  <td className={styles.headingData}>--</td>
                                </tr>
                              ) : recentMatchDetail.livedata.response.bowlers
                                  .length === 1 ? (
                                <tr>
                                  <td className={styles.name}>
                                    <span className={styles.dot_icon}>
                                      <RxDotFilled />
                                    </span>
                                    <Link
                                      href={`/players/${
                                        recentMatchDetail.livedata.response
                                          .bowlers[0].bowler_id
                                      }/${slugify(
                                        recentMatchDetail.livedata.response
                                          .bowlers[0].name
                                      )}`}
                                      className={styles.link}
                                    >
                                      {
                                        recentMatchDetail.livedata.response
                                          .bowlers[0].name
                                      }
                                    </Link>
                                  </td>
                                  <td className={styles.headingData}>
                                    {" "}
                                    {
                                      recentMatchDetail.livedata.response
                                        .bowlers[0].overs
                                    }
                                  </td>
                                  <td className={styles.headingData}>
                                    {" "}
                                    {
                                      recentMatchDetail.livedata.response
                                        .bowlers[0].maidens
                                    }
                                  </td>
                                  <td className={styles.headingData}>
                                    {" "}
                                    {
                                      recentMatchDetail.livedata.response
                                        .bowlers[0].runs_conceded
                                    }
                                  </td>
                                  <td className={styles.headingData}>
                                    {" "}
                                    {
                                      recentMatchDetail.livedata.response
                                        .bowlers[0].wickets
                                    }
                                  </td>
                                  <td className={styles.headingData}>
                                    {" "}
                                    {
                                      recentMatchDetail.livedata.response
                                        .bowlers[0].econ
                                    }
                                  </td>
                                </tr>
                              ) : (
                                <>
                                  <tr>
                                    <td className={styles.name}>
                                      <span className={styles.dot_icon}>
                                        <RxDotFilled />
                                      </span>
                                      <Link
                                        href={`/players/${
                                          recentMatchDetail.livedata.response
                                            .bowlers[0].bowler_id
                                        }/${slugify(
                                          recentMatchDetail.livedata.response
                                            .bowlers[0].name
                                        )}`}
                                        className={styles.link}
                                      >
                                        {
                                          recentMatchDetail.livedata.response
                                            .bowlers[0].name
                                        }
                                      </Link>
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        recentMatchDetail.livedata.response
                                          .bowlers[0].overs
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        recentMatchDetail.livedata.response
                                          .bowlers[0].maidens
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        recentMatchDetail.livedata.response
                                          .bowlers[0].runs_conceded
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        recentMatchDetail.livedata.response
                                          .bowlers[0].wickets
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        recentMatchDetail.livedata.response
                                          .bowlers[0].econ
                                      }
                                    </td>
                                  </tr>
                                  <tr style={{ color: "#878A93" }}>
                                    <td className={styles.name}>
                                      <span className={styles.dot_blank}>
                                        <RxDotFilled />
                                      </span>
                                      <Link
                                        href={`/players/${
                                          recentMatchDetail.livedata.response
                                            .bowlers[1].bowler_id
                                        }/${slugify(
                                          recentMatchDetail.livedata.response
                                            .bowlers[1].name
                                        )}`}
                                        className={styles.link}
                                      >
                                        {
                                          recentMatchDetail.livedata.response
                                            .bowlers[1].name
                                        }
                                      </Link>
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        recentMatchDetail.livedata.response
                                          .bowlers[1].overs
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        recentMatchDetail.livedata.response
                                          .bowlers[1].maidens
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        recentMatchDetail.livedata.response
                                          .bowlers[1].runs_conceded
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        recentMatchDetail.livedata.response
                                          .bowlers[1].wickets
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        recentMatchDetail.livedata.response
                                          .bowlers[1].econ
                                      }
                                    </td>
                                  </tr>
                                </>
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </>
                    ) : null}
                  </div>
                </Row>
              </Col>

              <Col sm={5} className={styles.col2}></Col>
            </Row>
            <Row className={styles.Row3}>
              {/* <div className={styles.Row3_inner}> */}
              <Col className={styles.footer}>
                <div className={styles.footerscore1}>
                  <h5>
                    Player Of the Match &nbsp;
                    <span className={styles.playeroftheMatch}>
                      {recentMatchDetail.livedata.response.man_of_the_match ===
                        "" ||
                      recentMatchDetail.livedata.response.man_of_the_match
                        .name === ""
                        ? "---"
                        : recentMatchDetail.livedata.response.man_of_the_match
                            .name}
                    </span>
                  </h5>
                </div>
              </Col>
              {/* </div> */}
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default ScorePanelRecentNew;
