import React from "react";
import styles from "./IPLTeamHome.module.scss";
// import { Outlet, useLocation, useParams } from "react-router-dom";
import { useRouter } from "next/router";
import MenuOptions from "../../../../../../MenuOptions/MenuOptions";
import IPLBanner from "./components/IPLBanner/IPLBanner";
import IPLOverview from "./components/IPLOverview/IPLOverview";
import IPLSchedule from "./components/IPLSchedule/IPLSchedule";
import IPLResults from "./components/IPLResults/IPLResults";
import MenuButton from "../../../../../../MenuButton/MenuButton";
import IPLNewscom from "./components/IPLNewscom/IPLNewscom";
import IPLPlayerCards from "./components/IPLSquad/IPLPlayerCards/IPLPlayerCards";
import HOST from "../../../../../../../Constants/host";
import Head from "next/head";
import Breadcrumbs from "../../../../../../../Common/BreadcrumbsSchema/Breadcrumbs";

function IPLTeamHome() {
  const router = useRouter();
  const pathname = router.asPath;
  const { cid, season, gender, tid, title } = router.query;
 
  // const pathSegments = window.location.pathname.split("/");
  // const index = pathSegments.indexOf(cid); //don't remove
  // if (index !== -1) {
  //   pathSegments.splice(index, 1);
  // }
  // const newPath = pathSegments.join("/");
 
  // const newUrl = window.location.origin + newPath + window.location.search;
  // window.history.replaceState({}, "", newUrl);
  const TeamMenus = ["overviews", "schedule", "result", "squads", "news"];
  const menus = [
    { title: "home", path: `/ipl/${season}/${cid}` },
    { title: "matches", path: `/ipl/${season}/${cid}/matches` },
    {
      title: "point-table",
      path: `/ipl/${season}/${cid}/point-table`,
    },
    { title: "team", path: `/ipl/${season}/${cid}/teams` },
    { title: "news", path: `/ipl/${season}/${cid}/news` },
    { title: "videos", path: `/ipl/${season}/${cid}/videos` },
    { title: "stats", path: `/ipl/${season}/${cid}/stats` },
  ];
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
        name: "All IPL",
        item: "/ipl",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: season ? season.replace("-", " ") : "",
        item: `/ipl/${season}/${cid}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name:
          pathname.split("/")[4] === "" ? "IPL Home" : pathname.split("/")[4],

        item: `/ipl/${season}/${cid}/teams`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name:
          pathname.split("/")[8] === "" ? "Overview" : pathname.split("/")[8],

        item: `${HOST}${pathname}`,
      },
    ],
  };
  const initialURL = `/ipl/${season}/${cid}/teams/${gender}/${tid}/${title}`;

  const handleButtonClick = (path) => {
    const fullURL = initialURL + path;
    router.push(fullURL);
  };
  return (
    <div className="IPL_teams_section">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleBreadcrumb),
          }}
        />{" "}
      </Head>
      <MenuButton
        title={season ? season.replace("-", " ") : ""}
        menuitems={menus}
        pathname={pathname}
      />
      <Breadcrumbs itemListElement={articleBreadcrumb.itemListElement} />
      <IPLBanner />
      <div className={styles.SeperateMenuOptionteam}>
        <div className={styles.list}>
          <h6 onClick={() => handleButtonClick("/overview")}>overviews</h6>
          <h6 onClick={() => handleButtonClick("/schedule")}>Schedule</h6>
          <h6 onClick={() => handleButtonClick("/results")}>result</h6>
          <h6 onClick={() => handleButtonClick("/squad")}>squads</h6>
          <h6 onClick={() => handleButtonClick("/news")}>news</h6>
        </div>
      </div>
      {pathname.split("/")[8] === "" && <IPLOverview />}
      {pathname.split("/")[8] === "overview" && <IPLOverview />}{" "}
      {pathname.split("/")[8] === "schedule" && <IPLSchedule />}{" "}
      {pathname.split("/")[8] === "results" && <IPLResults />}{" "}
      {pathname.split("/")[8] === "news" && <IPLNewscom />}
      {pathname.split("/")[8] === "squad" && <IPLPlayerCards />}
    </div>
  );
}

export default IPLTeamHome;
