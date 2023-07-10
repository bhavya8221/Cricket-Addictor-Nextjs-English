import React from "react";
import styles from "../../styles/Table.module.scss";

import { Row } from "react-bootstrap";
import SideTable from "../../Component/TeamHome/components/Squad/OverviewTable/SideTable/SideTable";
import Banner from "../../Component/TeamHome/components/Banner/Banner";
import { useRouter } from "next/router";
import Overviewcom from "../../Component/TeamHome/components/Squad/OverviewTable/Overview/Overview";
// import { Stats } from "fs";
import Records from "../../Component/TeamHome/components/Squad/OverviewTable/Records/Records";
import Matches from "../../Component/TeamHome/components/Squad/OverviewTable/Matches/Matches";
import SquadVideo from "../../Component/TeamHome/components/Squad/OverviewTable/SquadVideo/SquadVideo";
import SquadNews from "../../Component/TeamHome/components/Squad/OverviewTable/SquadNews/SquadNews";
import SquadPhotos from "../../Component/TeamHome/components/Squad/OverviewTable/SquadPhotos/SquadPhotos";
import Stats from "../../Component/TeamHome/components/Squad/OverviewTable/Stats/Stats";
import Breadcrumbs from "../../Common/BreadcrumbsSchema/Breadcrumbs";
import HOST from "../../Constants/host";
const Table = () => {
  const router = useRouter();
  const pathname = router.asPath;
  const { slug } = router.query;
  const initialURL = `/players/${slug === undefined ? null : slug[0]}/${
    slug === undefined ? null : slug[1]
  }/${slug === undefined ? null : slug[2]}`;

  const handleButtonClick = (path) => {
    const fullURL = initialURL + path;
    router.push(fullURL);
  };
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
        name: "Players",
        item: `${HOST}players/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: slug === undefined ? null : slug[0],
        item: `${HOST}players/`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name:
          pathname.split("/")[5] === "" ? "overview" : pathname.split("/")[5],
        item: `${HOST}${router.pathname}/`,
      },
    ],
  };
  return (
    <>
      <div className={styles.tableSection}>
        {/* <Breadcrumbs itemListElement={articleBreadcrumb.itemListElement} /> */}

        <Row>
          <Banner />
          <Row>
            <div className={styles.SeperateMenuOptionPlayer}>
              <div className={styles.list}>
                <h6 onClick={() => handleButtonClick("/overviews")}>
                  overviews
                </h6>
                <h6 onClick={() => handleButtonClick("/stats")}>stats</h6>
                <h6 onClick={() => handleButtonClick("/records")}>records</h6>
                <h6 onClick={() => handleButtonClick("/matches")}>matches</h6>
                <h6 onClick={() => handleButtonClick("/videos")}>videos</h6>
                <h6 onClick={() => handleButtonClick("/news")}>news</h6>
                <h6 onClick={() => handleButtonClick("/photos")}>photos</h6>
              </div>
            </div>
          </Row>

          {pathname.split("/")[5] === "overviews" ||
          pathname.split("/")[5] === "" ? (
            <>
              <Overviewcom />
            </>
          ) : pathname.split("/")[5] === "stats" ? (
            <Stats />
          ) : pathname.split("/")[5] === "records" ? (
            <>
              <Records />
            </>
          ) : pathname.split("/")[5] === "matches" ? (
            <>
              {" "}
              <Matches />
            </>
          ) : pathname.split("/")[5] === "videos" ? (
            <>
              <SquadVideo />
            </>
          ) : pathname.split("/")[5] === "news" ? (
            <>
              <SquadNews />
            </>
          ) : pathname.split("/")[5] === "photos" ? (
            <>
              <SquadPhotos />
            </>
          ) : (
            ""
          )}
        </Row>
      </div>
    </>
  );
};

export default Table;
