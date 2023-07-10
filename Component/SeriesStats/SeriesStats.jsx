import React, { useState, useCallback, useEffect } from "react";
import styles from "./SeriesStats.module.scss";
import MenuButton from "../MenuButton/MenuButton";
import SeriesResultCard from "../SeriesResultCard/SeriesResultCard";
import { competitionStatsTypeAPI } from "../../Constants/Api/Api";

// import BreadcrumbsSchema from "../BreadcrumbsSchema/BreadcrumbsSchema";
import { useRouter } from "next/router";
import Link from "next/link";
import classname from "classnames";
import Head from "next/head";
import Breadcrumbs from "../../Common/BreadcrumbsSchema/Breadcrumbs";
import HOST from "../../Constants/host";
function unslugify(slug) {
  if (!slug) {
    return ""; // Handle the case when slug is undefined or falsy
  }
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function SeriesStats(props) {
  const router = useRouter();
  const pathname = router.asPath;
  const [competitionStatType, setCompetitionStatType] = useState();
  const [activeGroupTitle, setActiveGroupTitle] = useState("Batting");
  const [activeFormats, setActiveFormats] = useState("t20");
  const { cid, title, status } = router.query;
  const [isLoading, setIsLoading] = useState(false);
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

  function handleOnClickT20() {
    setActiveFormats("t20");
  }
  function handleOnClickODI() {
    setActiveFormats("odi");
  }
  function handleOnClickBatting() {
    setActiveGroupTitle("Batting");
  }
  function handleOnClickBowling() {
    setActiveGroupTitle("Bowling");
  }
  // function handleOnClickAllTeam() {
  //   setActiveGroupTitle("Team");
  // }

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
    setIsLoading(true);
    competitionStatsTypeAPI(activeFormats, activeGroupTitle, cid)
      .then((res) => {
        setCompetitionStatType(res.data.data.selectedbox);
        setIsLoading(false);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [cid, activeFormats, activeGroupTitle]);

  
  const articleBreadcrumb = {
    "@context": "https://schema.org",
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
            ? `${HOST}cricket-series/live/`
            : status === "result"
            ? `${HOST}cricket-series/recent/`
            : `${HOST}cricket-series/upcoming/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `stats / ${unslugify(title)} ${activeFormats}`,
        item: `${HOST}${pathname}/`,
      },
    ],
  };
  return (
    <>
      <div className={styles.seriesStats_section}>
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
              <h3 className={styles.schedule_text}>Stats</h3>
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
            {/* {status === "result" ? ( */}
            <div className={styles.Rtype_group}>
              <div className={styles.Rplayer_formats_new}>
                <h5
                  className={styles.Rt20}
                  style={{
                    backgroundColor: activeFormats === "t20" ? null : "unset",
                    color: activeFormats === "t20" ? null : "white",
                  }}
                  onClick={handleOnClickT20}
                >
                  T20
                </h5>
                <h5
                  className={styles.Rt20}
                  style={{
                    backgroundColor: activeFormats === "odi" ? null : "unset",
                    color: activeFormats === "odi" ? null : "white",
                  }}
                  onClick={handleOnClickODI}
                >
                  ODI
                </h5>
              </div>

              <div className={`${styles.Sicc_type} "mt-2"`}>
                <h5
                  className={styles.Steam}
                  style={{
                    backgroundColor:
                      activeGroupTitle === "Batting" ? null : "unset",
                  }}
                  onClick={handleOnClickBatting}
                >
                  Batting
                </h5>
                <h5
                  className={styles.Sbowling}
                  style={{
                    backgroundColor:
                      activeGroupTitle === "Bowling" ? null : "unset",
                  }}
                  onClick={handleOnClickBowling}
                >
                  Bowling
                </h5>
                {/* <h5
                    className="Sallrounder"
                    style={{
                      backgroundColor:
                        activeGroupTitle === "Team" ? null : "unset",
                    }}
                    onClick={handleOnClickAllTeam}
                  >
                    Team
                  </h5> */}
              </div>
            </div>
            {/* ) : null} */}
          </div>
        </div>
        {isLoading === true ? //   /> //     size={40} //     loading={isLoading} //     color={"var(--primary)"} //   <ClipLoader // <div className="loader">
        // </div>
        null : (
          <div
            className={classname("row", styles.RowGrid)}
            style={{ marginTop: "25px", marginBottom: "25px" }}
          >
            {competitionStatType !== undefined ? (
              competitionStatType.map((item, index) => {
                return (
                  <div key={index} className="col-md-3">
                    <SeriesResultCard
                      data={item}
                      activeFormats={activeFormats}
                      activeGroupTitle={activeGroupTitle}
                    />
                  </div>
                );
              })
            ) : (
              <>
                <div className={classname("col-md-8", styles.ColGrid)}>
                  <div
                    style={{
                      height: "100%",
                      marginTop: "100px",
                      marginBottom: "100px",
                    }}
                  >
                    <h1 style={{ textAlign: "center", padding: "100px" }}>
                      No Stats...
                    </h1>
                  </div>
                </div>

                {/* <div className="col-md-4 ColGrid">
                  <div className="ads-bx">
                    <h4>AD</h4>
                  </div>
                </div> */}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default SeriesStats;
