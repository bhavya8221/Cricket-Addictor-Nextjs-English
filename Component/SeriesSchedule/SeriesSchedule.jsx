import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import classname from "classnames";
import HOST from "../../Constants/host";
import styles from "./SeriesSchedule.module.scss";
import LiveScoreCard from "../LiveScoreCard/LiveScoreCard";
import MenuButton from "../MenuButton/MenuButton";
import { seriesMatchAPI } from "../../Constants/Api/Api";
import Head from "next/head";
import Breadcrumbs from "../../Common/BreadcrumbsSchema/Breadcrumbs";

function SeriesSchedule(props) {
  const router = useRouter();
  const { status, title, cid } = router.query;

  const formattedTitle = title ? unslugify(title) : "";
  const pathname = router.asPath;
  const [seriesMatchData, setSeriesMatchData] = useState([]);
  const [format, setFormat] = useState("");
  const menus = [
    {
      title: <>Current Series</>,
      path: "/cricket-series/live",
    },
    {
      title: <>Completed Series</>,
      path: "/cricket-series/recent",
    },
    {
      title: <>Upcoming Series</>,
      path: "/cricket-series/upcoming",
    },
  ];

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
  
  function handleOnClickAll() {
    setFormat("");
  }
  function handleOnClickT20() {
    setFormat("T20");
  }
  function handleOnClickODI() {
    setFormat("ODI");
  }
  function handleOnClickTest() {
    setFormat("Test");
  }
  
  function unslugify(slug) {
    if (slug === undefined) return "";
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    }

  const [articleBreadcrumb, setArticleBreadcrumb] = useState({
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [],
  });
  
  useEffect(() => {
    if (!router.isReady) return;
    
    // status = router.query.status;
    // title = router.query.title;
    // cid = router.query.cid;
    
    setArticleBreadcrumb({
      ...articleBreadcrumb,
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
            status === "live"
              ? "Current Series"
              : status === "result"
              ? "Completed Series"
              : "Upcoming Series",
              item:
              status === "live"
              ? `${HOST}cricket-series/live/`
              : status === "result"
              ? `${HOST}cricket-series/recent/`
              : `${HOST}cricket-series/upcoming/`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: `schedule/${unslugify(title)} ${format}`,
              item: `${HOST}${pathname}/`,
            },
          ],
        });
        
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // setIsLoading(true);
    console.log("check format",format)
    seriesMatchAPI(format, cid, "Scheduled_Live")
    .then((res) => {
      console.log(res,"response")
      setSeriesMatchData(res.data.data.rows);
      // setIsLoading(false);
    })
    .catch((e) => {
      // Navigation(e.code, e.message);
    });
  }, [router.isReady,format]);
  
  return (
    <>
      <div className={styles.seriesSchedule_section}>
        <MenuButton
          title="All Series"
          menuitems={menus}
          pathname={pathname}
          activeMenu={
            status === undefined
              ? null
              : status === "live"
              ? 0
              : status === "result"
              ? 1
              : 2
          }
        />

        <Head>
          <title>{props.Metatitle} Schedule</title>
          <meta name="description" content={props.MetaDescription} />
          <link rel="canonical" href={props.Canonical} />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(articleBreadcrumb),
            }}
          />
        </Head>
        <Breadcrumbs itemListElement={articleBreadcrumb.itemListElement} />

        <div className={classname("row", styles.RowGrid)}>
          <div className={classname("col-md-8", styles.ColGrid)}>
            <div className="mx-2">
              <h3 className={styles.schedule_text}>Schedule</h3>
            </div>

            <div className="mx-2">
              <h3
                className={classname(
                  styles.series_title,
                  styles.title_overflow
                )}
              >
                {unslugify(title)}
              </h3>
            </div>
            <div
              className={classname("mx-2", styles.underline, styles.ColGrid)}
            />
          </div>
          <div className={classname("col-md-3", styles.fil, styles.ColGrid)}>
            <div className={styles.SSplayer_gender}>
              <h5
                className={styles.Rt20}
                style={{
                  backgroundColor: format === "" ? null : "unset",
                  color: format === "" ? "var(--primary)" : "white",
                }}
                onClick={handleOnClickAll}
              >
                All
              </h5>
              <h5
                className={styles.Rt20}
                style={{
                  backgroundColor: format === "T20" ? null : "unset",
                  color: format === "T20" ? "var(--primary)" : "white",
                }}
                onClick={handleOnClickT20}
              >
                T20
              </h5>
              <h5
                className={styles.Rt20}
                style={{
                  backgroundColor: format === "ODI" ? null : "unset",
                  color: format === "ODI" ? "var(--primary)" : "white",
                }}
                onClick={handleOnClickODI}
              >
                ODI
              </h5>
              <h5
                className={styles.Rt20}
                style={{
                  backgroundColor: format === "Test" ? null : "unset",
                  color: format === "Test" ? "var(--primary)" : "white",
                }}
                onClick={handleOnClickTest}
              >
                TEST
              </h5>
            </div>
          </div>
        </div>
        <div className={classname("row", styles.RowGrid)}>
          <div className={classname("col-md-12", styles.ColGrid)}>
            <div className="row">
              {seriesMatchData.length === 0 ? (
                <div
                  style={{
                    height: "100%",
                    marginTop: "100px",
                    marginBottom: "100px",
                  }}
                >
                  <h1 style={{ textAlign: "center", padding: "100px" }}>
                    No Schedules...
                  </h1>
                </div>
              ) : pathname.split("/")[1] +
                  "/" +
                  pathname.split("/")[2] +
                  "/" +
                  pathname.split("/")[3] ===
                  "series/schedule/live" ||
                pathname.split("/")[1] +
                  "/" +
                  pathname.split("/")[2] +
                  "/" +
                  pathname.split("/")[3] ===
                  "series/schedule/fixture" ? (
                seriesMatchData
                  .sort(function (a, b) {
                    var c = new Date(a.date_start);
                    var d = new Date(b.date_start);
                    return c - d;
                  })
                  .map((item, index) => {
                    return (
                      <div key={index} className="col-md-6">
                        <div className="mx-2">
                          <h3
                            className={classname(
                              styles.series_title,
                              styles.title_overflow
                            )}
                          >
                            {/* {item.date_start.split("T")[0] ===
                            new Date().toISOString().split("T")[0] ? (
                              <span className="status">{status}</span>
                            ) : (
                              <>
                                {getDay(item.date_start)}, {item.start_date}
                              </>
                            )} */}
                            {item.status_str === "Live" ? (
                              "Live"
                            ) : (
                              <>
                                {getDay(item.date_start)}, {item.start_date}
                              </>
                            )}
                          </h3>
                        </div>
                        {/* <Link
                          to={`/cricket-live-score/${
                            item.status_str === "live"
                              ? "live"
                              : item.status_str === "Scheduled"
                              ? "upcoming"
                              : "recent"
                          }/${item.match_id}/${item.latest_inning_number}`}
                          className="link_color"
                        > */}
                        <LiveScoreCard
                          data={item}
                          type={
                            item.status_str === "live"
                              ? "live-matches"
                              : item.status_str === "Scheduled"
                              ? "upcoming-matches"
                              : "recent-matches"
                          }
                          status={
                            item.date_start.split("T")[0] ===
                            new Date().toISOString().split("T")[0]
                              ? "live"
                              : null
                          }
                          location="series"
                        />
                        {/* </Link> */}
                      </div>
                    );
                  })
              ) : (
                seriesMatchData.map((item, index) => {
                  return (
                    <div key={index} className="col-md-6 mb-4">
                      <div className="mx-2">
                        <h3
                          className={classname(
                            styles.series_title,
                            styles.title_overflow
                          )}
                        >
                          {item.date_start.split("T")[0] ===
                          new Date().toISOString().split("T")[0] ? (
                            <span className={styles.status}>{status}</span>
                          ) : (
                            <>
                              {getDay(item.date_start)}, {item.start_date}
                            </>
                          )}
                        </h3>
                      </div>
                      {/* <Link
                        to={`/cricket-live-score/${
                          item.status_str === "live"
                            ? "live"
                            : item.status_str === "Scheduled"
                            ? "upcoming"
                            : "recent"
                        }/${item.match_id}/${item.latest_inning_number}`}
                        className="link_color"
                      > */}
                      <LiveScoreCard
                        data={item}
                        type={
                          item.status_str === "live"
                            ? "live-matches"
                            : item.status_str === "Scheduled"
                            ? "upcoming-matches"
                            : "recent-matches"
                        }
                        location="series"
                      />
                      {/* </Link> */}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          {/* <div className={classname("col-md-4", styles.ColGrid)}>
            <div className={styles.ads_bx}>
              <h4>AD</h4>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default SeriesSchedule;
