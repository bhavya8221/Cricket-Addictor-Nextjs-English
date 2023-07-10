import React, { useEffect } from "react";
import styles from "./TeamHome.module.scss";
import Banner from "./components/Banner/Banner";
import HOST from "../../Constants/host";
import Head from "next/head";
import { useRouter } from "next/router";
import Overview from "./components/Overview/Overview";
import Schedule from "./components/Schedule/Schedule";
import Results from "./components/Results/Results";
import Newscom from "./components/Newscom/Newscom";
import Squad from "./components/Squad/Squad";
import PlayerCards from "./components/Squad/PlayerCards/PlayerCards";
import Breadcrumbs from "../../Common/BreadcrumbsSchema/Breadcrumbs";
import MenuButton from "../MenuButton/MenuButton";
function unslugify(slug) {
  if (!slug) {
    return ""; // Handle the case when slug is undefined or falsy
  }
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
function TeamHome() {
  //
  const router = useRouter();

  const { gender, tid, title } = router.query;
  const pathname = router.asPath;
  const unslugified = unslugify(title);

 
  const TeamMenus = ["schedule", "overviews", "result", "squads", "news"];
  const menus = [
    {
      title: <>international men</>,
      path: "/teams/men",
    },
    {
      title: <>international women</>,
      path: "/teams/women",
    },
  ];
  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

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
        name: "Teams",
        item: gender === "men" ? `${HOST}teams-men/` : `${HOST}teams-women/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: gender === "men" ? "International Men" : "International Women",
        item: gender === "men" ? `${HOST}teams-men/` : `${HOST}teams-women/`,
      },
      {
        "@type": "ListItem",
        position: 4,
        // name: `${
        //   title.substring(0, title.indexOf("-")).charAt(0).toUpperCase() +
        //   title.slice(0, title.indexOf("-")).slice(1).toLowerCase()
        // } Cricket Team`,
        name: unslugified,
        item: `/${pathname.split("/")[1]}/${pathname.split("/")[2]}/${
          pathname.split("/")[3]
        }/${pathname.split("/")[4]}/`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name:
          pathname?.split("/")[5] === ""
            ? "Team Home"
            : pathname?.split("/")[5],
        item: `${HOST}${pathname}/`,
      },
    ],
  };

  const initialURL = `/teams/${gender}/${tid}/${title}`;

  const handleButtonClick = (path) => {
    const fullURL = initialURL + path;
    router.push(fullURL);
  };
  return (
    <div className="teams_section">
      <Head>
        {/* <title itemprop="name">
          {pathname?.split("/")[5] === undefined
            ? `${
                unslugified
                  .substring(0, unslugified.indexOf("-"))
                  .charAt(0)
                  .toUpperCase() +
                unslugified
                  .slice(0, unslugified.indexOf("-"))
                  .slice(1)
                  .toLowerCase()
              } Cricket Team`
            : `${
                unslugified
                  .substring(0, unslugified.indexOf("-"))
                  .charAt(0)
                  .toUpperCase() +
                unslugified
                  .slice(0, unslugified.indexOf("-"))
                  .slice(1)
                  .toLowerCase()
              } Cricket Team ${pathname?.split("/")[5]}`}
        </title> */}
        {/* <meta
          name="description"
          itemprop="description"
          content={
            pathname?.split("/")[5] === undefined ||
            pathname?.split("/")[5] === null
              ? `क्रिकेट एडिक्टर पर  ${
                  unslugified
                    .substring(0, unslugified.indexOf("-"))
                    .charAt(0)
                    .toUpperCase() +
                  unslugified
                    .slice(0, unslugified.indexOf("-"))
                    .slice(1)
                    .toLowerCase()
                } ${gender} के लाइव मैच, स्कोर News, हाइलाइट्स, कमेंट्री, Ranking, Videos और जुड़नार का पालन करें।`
              : ` ${
                  pathname?.split("/")[5] === "schedule"
                    ? `${
                        unslugified
                          .substring(0, unslugified.indexOf("-"))
                          .charAt(0)
                          .toUpperCase() +
                        unslugified
                          .slice(0, unslugified.indexOf("-"))
                          .slice(1)
                          .toLowerCase()
                      } क्रिकेट Team के ODI, T20 और TEST  मैचों का पूरा कार्यक्रम प्राप्त करें, क्रिकेट एडिक्टर पर ${
                        unslugified
                          .substring(0, unslugified.indexOf("-"))
                          .charAt(0)
                          .toUpperCase() +
                        unslugified
                          .slice(0, unslugified.indexOf("-"))
                          .slice(1)
                          .toLowerCase()
                      } क्रिकेट Team के All Upcoming मैचों की सूची`
                    : pathname?.split("/")[5] === "results"
                    ? `${
                        unslugified
                          .substring(0, unslugified.indexOf("-"))
                          .charAt(0)
                          .toUpperCase() +
                        unslugified
                          .slice(0, unslugified.indexOf("-"))
                          .slice(1)
                          .toLowerCase()
                      } क्रिकेट Team के ODI, T20 और TEST  मैचों का पूरा परिणाम प्राप्त करें, क्रिकेट एडिक्टर पर ${
                        unslugified
                          .substring(0, unslugified.indexOf("-"))
                          .charAt(0)
                          .toUpperCase() +
                        unslugified
                          .slice(0, unslugified.indexOf("-"))
                          .slice(1)
                          .toLowerCase()
                      } क्रिकेट Team के All Upcoming मैचों की सूची`
                    : pathname?.split("/")[5] === "squad"
                    ? `${
                        unslugified
                          .substring(0, unslugified.indexOf("-"))
                          .charAt(0)
                          .toUpperCase() +
                        unslugified
                          .slice(0, unslugified.indexOf("-"))
                          .slice(1)
                          .toLowerCase()
                      } क्रिकेट Team के ODI, T20 और TEST  मैचों पूरी Team प्राप्त करें, क्रिकेट एडिक्टर पर ${
                        unslugified
                          .substring(0, unslugified.indexOf("-"))
                          .charAt(0)
                          .toUpperCase() +
                        unslugified
                          .slice(0, unslugified.indexOf("-"))
                          .slice(1)
                          .toLowerCase()
                      } क्रिकेट Team के All Upcoming मैचों की सूची`
                    : pathname?.split("/")[5] === "news"
                    ? `${
                        unslugified
                          .substring(0, unslugified.indexOf("-"))
                          .charAt(0)
                          .toUpperCase() +
                        unslugified
                          .slice(0, unslugified.indexOf("-"))
                          .slice(1)
                          .toLowerCase()
                      } क्रिकेट Team के ODI, T20 और TEST  मैचों की पूरी खबर प्राप्त करें,रें, क्रिकेट एडिक्टर पर ${
                        unslugified
                          .substring(0, unslugified.indexOf("-"))
                          .charAt(0)
                          .toUpperCase() +
                        unslugified
                          .slice(0, unslugified.indexOf("-"))
                          .slice(1)
                          .toLowerCase()
                      } क्रिकेट Team के All Upcoming मैचों की सूची`
                    : `क्रिकेट एडिक्टर पर  ${
                        unslugified
                          .substring(0, unslugified.indexOf("-"))
                          .charAt(0)
                          .toUpperCase() +
                        unslugified
                          .slice(0, unslugified.indexOf("-"))
                          .slice(1)
                          .toLowerCase()
                      } ${gender} क्रिकेट Team के लाइव मैच, स्कोर News, हाइलाइट्स, कमेंट्री, Ranking, Videos और जुड़नार का पालन करें।`
                }
              `
          } 
        />
          */}
          <title>
            {unslugified}Cricket team
          </title>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleBreadcrumb),
          }}
        />
      </Head>

      <MenuButton
        title="allTeam"
        menuitems={menus}
        pathname={pathname}
        activeMenu={gender === "men" ? 0 : 1}
      />

      <Breadcrumbs itemListElement={articleBreadcrumb.itemListElement} />

      <Banner />
      {/* <MenuOptions
        menus={TeamMenus}
        active={pathname?.split("/")[5]?.toUpperCase()}
        pathname={pathname}
        location="teamhome"
      /> */}
      <div className={styles.SeperateMenuOptionteam}>
        <div className={styles.list}>
          <h6 onClick={() => handleButtonClick("/schedule")}>Schedule</h6>
          <h6 onClick={() => handleButtonClick("/overview")}>overviews</h6>
          <h6 onClick={() => handleButtonClick("/results")}>result</h6>
          <h6 onClick={() => handleButtonClick("/squad")}>squads</h6>
          <h6 onClick={() => handleButtonClick("/news")}>news</h6>
        </div>
      </div>

      <>
        {pathname.split("/")[5] === "" && <Overview />}
        {pathname.split("/")[5] === "overview" && <Overview />}
        {pathname.split("/")[5] === "results" && <Results />}
        {pathname.split("/")[5] === "schedule" && <Schedule />}
        {/* {pathname.split("/")[5] === "squad" && (
          <div>
            <Squad/>
            {router.query.squad === "" && <PlayerCards />}
          </div>
        )} */}
        {pathname.split("/")[5] === "squad" && <PlayerCards />}

        {pathname.split("/")[5] === "news" && <Newscom />}
      </>
    </div>
  );
}

export default TeamHome;
