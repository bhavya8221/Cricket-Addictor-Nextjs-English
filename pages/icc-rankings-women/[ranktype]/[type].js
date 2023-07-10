import React, { useState, useEffect } from "react";
import styles from '../../../styles/Ranking.module.scss';
import Ranks from "../../../Component/Ranks/Ranks";
 
import Head from "next/head";
// import BreadcrumbsSchema from "../../Common/BreadcrumbsSchema/BreadcrumbsSchema";
import HOST from "../../../Constants/host";
import { useRouter } from "next/router";
import Breadcrumbs from "../../../Common/BreadcrumbsSchema/Breadcrumbs";


function Ranking() {
   
  const router = useRouter();
  const { type, ranktype } = router.query;
  const [activeGroupsType, setActiveGroupsType] = useState("tests");
  const [activeGroups, setActiveGroups] = useState("teams");

  function handleOnClickTEST() {
    setActiveGroupsType("tests");
    router.replace(`/icc-rankings-men/${ranktype}/tests/`);
  }
  function handleOnClickT20() {
    setActiveGroupsType("t20s");
    router.replace(`/icc-rankings-men/${ranktype}/t20s/`);
  }
  function handleOnClickODI() {
    setActiveGroupsType("odis");
    router.replace(`/icc-rankings-men/${ranktype}/odis/`);
  }
  function handleOnClickTeam() {
    setActiveGroups("teams");
    router.replace(`/icc-rankings-men/teams/${type}/`);
  }
  function handleOnClickBatting() {
    setActiveGroups("batsmen");
    router.replace(`/icc-rankings-men/batsmen/${type}/`);
  }
  function handleOnClickBowling() {
    setActiveGroups("bowlers");
    router.replace(`/icc-rankings-men/bowlers/${type}/`);
  }
  function handleOnClickAllRounder() {
    setActiveGroups("all-rounders");
    router.replace(`/icc-rankings-men/all-rounders/${type}/`);
  }

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setActiveGroupsType(type === "teams" ? ranktype : type);
    setActiveGroups(type === "teams" ? type : ranktype);
  }, [type, ranktype]);
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
        // name: `ICC Cricket Ranking ${activeGroupsType}`,
        name: `${
          router.asPath.split("/")[1] === "icc-rankings-men" &&
          router.asPath.split("/")[2] === "teams"
            ? "Ranking Men Teams"
            : router.asPath.split("/")[1] === "icc-rankings-men" &&
              router.asPath.split("/")[2] === "batsmen"
            ? "Ranking Men Batting"
            : router.asPath.split("/")[1] === "icc-rankings-men" &&
              router.asPath.split("/")[2] === "bowlers"
            ? "Ranking Men Bowling"
            : router.asPath.split("/")[1] === "icc-rankings-men" &&
              router.asPath.split("/")[2] === "all-rounders"
            ? "Ranking Men All Rounder"
            : router.asPath.split("/")[1] === "icc-rankings-women" &&
              router.asPath.split("/")[2] === "teams"
            ? "Ranking Women Teams"
            : router.asPath.split("/")[1] === "icc-rankings-women" &&
              router.asPath.split("/")[2] === "batsmen"
            ? "Ranking Women Batting"
            : router.asPath.split("/")[1] === "icc-rankings-women" &&
              router.asPath.split("/")[2] === "bowlers"
            ? "Ranking Women Bowling"
            : router.asPath.split("/")[1] === "icc-rankings-women" &&
              router.asPath.split("/")[2] === "all-rounders"
            ? "Ranking Women All Rounder"
            : "Ranking Teams"
        }`,
        item: `${HOST}${router.asPath}`,
      },
    ],
  };

  return (
    <div className={styles.ranking_section}>
      <Head>
        <title itemprop="name">
          {router.asPath.split("/")[1] === "icc-rankings-men"
            ? "ICC Men Team Ranking"
            : "ICC Women Team Ranking"}
        </title>

        <meta
          name="description"
          content={
            router.asPath.split("/")[1] === "icc-rankings-men"
              ? "क्रिकेट एडिक्टर पर ICC Men Team Ranking देखें"
              : "क्रिकेट एडिक्टर पर ICC Women Team Ranking देखें"
          }
        />
           <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleBreadcrumb),
          }}
        />
      </Head>
      <Breadcrumbs itemListElement={articleBreadcrumb.itemListElement} />

      <div className={styles.margin}>
        <div className={styles.Rtype_group}>
          <div className={styles.Rplayer_gender}>
            <h5
              className={styles.Rtest}
              style={{
                backgroundColor: activeGroupsType === "tests" ? null : "unset",
                color: activeGroupsType === "tests" ? null : "white",
              }}
              onClick={handleOnClickTEST}
            >
             TEST
            </h5>
            <h5
              className={styles.Rt20}
              style={{
                backgroundColor: activeGroupsType === "t20s" ? null : "unset",
                color: activeGroupsType === "t20s" ? null : "white",
              }}
              onClick={handleOnClickT20}
            >
              T20
            </h5>
            <h5
              className={styles.Rodi}
              style={{
                backgroundColor: activeGroupsType === "odis" ? null : "unset",
                color: activeGroupsType === "odis" ? null : "white",
              }}
              onClick={handleOnClickODI}
            >
              ODI
            </h5>
          </div>

          <div className={styles.Ricc_type}>
            <h5
              className={styles.Rteam}
              style={{
                backgroundColor: activeGroups === "teams" ? null : "unset",
              }}
              onClick={handleOnClickTeam}
            >
              Teams
            </h5>
            <h5
              className={styles.Rbatting}
              style={{
                backgroundColor: activeGroups === "batsmen" ? null : "unset",
              }}
              onClick={handleOnClickBatting}
            >
              Batting
            </h5>
            <h5
              className={styles.Rbowling}
              style={{
                backgroundColor: activeGroups === "bowlers" ? null : "unset",
              }}
              onClick={handleOnClickBowling}
            >
              Bowling
            </h5>
            <h5
              className={styles.Rallrounder}
              style={{
                backgroundColor:
                  activeGroups === "all-rounders" ? null : "unset",
              }}
              onClick={handleOnClickAllRounder}
            >
              All Rounder
            </h5>
          </div>
        </div>
        <Ranks
          activeGroupsType={activeGroupsType}
          activeGroups={activeGroups}
          gender={router.asPath}
        />
      </div>
    </div>
  );
}

export default Ranking;
