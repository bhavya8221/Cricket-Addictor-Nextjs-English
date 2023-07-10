import React, { useState, useEffect, useCallback } from "react";
import styles from "./ScoreBoxNew.module.scss";
import {
  newRecentMatchApi,
  newUpcommingMatchApi,
  newLiveMatchApi,
  notifyListAPI,
  teamFilterAPI,
} from "../../Constants/Api/Api";
import LiveScoreCard from "../LiveScoreCard/LiveScoreCard";
// import ClipLoader from "react-spinners/ClipLoader";
// import BreadcrumbsSchema from "../BreadcrumbsSchema/BreadcrumbsSchema";
import HOST from "../../Constants/host";
import { useRouter } from "next/router";
import LiveScore from "../LiveScore/LiveScore";
import BreadcrumbsSchema from "../../Common/BreadcrumbsSchema/BreadcrumbsSchema";
import Head from "next/head";
import Breadcrumbs from "../../Common/BreadcrumbsSchema/Breadcrumbs";

const ScoreBoxNew = (props) => {
  const router = useRouter();
  const pathname = router.asPath;
  const [ScoreData, setScoreData] = useState({});
  const [filterScoreData, setFilterScoreData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notifyList, setNotifyList] = useState([]);
  const { teams, groups, start_date, matchFilter } = router.query;
 
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
    if (pathname === `/cricket-live-score/live-matches/${matchFilter}/`) {
      setIsLoading(true);
      newLiveMatchApi(matchFilter === "all" ? "" : matchFilter)
        .then((res) => {
          setScoreData(res.data.data);
          setIsLoading(false);
        })
        .catch((e) => {
        
        });
    }
    if (pathname === `/cricket-live-score/recent-matches/${matchFilter}/`) {
      setIsLoading(true);
      newRecentMatchApi(matchFilter === "all" ? "" : matchFilter)
        .then((res) => {
        
          setScoreData(res.data.data);
          setIsLoading(false);
        })
        .catch((e) => {
        
        });
    }
    if (pathname === `/cricket-live-score/upcoming-matches/${matchFilter}/`) {
      setIsLoading(true);
      newUpcommingMatchApi(matchFilter === "all" ? "" : matchFilter)
        .then((res) => {
          setScoreData(res.data.data);
          setIsLoading(false);
        })
        .catch((e) => {
        
        });
      notifyListAPI()
        .then((response) => {
          setNotifyList(response.data.data.rows);
          
        })
        .catch((e) => {
          
        });
    }
    if (
      pathname ===
      `/cricket-live-score/recent-matches/undefined/undefined/undefined/${matchFilter}/`
    ) {
      setIsLoading(true);
      newRecentMatchApi(matchFilter === "all" ? "" : matchFilter)
        .then((res) => {
          setScoreData(res.data.data);
          setIsLoading(false);
        })
        .catch((e) => {
       
        });
    } else if (
      pathname !== `/cricket-live-score/upcoming-matches/${matchFilter}/` &&
      pathname !== `/cricket-live-score/live-matches/${matchFilter}/` &&
      pathname.split("/")[3] === "recent-matches"
    ) {
      setIsLoading(true);
      teamFilterAPI(
        teams === "undefined" ? "" : teams,
        groups === "undefined" ? "" : groups,
        start_date === "undefined" ? "" : start_date
      )
        .then((res) => {
          setFilterScoreData(res.data.data.rows);
          setIsLoading(false);
        })
        .catch((e) => {
         
        });
    }
  }, [pathname, teams, groups, start_date, matchFilter, props.type]);


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
        name:
          props.type === "live-matches"
            ? "Cricket Live Matches"
            : props.type === "recent-matches"
            ? "Cricket completed Matches"
            : "Cricket Upcoming Matches",
        item: `${HOST}${pathname}/`,
      },
    ],
  };

  return (
    <>
      <LiveScore />
      <div className={styles.scoreBoxNEW_section}>
        <Head>
          <title itemprop="name">
            {props.type === "live-matches"
              ? "Live Scores : Recently Completed Cricket Matches"
              : props.type === "recent-matches"
              ? "Live Scores : Recently Completed Cricket Matches"
              : "Cricket Series - Upcoming International, Domestic and T20 Series"}
          </title>
          <meta
            name="description"
            itemprop="description"
            content={
              props.type === "live-matches"
                ? "Get All Matches Live Cricket Scores, full Scorecard Updates of all International and domestic cricket matches"
                : props.type === "recent-matches"
                ? "Recently completed cricket match scores and stats for International, Domestic, T20 and T10 Leagues"
                : "Cricket Schedule of International, T20 and T10 Leagues & domestic cricket matches on Cricketaddictor"
            }
          />
          <link
            rel="canonical"
            href={`${HOST}cricket-live-score/${props.type}/`}
          />

<script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleBreadcrumb),
          }}
        />
        </Head>
        {isLoading === true ? null : (
          <>
            <div className={`row ${styles.respon}`}>
              {/* col 1 */}
              <div className="col" style={{ background: "white" }}>
              <Breadcrumbs itemListElement={articleBreadcrumb.itemListElement} />

          
                <div className={styles.first_col_box}>
                  <hr />

                  {(teams !== "undefined" ||
                    groups !== "undefined" ||
                    start_date !== "undefined") &&
                  pathname.split("/")[3] === "recent-matches" ? (
                    <div
                      className={`row ${styles.marginSection} ${styles.filterDiv}`}
                    >
                      {filterScoreData.length === 0 &&
                      notifyList.length === 0 ? (
                        <h3 style={{ marginLeft: 10 }}>No Matches...</h3>
                      ) : (
                        filterScoreData
                          .sort(function (a, b) {
                            return a.domestic - b.domestic;
                          })
                          .map((item, index) => {
                            return (
                              <div key={index} className="col-md-6">
                                <div
                                  className={`${styles.wid_size} ${styles.res_w}`}
                                >
                                  <h6 className={styles.heading_scoreBox}>
                                    {item.competition === undefined
                                      ? item.title
                                      : item.competition.title}
                                  </h6>
                                  <hr className={styles.underlines} />
                                  {props.type === "upcoming-matches" ? (
                                    <h4
                                      className={`${styles.date_scoreBox} ${styles.date_heading_scoreBox}`}
                                    >
                                      {getDay(item.date_start)},{" "}
                                      {`${
                                        new Date(item.date_start)
                                          .toLocaleDateString("en-us", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                          })
                                          .split(",")[0]
                                      } ${
                                        new Date(item.date_start)
                                          .toLocaleDateString("en-us", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                          })
                                          .split(",")[1]
                                      }`}
                                    </h4>
                                  ) : null}
                                </div>
                                {props.type === "live-matches" ? (
                                  <LiveScoreCard
                                    data={item}
                                    type={props.type}
                                  />
                                ) : props.type === "recent-matches" ? (
                                  <LiveScoreCard
                                    data={item}
                                    type={props.type}
                                  />
                                ) : (
                                  <LiveScoreCard
                                    data={item}
                                    type={props.type}
                                  />
                                )}
                              </div>
                            );
                          })
                      )}
                    </div>
                  ) : (
                    <div className={`row ${styles.marginSection}`}>
                      {Object.keys(ScoreData).length === 0 ? (
                        <h3 style={{ marginLeft: 10 }}>No Matches...</h3>
                      ) : (
                        Object.keys(ScoreData).map((item, index) => {
                          return (
                            <div
                              key={index}
                              className={
                                props.type === "live-matches" &&
                                ScoreData[item].length <= 1
                                  ? "col-md-6 mt-2"
                                  : "col-md-12 mt-2"
                              }
                            >
                              <div
                                className={`${styles.wid_size} ${styles.res_w}`}
                              >
                                <h6 className={styles.heading_scoreBox}>
                                  {item}
                                </h6>
                                <hr className={styles.underlines} />
                              </div>
                              <div className={`row ${styles.score_box}`}>
                                {ScoreData[item].map((item2, index2) => {
                                  return (
                                    <div
                                      className={
                                        props.type === "live-matches" &&
                                        ScoreData[item].length <= 1
                                          ? "col-md-12"
                                          : "col-md-6"
                                      }
                                      style={{
                                        marginTop:
                                          props.type === "upcoming-matches"
                                            ? 0
                                            : 5,
                                      }}
                                      key={index2}
                                    >
                                      {props.type === "upcoming-matches" ? (
                                        <h4
                                          className={`${styles.date_scoreBox} ${styles.date_heading_scoreBox}`}
                                        >
                                          {getDay(item2.date_start)},{" "}
                                          {`${
                                            new Date(item2.date_start)
                                              .toLocaleDateString("en-us", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                              })
                                              .split(",")[0]
                                          } ${
                                            new Date(item2.date_start)
                                              .toLocaleDateString("en-us", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                              })
                                              .split(",")[1]
                                          }`}
                                        </h4>
                                      ) : null}

                                      <LiveScoreCard
                                        data={item2}
                                        type={props.type}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* col 2 */}
              {/* <div className="col-xs-12 col-lg-4 child">
            <div className="mx-2 second_col_box">
              <div className="mx-2 my-2 ads">
                <h4 className="adColor">AD</h4>
              </div>
            </div>
          </div> */}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default ScoreBoxNew;
