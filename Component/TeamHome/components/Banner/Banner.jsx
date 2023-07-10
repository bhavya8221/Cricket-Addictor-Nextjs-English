import React, { useCallback, useEffect, useState } from "react";
import styles from "./Banner.module.scss";
import trophy from "../../../../public/Images/Medal.png";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import dataList from "../../../../Common/data.json";

import {
  TeamListDetailAPI,
  TeamPlayerProfile,
  teamListDetailAPI,
  teamPlayerProfile,
  // TeamListAPI,
} from "../../../../Constants/Api/Api";
import NoBannerPlayer from "../../../../public/Images/no-banner-player.png";

import NoBanner from "../../../../public/Images/no-banner.png";
import NoPlayer from "../../../../public/Images/no-player.png";
import HOST from "../../../../Constants/host";
import { Col, Row } from "react-bootstrap";
// import BreadcrumbsSchema from "../../../BreadcrumbsSchema/BreadcrumbsSchema";

import slugify from "react-slugify";

import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "../../../../Common/BreadcrumbsSchema/Breadcrumbs";

const Banner = () => {
  const router = useRouter();
  const [bannerData, setBannerData] = useState({});

  const [teamlist, setTeamList] = useState([]);
  const [teamID, setTeamID] = useState(25);
  const [teamName, setTeamName] = useState("India");
  const [playerbannerData, setPlayerBannerData] = useState({});
  const [teamLogo, setTeamLogo] = useState([]);
  const { slug } = router.query;
  const team = slug === undefined ? null : slug[0];

  const pid = slug === undefined ? null : slug[1];
  const tid = slug === undefined ? null : slug[1];
  const gender = "men";


 
  const pathname = router.asPath;
  function getEventId(value1, value2) {
    setTeamID(value1);
    setTeamName(value2);
  }



  useEffect(() => {
    if (pathname.split("/")[1] === "players") {
      teamPlayerProfile(pid)
        .then((res) => {
         
          setPlayerBannerData(res.data.data);
        })
        .catch((e) => {});
    }

    if (pathname.split("/")[2] === "men") {
      setTeamList(dataList.data.teams);
    }
    if (pathname.split("/")[2] === "women") {
      setTeamList(dataList.data.Women);
    }

    if (pathname.split("/")[1] === "teams") {
      teamListDetailAPI(tid)
        .then((res) => {
          setBannerData(res.data.data);
        })
        .catch((e) => {});
    }
  }, [tid, pid, pathname, gender, dataList]);

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
        name: team,
        item: `${HOST}players/${slugify(team)}/${teamID}/`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name:
          playerbannerData.title ,
        item: `${HOST}players/${team}/${playerbannerData.pid}/${slugify(
          playerbannerData.title
        )}/`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: `${
          pathname?.split("/")[5] === undefined
            ? "Overview"
            : pathname?.split("/")[5]
        } `,
        item: `${HOST}${pathname}/`,
      },
    ],
  };

  return (
    <>
      {pathname.split("/")[1] === "players" ? (
        <>
          <Head>
            <title itemprop="name">
              {/* {pathname?.split("/")[4] === undefined
                ? `${playerbannerData.title} Profile`
                : `${playerbannerData.title} ${pathname?.split("/")[4]}`} */}

              {pathname.split("/")[5] === null || pathname.split("/")[5] === ""
                ? `${playerbannerData.title} Profile`
                : pathname.split("/")[5] === "overview"
                ? `${playerbannerData.title} Profile`
                : pathname.split("/")[5] === "stats"
                ? `${playerbannerData.title} Stats`
                : pathname.split("/")[5] === "records"
                ? `${playerbannerData.title} Records`
                : pathname.split("/")[5] === "matches"
                ? `${playerbannerData.title} Matches`
                : pathname.split("/")[5] === "videos"
                ? `${playerbannerData.title} Videos`
                : pathname.split("/")[5] === "news"
                ? `${playerbannerData.title} News`
                : pathname.split("/")[5] === "photos"
                ? `${playerbannerData.title} Photos`
                : ""}
            </title>
            <meta
              name="description"
              // content={
              //   pathname?.split("/")[4] === undefined
              //     ? `${playerbannerData.title} cricket player from ${team} profile, stats, rankings, records, videos, photos at Cricketaddictor`
              //     : `${playerbannerData.title} ${
              //         pathname?.split("/")[4]
              //       } at Cricketaddictor`
              //   }
              // भारत से शिखर धवन क्रिकेट Player प्रोफ़ाइल, आँकड़े, Ranking, रिकॉर्ड, Videos, क्रिकेटएडिक्टर पर तस्वीरें
              content={
                pathname.split("/")[5] === null || pathname.split("/")[5] === ""
                  ? `${team} से ${playerbannerData.title} क्रिकेट Player प्रोफ़ाइल, आँकड़े, Ranking, रिकॉर्ड, Videos, क्रिकेटएडिक्टर पर तस्वीरें`
                  : pathname.split("/")[5] === "overview"
                  ? `${team} से ${playerbannerData.title} क्रिकेट Player प्रोफ़ाइल, आँकड़े, Ranking, रिकॉर्ड, Videos, क्रिकेटएडिक्टर पर तस्वीरें`
                  : pathname.split("/")[5] === "stats"
                  ? `क्रिकेट एडिक्टर पर ${playerbannerData.title} आँकड़े देखें`
                  : pathname.split("/")[5] === "records"
                  ? `क्रिकेट एडिक्टर पर ${playerbannerData.title} रिकॉर्ड देखें`
                  : pathname.split("/")[5] === "matches"
                  ? `क्रिकेट एडिक्टर पर ${playerbannerData.title} मैच देखें`
                  : pathname.split("/")[5] === "videos"
                  ? `क्रिकेट एडिक्टर पर ${playerbannerData.title} Videos देखें`
                  : pathname.split("/")[5] === "news"
                  ? `क्रिकेट एडिक्टर पर ${playerbannerData.title} News देखें`
                  : pathname.split("/")[5] === "photos"
                  ? `क्रिकेट एडिक्टर पर ${playerbannerData.title} तस्वीरें देखें`
                  : ""
              }
            />

            <meta
              name="description"
              content={
                pathname.split("/")[5] === null || pathname.split("/")[5] === ""
                  ? `${playerbannerData.title} cricket player from ${team} profile, stats, rankings, records, videos, photos at Cricketaddictor`
                  : pathname.split("/")[5] === "overview"
                  ? `${playerbannerData.title} cricket player from ${team} profile, stats, rankings, records, videos, photos at Cricketaddictor`
                  : pathname.split("/")[5] === "stats"
                  ? `Catch ${playerbannerData.title}  Stats at Cricketaddictor`
                  : pathname.split("/")[5] === "records"
                  ? `Catch ${playerbannerData.title}  Records at Cricketaddictor`
                  : pathname.split("/")[5] === "matches"
                  ? `Catch ${playerbannerData.title}  Matches at Cricketaddictor`
                  : pathname.split("/")[5] === "videos"
                  ? `Catch ${playerbannerData.title}  Videos at Cricketaddictor`
                  : pathname.split("/")[5] === "news"
                  ? `Catch ${playerbannerData.title}  News at Cricketaddictor`
                  : pathname.split("/")[5] === "photos"
                  ? `Catch ${playerbannerData.title}  Photos at Cricketaddictor`
                  : ""
              }
            />

            {/* <meta
              name="keywords"
              content={
                bannerData.meta_keywords === null ||
                bannerData.meta_keywords === ""
                  ? null
                  : bannerData.meta_descirption
              }
            /> */}

            <link rel="canonical" href={canonicalUrl} />

            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(articleBreadcrumb),
              }}
            />
          </Head>
          <Breadcrumbs itemListElement={articleBreadcrumb.itemListElement} />

          <div className={styles.PlayerBanner}>
            <div className={styles.PlayerBannerImage}>
              {Object.keys(playerbannerData).length === 0 ? null : (
                <div className={styles.teamBannerDetails}>
                  <div className={styles.detailsLeft}>
                    <div className={styles.backText}>
                      <h3 style={{ fontSize: 164, position: "absolute" }}>
                        {playerbannerData.jersey === "" ||
                        playerbannerData.jersey === null
                          ? 0
                          : playerbannerData.jersey}
                      </h3>

                      <Image
                        src={
                          playerbannerData.profile_pic_odi === "" ||
                          playerbannerData.profile_pic_odi === null
                            ? NoPlayer
                            : HOST + playerbannerData.profile_pic_odi
                        }
                        style={{ position: "sticky" }}
                        width={200}
                        height={200}
                        alt="imagess"
                      />
                      <h6>
                        {Object.keys(playerbannerData).length === 0
                          ? "---"
                          : playerbannerData.title === null ||
                            playerbannerData.title === ""
                          ? "--"
                          : playerbannerData.title}
                      </h6>
                    </div>
                  </div>
                  <div className={styles.detailsRight}>
                    <div className={styles["Flex-style"]}>
                      <div className={styles.info}>
                        <b>PERSONAL INFORMATION</b>
                      </div>
                    </div>
                    <div className={styles.main_text}>
                      <div className={styles.main_left_text}>
                        <h5 className={styles.left_text}>
                          <b>Full Name</b>
                        </h5>
                        <h5 className={styles.left_text}>
                          <b>Nick Name</b>
                        </h5>

                        <h5 className={styles.left_text}>
                          <b>Born</b>
                        </h5>
                        <h5 className={styles.left_text}>
                          <b>Birth Place</b>
                        </h5>
                        <h5 className={styles.left_text}>
                          <b>Height</b>
                        </h5>
                        <h5 className={styles.left_text}>
                          <b>Role</b>
                        </h5>
                        <h5 className={styles.left_text}>
                          <b>Batting Style</b>
                        </h5>
                        <h5 className={styles.left_text}>
                          <b>Bowling Style</b>
                        </h5>
                      </div>
                      <div className={styles.main_Right_text}>
                        <h5 className={styles.right_text}>
                          <b>
                            {Object.keys(playerbannerData).length === 0
                              ? "---"
                              : playerbannerData.short_name === null ||
                                playerbannerData.short_name === ""
                              ? "--"
                              : playerbannerData.short_name}
                          </b>
                        </h5>
                        <h5 className={styles.right_text}>
                          <b>
                            {Object.keys(playerbannerData).length === 0
                              ? "---"
                              : playerbannerData.short_name === null ||
                                playerbannerData.short_name === ""
                              ? "--"
                              : playerbannerData.short_name}
                          </b>
                        </h5>
                        <h5 className={styles.right_text}>
                          <b>
                            {Object.keys(playerbannerData).length === 0
                              ? "---"
                              : playerbannerData.birthdate === null ||
                                playerbannerData.birthdate === ""
                              ? "--"
                              : playerbannerData.birthdate}
                          </b>
                        </h5>

                        <h5 className={styles.right_text}>
                          <b>
                            {Object.keys(playerbannerData).length === 0
                              ? "---"
                              : playerbannerData.birthplace === null ||
                                playerbannerData.birthplace === ""
                              ? "--"
                              : playerbannerData.birthplace}
                          </b>
                        </h5>

                        <h5 className={styles.right_text}>
                          <b>
                            {Object.keys(playerbannerData).length === 0
                              ? "---"
                              : playerbannerData.height === null ||
                                playerbannerData.height === ""
                              ? "--"
                              : playerbannerData.height}
                          </b>
                        </h5>

                        <h5 className={styles.right_text}>
                          <b>
                            {Object.keys(playerbannerData).length === 0
                              ? "---"
                              : playerbannerData.playing_role === null ||
                                playerbannerData.playing_role === ""
                              ? "--"
                              : playerbannerData.playing_role}
                          </b>
                        </h5>

                        <h5 className={styles.right_text}>
                          <b>
                            {Object.keys(playerbannerData).length === 0
                              ? "---"
                              : playerbannerData.batting_style === null ||
                                playerbannerData.batting_style === ""
                              ? "--"
                              : playerbannerData.batting_style}
                          </b>
                        </h5>

                        <h5 className={styles.right_text}>
                          <b>
                            {Object.keys(playerbannerData).length === 0
                              ? "---"
                              : playerbannerData.bowling_style === null ||
                                playerbannerData.bowling_style === ""
                              ? "--"
                              : playerbannerData.bowling_style}
                          </b>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <Image
                src={
                  playerbannerData.banner_image === "" ||
                  playerbannerData.banner_image === null
                    ? NoBannerPlayer
                    : HOST + playerbannerData.banner_image
                }
                // width="100%"
                alt="images"
                className={styles.imageBanner}
                width={10}
                height={10}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* <Head>
            <title itemprop="name">
              {bannerData.meta_title === null || bannerData.meta_title === ""
                ? bannerData.title + "cricket-team"
                : bannerData.meta_title}
            </title>
            <meta
              name="description"
              content={
                bannerData.meta_description === "" ||
                bannerData.meta_description === null
                  ? `Follow the live matches, scores news, highlights, commentary, rankings, videos and fixtures of the ${bannerData.title} cricket team on the Cricketaddictor.`
                  : bannerData.meta_description
              }
            />
            <link rel="canonical" href={canonicalUrl} />
          </Head> */}
          <div className={styles.flagImageRow}>
            <div className={styles.scrolflag}>
            {teamlist.length === 0
              ? null
              : teamlist.map((item, index) => {
                  return item.tid === Number(tid) ? null : (
                    <>
                      <Link
                        className={styles.link_colo}
                        href={`/teams/${gender}/${item.tid}/${slugify(
                          item.title
                        )}-cricket-team/`}
                      >
                        <div className={styles.flagContain} key={index}>
                          <div className={styles.flagImage}>
                            <Image
                              src={item.logo_url}
                              width={60}
                              height={60}
                              className={styles.img}
                              alt="images"
                            />
                          </div>
                          <div>
                            <h6>{item.title}</h6>
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })}
            </div>
          </div>
          <div className={styles.Banner}>
            <div className={styles.bannerImage}>
              <Row className={styles.teamBannerDetails}>
                <Col sm={12} md={12} className={styles.details}>
                  <div className={styles.info}>
                    <h1>{bannerData.title}</h1>
                    <h1>Cricket Team</h1>
                    <div className={styles.official_site}>
                      Official Team Site
                    </div>
                    <div className={styles.trophy}>
                      {" "}
                      <Image
                        src={trophy}
                        width={8}
                        height={12}
                        alt="images"
                      />{" "}
                      <b> ODI:{bannerData.world_cup_odi}</b>
                    </div>
                    <div className={styles.trophy}>
                      {" "}
                      <Image
                        src={trophy}
                        width={8}
                        height={12}
                        alt="images"
                      />{" "}
                      <b> T20:{bannerData.world_cup_20i}</b>
                    </div>
                    <h2>
                      Coach :
                      {bannerData.coach === "" || bannerData.coach === null
                        ? " --"
                        : bannerData.coach}
                    </h2>
                    <h2>
                      Captain :
                      {bannerData.captain === "" || bannerData.captain === null
                        ? " --"
                        : bannerData.captain}
                    </h2>

                    <div className={styles["social-icons"]}>
                      <AiFillInstagram className={styles.icon} />
                      <AiOutlineTwitter className={styles.icon} />
                      <BsFacebook className={styles.icon} />
                    </div>
                  </div>
                </Col>
                {/* <div className={styles.col-lg-6 col-xs-12">
                <div className={styles.child-ipl-new"></div>
              </div> */}
              </Row>
              <Image
                src={
                  bannerData.banner_image === "" ||
                  bannerData.banner_image === undefined ||
                  bannerData.banner_image === null
                    ? NoBanner
                    : HOST + bannerData.banner_image
                }
                // src={NoBanner}
                width={400}
                height={400}
                alt="images"
                className={styles.imageBanner}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Banner;
