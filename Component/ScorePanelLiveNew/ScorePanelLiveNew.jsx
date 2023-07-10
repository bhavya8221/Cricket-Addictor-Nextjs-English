import React, { useEffect, useState } from "react";
import styles from "./ScorePanelLiveNew.module.scss";
import Link from "next/link";
import { liveMatchByIdApi } from "../../Constants/Api/Api";
// import noFlag from "../../../assets/Images/no-flag.png";
import { Col, Row, Table } from "react-bootstrap";
import { RxDotFilled } from "react-icons/rx";
// import { Box, CircularProgress } from "@mui/material";
import slugify from "react-slugify";
import HOST from "../../Constants/host";
import { useRouter } from "next/router";
import Head from "next/head";
import Breadcrumbs from "../../Common/BreadcrumbsSchema/Breadcrumbs";

const ScorePanelLiveNew = (props) => {
  const router = useRouter();
  const [matchData, setMatchDatas] = useState();
  const { slug } = router.query;

  const [visible, setVisible] = useState(false);
  const pathname = router.asPath;
  const [batsman, setBatsman] = useState([]);
  const [bowlersdata, setBowlers] = useState([]);
  const [players, setPlayers] = useState([]);

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
    liveMatchByIdApi(slug === undefined ? null : slug[0])
      .then((res) => {
        setMatchDatas(res.data.data);
        setBatsman(res.data.data.livedata.response.batsmen);
        setBowlers(res.data.data.livedata.response.bowlers);
        setPlayers(res.data.data.livedata.response.players);
        setVisible(true);
      })
      .catch((e) => {
        // Navigation();
      });
  }, [slug === undefined ? null : slug[0]]);

  const nationalitybatsman =
    matchData === undefined
      ? null
      : (matchData.game_state_str.indexOf("delay") !== -1) == "delay"
      ? null
      : batsman === undefined
      ? null
      : batsman.map((item) => {
          const player = players.find(
            (player) => player.pid === item.batsman_id
          );
          if (player) {
            return player.nationality;
          }
          return null;
        });

  const nationalitybowler =
    matchData === undefined
      ? null
      : (matchData.game_state_str.indexOf("delay") !== -1) == "delay"
      ? null
      : bowlersdata === undefined
      ? null
      : bowlersdata.map((item) => {
          const player = players.find(
            (player) => player.pid === item.bowler_id
          );
          if (player) {
            return player.nationality;
          }
          return null;
        });

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
        name: "Cricket Live Matches",
        item: `${HOST}cricket-live-score/live-matches/all/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: matchData === undefined ? null : matchData.competition.title,
        item: `${HOST}${pathname.split("/")[1]}/${pathname.split("/")[2]}/${
          pathname.split("/")[3]
        }/${pathname.split("/")[4]}/${pathname.split("/")[5]}/`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name:
          pathname?.split("/")[6] === ""
            ? "Commentary"
            : pathname.split("/")[6],
        item: `${HOST}${pathname}/`,
      },
    ],
  };

  const eventSchema = {
    "@context": "http://schema.org",
    "@type": "SportsEvent",
    name: matchData === undefined ? null : matchData.competition.title,
    startDate: matchData === undefined ? null : matchData.date_start,
    endDate: matchData === undefined ? null : matchData.date_end,
    description: matchData === undefined ? null : matchData.live,
    location: {
      "@type": "Place",
      name: matchData === undefined ? null : matchData.venue.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: matchData === undefined ? null : matchData.venue.name,
        addressCountry:
          matchData === undefined ? null : matchData.venue.country,
      },
    },
    competitor: [
      {
        "@type": "SportsTeam",
        name: matchData === undefined ? null : matchData.teama.name,
        image: matchData === undefined ? null : matchData.teama.logo_url,
      },
      {
        "@type": "SportsTeam",
        name: matchData === undefined ? null : matchData.teamb.name,
        image: matchData === undefined ? null : matchData.teamb.logo_url,
      },
    ],
  };

  return (
    <>
      {/* India vs Australia Cricket Live Score, 4th Test, Mar 09, Australia tour of India, 2023
    matchData.competition.title */}
      {matchData === undefined ? null : (
        <>
          <Breadcrumbs itemListElement={articleBreadcrumb.itemListElement} />

          <div className={styles.scorePanel_sectio_live_New}>
            <Head>
              {" "}
              <title itemprop="name">
                {pathname.split("/")[6] === "" ||
                pathname.split("/")[6] === null
                  ? matchData.teama.name +
                    " बनाम " +
                    matchData.teamb.name +
                    " Live Score " +
                    " , " +
                    matchData.competition.title
                  : pathname.split("/")[6] === "liveblog"
                  ? matchData.teama.name +
                    " बनाम " +
                    matchData.teamb.name +
                    " मैच लाइव ब्लॉग " +
                    " , " +
                    matchData.competition.title
                  : pathname.split("/")[6] === "scorecard"
                  ? matchData.teama.name +
                    " बनाम " +
                    matchData.teamb.name +
                    " Completed स्कोरकार्ड " +
                    " , " +
                    matchData.competition.title
                  : pathname.split("/")[6] === "teams"
                  ? matchData.teama.name +
                    " बनाम " +
                    matchData.teamb.name +
                    " Team " +
                    " , " +
                    matchData.competition.title
                  : pathname.split("/")[6] === "videos"
                  ? matchData.teama.name +
                    " बनाम " +
                    matchData.teamb.name +
                    " मैच Videos " +
                    " , " +
                    matchData.competition.title
                  : pathname.split("/")[6] === "photos"
                  ? matchData.teama.name +
                    " बनाम " +
                    matchData.teamb.name +
                    "मैच की तस्वीरें" +
                    " , " +
                    matchData.competition.title
                  : pathname.split("/")[6] === "wagonwheel"
                  ? matchData.teama.name +
                    " बनाम " +
                    matchData.teamb.name +
                    " वैगनव्हील " +
                    " , " +
                    matchData.competition.title
                  : pathname.split("/")[6] === "manhattan"
                  ? matchData.teama.name +
                    " बनाम " +
                    matchData.teamb.name +
                    " मैनहटन " +
                    " , " +
                    matchData.competition.title
                  : matchData.teama.name +
                    " बनाम " +
                    matchData.teamb.name +
                    " मैच कमेंट्री " +
                    " , " +
                    matchData.competition.title}
              </title>
              <meta
                name="description"
                itemprop="description"
                content={`${matchData.teama.name} बनाम ${matchData.teamb.name}  Live Score ${matchData.competition.title} ${matchData.teama.name} बनाम ${matchData.teamb.name} Live Score क्रिकेट स्कोर, मैच परिणाम, Completed स्कोरबोर्ड और News प्राप्त करें।`}
              />
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(articleBreadcrumb),
                }}
              />
              {/* <link rel="canonical" href={canonicalUrl} /> */}
              <link rel="canonical" href={`${canonicalUrl}`} />
              {/* <link rel="canonical" href="https://www.example.com/my-page" /> */}
              {/* <script type="application/ld+json">
              {JSON.stringify(articleBreadcrumb)}
            </script>
            <script type="application/ld+json">
              {JSON.stringify(eventSchema)}
            </script> */}
            </Head>

            <Row className={styles.Row1}>
              <div className={styles.Row1_inner}>
                <h1>
                  <Link
                    href={`/cricket-series/${matchData.status_str}/${
                      matchData.competition.cid
                    }/${slugify(matchData.competition.title)}-${
                      matchData.season
                    }/schedule/`}
                    className={styles.link}
                  >
                    {matchData.competition.title}
                  </Link>
                </h1>
                <h2>
                  {" "}
                  {matchData.venue.name}, {matchData.venue.location},
                  {matchData.venue.country}
                </h2>{" "}
              </div>
            </Row>
            <Row className={styles.Row2}>
              <Col sm={7} className={styles.col1}>
                <Row className={styles.Col1Row1}>
                  <div className={styles.Col1Row1_inner}>
                    <div className={styles.top}>
                      <div className={styles.top1}>
                        {/* <div className={"switcherBtn"}> */}
                        <div className={styles["live-move"]}>
                          <h6 className={styles.live_text}>LIVE</h6>
                          <div id="div2"></div>
                          {/* </div> */}
                        </div>
                      </div>
                      <div className={styles.top2}>{/* <h6></h6> */}</div>
                    </div>
                    <div className={styles.teamA}>
                      <div className={styles.logo}>
                        <h5 className={styles.team_name}>
                          {matchData.livedata.response.teams[0].tid ===
                          undefined ? (
                            matchData.teama.name
                          ) : (
                            <Link
                              href={`/teams/${
                                matchData.livedata.response.teams[0].sex ===
                                "male"
                                  ? "men"
                                  : "women"
                              }/${
                                matchData.livedata.response.teams[0].title ===
                                matchData.teama.name
                                  ? matchData.livedata.response.teams[0].tid
                                  : matchData.livedata.response.teams[1].tid
                              }/${
                                matchData.livedata.response.teams[0].title ===
                                matchData.teama.name
                                  ? slugify(
                                      matchData.livedata.response.teams[0].title
                                    )
                                  : slugify(
                                      matchData.livedata.response.teams[1].title
                                    )
                              }-cricket-team/`}
                              className={styles.link}
                            >
                              {matchData.teama.name}
                            </Link>
                          )}
                        </h5>
                      </div>
                      {matchData.format_str === "Test" ? (
                        <div className={styles.score}>
                          {matchData.teama.scores_full === "" ||
                          matchData.teama.scores_full === undefined ||
                          matchData.teama.scores === "" ||
                          matchData.teama.scores === undefined ? (
                            <h6>(0.0&nbsp;ov)&nbsp;0/0</h6>
                          ) : (
                            <h6>
                              {matchData.teama.scores +
                                " " +
                                "(" +
                                matchData.teama.scores_full.split(" (").pop()}
                            </h6>
                          )}
                        </div>
                      ) : (
                        <div className={styles.score}>
                          {matchData.teama.scores_full === "" ||
                          matchData.teama.scores_full === undefined ? (
                            <h6>(0.0&nbsp;ov)&nbsp;0/0</h6>
                          ) : (
                            <h6>{matchData.teama.scores_full}</h6>
                          )}
                        </div>
                      )}
                    </div>
                    <div className={styles.teamB}>
                      <div className={styles.logo}>
                        <h5 className={styles.team_name}>
                          {" "}
                          {matchData.livedata.response.teams[1].tid ===
                          undefined ? (
                            matchData.teamb.name
                          ) : (
                            <Link
                              href={`/teams/${
                                matchData.livedata.response.teams[1].sex ===
                                "male"
                                  ? "men"
                                  : "women"
                              }/${
                                matchData.livedata.response.teams[0].title ===
                                matchData.teamb.name
                                  ? matchData.livedata.response.teams[0].tid
                                  : matchData.livedata.response.teams[1].tid
                              }/${
                                matchData.livedata.response.teams[0].title ===
                                matchData.teamb.name
                                  ? slugify(
                                      matchData.livedata.response.teams[0].title
                                    )
                                  : slugify(
                                      matchData.livedata.response.teams[1].title
                                    )
                              }-cricket-team/`}
                              className={styles.link}
                            >
                              {matchData.teamb.name}
                            </Link>
                          )}
                        </h5>
                      </div>
                      {matchData.format_str === "Test" ? (
                        <div className={styles.score}>
                          {matchData.teamb.scores_full === "" ||
                          matchData.teamb.scores_full === undefined ||
                          matchData.teamb.scores === "" ||
                          matchData.teamb.scores === undefined ? (
                            <h6>(0.0&nbsp;ov)&nbsp;0/0</h6>
                          ) : (
                            <h6>
                              {matchData.teamb.scores +
                                " " +
                                "(" +
                                matchData.teamb.scores_full.split(" (").pop()}
                            </h6>
                          )}
                        </div>
                      ) : (
                        <div className={styles.score}>
                          {matchData.teamb.scores_full === "" ||
                          matchData.teamb.scores_full === undefined ? (
                            <h6>(0.0&nbsp;ov)&nbsp;0/0</h6>
                          ) : (
                            <h6>{matchData.teamb.scores_full}</h6>
                          )}
                        </div>
                      )}
                    </div>

                    <div className={styles.won}>
                      <h6>{matchData.status_note}</h6>
                    </div>
                  </div>
                </Row>
                <Row className={styles.Col1Row2}>
                  <div className={styles.Col1Row2_inner}>
                    {visible === true &&
                    slug[2] !== "null" &&
                    matchData !== undefined ? (
                      <>
                        <div className={styles.playerDetail}>
                          <Table className={styles.Batting}>
                            <thead>
                              <tr>
                                <th className={styles["name BattingName"]}>
                                  Batting
                                </th>
                                <th className={styles.heading}>R</th>
                                <th className={styles.heading}>B</th>
                                <th className={styles.heading}>4s</th>
                                <th className={styles.heading}>6s</th>
                                <th className={styles.heading}>SR</th>
                              </tr>
                            </thead>
                            {matchData === undefined ||
                            matchData.length === 0 ? null : ( // </div> //   /> //     style={{ color: "var(--primary)" }} //   <CircularProgress // <div style={{ textAlign: "center" }}>
                              <tbody>
                                {matchData === undefined ||
                                matchData.livedata.response.batsmen ===
                                  undefined ||
                                matchData.livedata.response.batsmen.length ===
                                  0 ? (
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
                                ) : matchData.livedata.response.batsmen
                                    .length === 1 ? (
                                  <tr>
                                    <td className={styles.name}>
                                      <span className={styles.dot_icon}>
                                        <RxDotFilled />
                                      </span>{" "}
                                      <span>
                                        <Link
                                          href={
                                            (matchData.game_state_str.indexOf(
                                              "delay"
                                            ) !==
                                              -1) ==
                                              "delay" ||
                                            nationalitybatsman !== null
                                              ? `/players/${slugify(
                                                  nationalitybatsman[0]
                                                )}/ ${
                                                  matchData.livedata.response
                                                    .batsmen[0].batsman_id
                                                }/${slugify(
                                                  matchData.livedata.response
                                                    .batsmen[0].name
                                                )}/`
                                              : "#"
                                          }
                                          className={styles.link}
                                        >
                                          {
                                            matchData.livedata.response
                                              .batsmen[0].name
                                          }
                                        </Link>
                                      </span>
                                    </td>
                                    <td className={styles.headingData}>
                                      {
                                        matchData.livedata.response.batsmen[0]
                                          .runs
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {
                                        matchData.livedata.response.batsmen[0]
                                          .balls_faced
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {
                                        matchData.livedata.response.batsmen[0]
                                          .fours
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {
                                        matchData.livedata.response.batsmen[0]
                                          .sixes
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {
                                        matchData.livedata.response.batsmen[0]
                                          .runs
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
                                          href={
                                            (matchData.game_state_str.indexOf(
                                              "delay"
                                            ) !==
                                              -1) ==
                                              "delay" ||
                                            nationalitybatsman !== null
                                              ? `/players/${slugify(
                                                  nationalitybatsman[0]
                                                )}/${
                                                  matchData.livedata.response
                                                    .batsmen[0].batsman_id
                                                }/${slugify(
                                                  matchData.livedata.response
                                                    .batsmen[0].name
                                                )}/`
                                              : "#"
                                          }
                                          className={styles.link}
                                        >
                                          {
                                            matchData.livedata.response
                                              .batsmen[0].name
                                          }
                                        </Link>
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          matchData.livedata.response.batsmen[0]
                                            .runs
                                        }
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          matchData.livedata.response.batsmen[0]
                                            .balls_faced
                                        }
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          matchData.livedata.response.batsmen[0]
                                            .fours
                                        }
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          matchData.livedata.response.batsmen[0]
                                            .sixes
                                        }
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          matchData.livedata.response.batsmen[0]
                                            .strike_rate
                                        }
                                      </td>
                                    </tr>
                                    <tr style={{ color: "#878A93" }}>
                                      <td className={styles.name}>
                                        <span className={styles.dot_blank}>
                                          <RxDotFilled />
                                        </span>
                                        <Link
                                          href={
                                            (matchData.game_state_str.indexOf(
                                              "delay"
                                            ) !==
                                              -1) ==
                                              "delay" ||
                                            nationalitybatsman !== null
                                              ? `/players/${slugify(
                                                  nationalitybatsman[1]
                                                )}/${
                                                  matchData.livedata.response
                                                    .batsmen[1].batsman_id
                                                }/${slugify(
                                                  matchData.livedata.response
                                                    .batsmen[1].name
                                                )}/`
                                              : "#"
                                          }
                                          className={styles.link}
                                        >
                                          {
                                            matchData.livedata.response
                                              .batsmen[1].name
                                          }
                                        </Link>
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          matchData.livedata.response.batsmen[1]
                                            .runs
                                        }
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          matchData.livedata.response.batsmen[1]
                                            .balls_faced
                                        }
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          matchData.livedata.response.batsmen[1]
                                            .fours
                                        }
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          matchData.livedata.response.batsmen[1]
                                            .sixes
                                        }
                                      </td>
                                      <td className={styles.headingData}>
                                        {
                                          matchData.livedata.response.batsmen[1]
                                            .strike_rate
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
                                <th className={styles["name BattingName"]}>
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
                              {matchData === undefined ||
                              matchData.livedata.response.bowlers ===
                                undefined ||
                              matchData.livedata.response.bowlers.length ===
                                0 ? (
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
                              ) : matchData.livedata.response.bowlers.length ===
                                1 ? (
                                <tr>
                                  <td className={styles.name}>
                                    <span className={styles.dot_icon}>
                                      <RxDotFilled />
                                    </span>
                                    <Link
                                      href={
                                        (matchData.game_state_str.indexOf(
                                          "delay"
                                        ) !==
                                          -1) ==
                                          "delay" || nationalitybowler !== null
                                          ? `/players/${slugify(
                                              nationalitybowler[0]
                                            )}/${
                                              matchData.livedata.response
                                                .bowlers[0].bowler_id
                                            }/${slugify(
                                              matchData.livedata.response
                                                .bowlers[0].name
                                            )}/`
                                          : "#"
                                      }
                                      className={styles.link}
                                    >
                                      {
                                        matchData.livedata.response.bowlers[0]
                                          .name
                                      }
                                    </Link>
                                  </td>
                                  <td className={styles.headingData}>
                                    {" "}
                                    {
                                      matchData.livedata.response.bowlers[0]
                                        .overs
                                    }
                                  </td>
                                  <td className={styles.headingData}>
                                    {" "}
                                    {
                                      matchData.livedata.response.bowlers[0]
                                        .maidens
                                    }
                                  </td>
                                  <td className={styles.headingData}>
                                    {" "}
                                    {
                                      matchData.livedata.response.bowlers[0]
                                        .runs_conceded
                                    }
                                  </td>
                                  <td className={styles.headingData}>
                                    {" "}
                                    {
                                      matchData.livedata.response.bowlers[0]
                                        .wickets
                                    }
                                  </td>
                                  <td className={styles.headingData}>
                                    {" "}
                                    {
                                      matchData.livedata.response.bowlers[0]
                                        .econ
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
                                        href={
                                          (matchData.game_state_str.indexOf(
                                            "delay"
                                          ) !==
                                            -1) ==
                                            "delay" ||
                                          nationalitybowler !== null
                                            ? `/players/${slugify(
                                                nationalitybowler[0]
                                              )}/${
                                                matchData.livedata.response
                                                  .bowlers[0].bowler_id
                                              }/${slugify(
                                                matchData.livedata.response
                                                  .bowlers[0].name
                                              )}/`
                                            : "#"
                                        }
                                        className={styles.link}
                                      >
                                        {
                                          matchData.livedata.response.bowlers[0]
                                            .name
                                        }
                                      </Link>
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        matchData.livedata.response.bowlers[0]
                                          .overs
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        matchData.livedata.response.bowlers[0]
                                          .maidens
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        matchData.livedata.response.bowlers[0]
                                          .runs_conceded
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        matchData.livedata.response.bowlers[0]
                                          .wickets
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        matchData.livedata.response.bowlers[0]
                                          .econ
                                      }
                                    </td>
                                  </tr>
                                  <tr style={{ color: "#878A93" }}>
                                    <td className={styles.name}>
                                      <span className={styles.dot_blank}>
                                        <RxDotFilled />
                                      </span>
                                      <Link
                                        href={
                                          (matchData.game_state_str.indexOf(
                                            "delay"
                                          ) !==
                                            -1) ==
                                            "delay" ||
                                          nationalitybowler !== null
                                            ? `/players/${slugify(
                                                nationalitybowler[1]
                                              )}/${
                                                matchData.livedata.response
                                                  .bowlers[1].bowler_id
                                              }/${slugify(
                                                matchData.livedata.response
                                                  .bowlers[1].name
                                              )}/`
                                            : "#"
                                        }
                                        className={styles.link}
                                      >
                                        {
                                          matchData.livedata.response.bowlers[1]
                                            .name
                                        }
                                      </Link>
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        matchData.livedata.response.bowlers[1]
                                          .overs
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        matchData.livedata.response.bowlers[1]
                                          .maidens
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        matchData.livedata.response.bowlers[1]
                                          .runs_conceded
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        matchData.livedata.response.bowlers[1]
                                          .wickets
                                      }
                                    </td>
                                    <td className={styles.headingData}>
                                      {" "}
                                      {
                                        matchData.livedata.response.bowlers[1]
                                          .econ
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
              <Col sm={6} className={styles.footer}>
                <div className={styles.footerscore1}>
                  <h5>
                    Current RR :{" "}
                    {matchData === undefined ||
                    matchData.livedata.response.live_score.runrate === ""
                      ? "---"
                      : matchData.livedata.response.live_score.runrate}
                  </h5>
                </div>
                <div className={styles.footerscore2}>
                  <h5>
                    Last 10 ov(RR) :{" "}
                    {matchData === undefined ||
                    matchData.livedata.response.live_inning === undefined ||
                    matchData.livedata.response.live_inning.last_ten_overs
                      .length === 0
                      ? "--"
                      : matchData.livedata.response.live_inning.last_ten_overs.split(
                          " "
                        )[1]}
                  </h5>
                </div>
              </Col>
              <Col sm={6} className={styles.footerscore3}>
                <h5>{matchData === undefined || matchData.toss.text}</h5>
              </Col>
              {/* </div> */}
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default ScorePanelLiveNew;
