import React, { useState, useEffect, useCallback } from "react";
import styles from "./SeriesResult.module.scss";
import LiveScoreCard from "../LiveScoreCard/LiveScoreCard";
import MenuButton from "../MenuButton/MenuButton";
import { seriesMatchAPI } from "../../Constants/Api/Api";
 
// import BreadcrumbsSchema from "../BreadcrumbsSchema/BreadcrumbsSchema";
import slugify from "react-slugify";
import HOST from "../../Constants/host";
import classname from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import Breadcrumbs from "../../Common/BreadcrumbsSchema/Breadcrumbs";
import Head from "next/head";
function unslugify(slug) {
  if (!slug) {
    return ""; // Handle the case when slug is undefined or falsy
  }
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function SeriesResult(props) {
   
  const router = useRouter();
  const pathname = router.asPath;
  const [seriesMatchData, setSeriesMatchData] = useState([]);
  const [format, setFormat] = useState("");
  const { cid, title, status } = router.query;
 
  const unslugified = unslugify(title);
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

  // function unslugify(slug) {
  //   return slug
  //     .split("-")
  //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //     .join(" ");
  // }

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
    // setIsLoading(true);
    seriesMatchAPI(format, cid, "Completed")
      .then((res) => {
        setSeriesMatchData(res.data.data.rows);
        // setIsLoading(false);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [format, cid]);

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
          status === "live"
            ? "Current Series"
            : status === "result"
            ? "Completed Series"
            : "Upcoming Series",
        item:
          status === "live"
            ? `${HOST}cricket-series/live`
            : status === "result"
            ? `${HOST}cricket-series/recent`
            : `${HOST}cricket-series/upcoming`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `result/${unslugified} ${format}`,
        item: `${HOST}${pathname}`,
      },
    ],
  };


  return (
    <>
      <div className={styles.seriesResult_section}>
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
          <title>{props.Metatitle} Result</title>
          <meta name="description" content={props.MetaDescription} />
          <link rel="canonical" href={props.Canonical}/>

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
              <h3 className={styles.schedule_text}>
                
                Result
              </h3>
            </div>

            <div className="mx-2">
              <h3
                className={classname(
                  styles.series_title,
                  styles.title_overflow
                )}
              >
                {/* {unslugify(title)} */}
                {title}
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
                    No Result...
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
                            {getDay(item.date_start)}, {item.start_date}
                          </h3>
                        </div>
                        {/* <NextLink
                          href={`/cricket-live-score/${
                            item.status_str === "live"
                              ? "live-matches"
                              : item.status_str === "Scheduled"
                              ? "upcoming-matches"
                              : "recent-matches"
                          }/${item.match_id}/${
                            item.latest_inning_number
                          }/${slugify(item.short_title)}-${slugify(
                            item.subtitle
                          )}-${slugify(item.competition.title)}`}
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
                        {/* </NextLink> */}
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
                      {/* <NextLink
                        to={`/cricket-live-score/${
                          item.status_str === "live"
                            ? "live-matches"
                            : item.status_str === "Scheduled"
                            ? "upcoming-matches"
                            : "recent-matches"
                        }/${item.match_id}/${
                          item.latest_inning_number
                        }/${slugify(item.short_title)}-${slugify(
                          item.subtitle
                        )}-${slugify(item.competition.title)}`}
                        className="link_color"
                      > */}
                      <LiveScoreCard
                        data={item}
                        type={
                          item.status_str === "live"
                            ? "live-matches"
                            : item.status_str === "fixture"
                            ? "upcoming-matches"
                            : "recent-matches"
                        }
                        location="series"
                      />
                      {/* </NextLink> */}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          {/* <div className="col-md-4 ColGrid">
            <div className="ads-bx">
              <h4>AD</h4>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default SeriesResult;
