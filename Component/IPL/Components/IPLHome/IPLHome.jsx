import React from "react";
import styles from "./IPLHome.module.scss";
// import BreadcrumbsSchema from "../../../../Common/BreadcrumbsSchema/BreadcrumbsSchema";
import HOST from "../../../../Constants/host";
import { useRouter } from "next/router";
import MenuButton from "../../../MenuButton/MenuButton";
import IPLHomeCom from "./Components/IPLHomeCom/IPLHomeCom";
import IPLMatches from "./Components/IPLMatches/IPLMatches";
import IplPointable from "../../../IplPointTable/IplPointTable";
import IPLTeams from "./Components/IPLTeams/IPLTeams";
import IPLNews from "./Components/IPLNews/IPLNews";
import IPLVideos from "./Components/IPLVideos/IPLVideos";
import IPLStats from "./Components/IPLStats/IPLStats";
import IplTeamHome from "../../../../pages/ipl/[season]/[cid]/teams/[gender]/[tid]/[title]";
import Head from "next/head";
import Breadcrumbs from "../../../../Common/BreadcrumbsSchema/Breadcrumbs";

function IPLHome() {
  //
  const router = useRouter();
  const pathname = router.asPath;
  const { cid, season, gender } = router.query;
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

        item: `${HOST}${pathname}`,
      },
    ],
  };
  return (
    <div className={styles.IPL_section}>
      <Head>
        <title itemprop="name">
          {/* {pathname.split("/")[4] === undefined
            ? `इंडियन प्रीमियर League ${season.split("-")[1]}`
            : `इंडियन प्रीमियर League ${season.split("-")[1]} ${
                pathname.split("/")[4]
              }`} */}
        </title>
        {/* <meta
          name="description"
          content={
            pathname.split("/")[4] === undefined
              ? ` IPLT20 ${season} लाइव क्रिकेट स्कोर, IPL मैच अपडेट, फिक्स्चर, परिणाम, News, फोटो और Videos देखें`
              : `क्रिकेट एडिक्टर पर  इंडियन प्रीमियर League ${
                  season.split("-")[1]
                } ${pathname.split("/")[4]} देखें`
          }
        /> */}
        {/* <link
          rel="canonical"
          href={
            pathname.split("/")[4] === undefined
              ? `${HOST}ipl-${season}/`
              : pathname.split("/")[8] === null
              ? `${HOST}ipl-${season}/${pathname.split("/")[4]}/${
                  pathname.split("/")[5]
                }/${pathname.split("/")[6]}/${pathname.split("/")[7]}/
                }`
              : pathname.split("/")[8] === "overview"
              ? `${HOST}ipl-${season}/${pathname.split("/")[4]}/${
                  pathname.split("/")[5]
                }/${pathname.split("/")[6]}/${pathname.split("/")[7]}/overview/
                  }`
              : `${HOST}ipl-${season}/${pathname.split("/")[4]}/${
                  pathname.split("/")[5]
                }/${pathname.split("/")[6]}/${pathname.split("/")[7]}/${
                  pathname.split("/")[8]
                }/`
          }
        /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleBreadcrumb),
          }}
        />{" "}
      </Head>
      <MenuButton
        title=
         {season ? season.replace("-", " ") : ""}
        
        menuitems={menus}
        pathname={pathname}
      />
      <Breadcrumbs itemListElement={articleBreadcrumb.itemListElement} />

      {pathname.split("/")[4] === "" && <IPLHomeCom />}
      {pathname.split("/")[4] === "matches" && <IPLMatches />}
      {pathname.split("/")[4] === "point-table" && <IplPointable />}
      {/* {pathname.split("/")[4] === "teams" && <IPLTeams />} */}
      {pathname.split("/")[4] === "news" && <IPLNews />}

      {pathname.split("/")[4] === "videos" && <IPLVideos />}

      {pathname.split("/")[4] === "stats" && <IPLStats />}

      {pathname.split("/")[4] === "teams" && <IPLTeams />}

      {/* {pathname.split("/")[5]==="men"&&<IplTeamHome />} */}
    </div>
  );
}

export default IPLHome;
