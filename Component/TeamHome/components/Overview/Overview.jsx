import React, { useCallback, useRef, useEffect } from "react";
import icon from "../../../../public/Images/no-player.png";
import styles from "./Overview.module.scss";
import noFlag from "../../../../public/Images/no-flag.png";
import NewsCard from "../../../NewsCard/NewsCard";
import background from "../../../../public/Images/no-banner.png";
import { Card } from "react-bootstrap";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import {
  teamListDetailAPI,
  teamWiseMatchSquadsAPI,
  newsTeamsPlayersApi,
} from "../../../../Constants/Api/Api";
import { useState } from "react";
import HOST from "../../../../Constants/host";

import slugify from "react-slugify";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import TeamPlayerCard from "../../../TeamPlayerCard/TeamPlayerCard";
import Slider from "react-slick";

const Overview = () => {
  const [settingsIpl, setSettingsIpl] = useState({});
  //
  const router = useRouter();
  // const { tid, gender, title } = useParams();
  const [teamListDetail, setTeamListDetail] = useState({});
  const [newsData, setNewsData] = useState([]);
  const [teamSquad, setTeamSquad] = useState([]);
  const [activeGroupsType, setActiveGroupsType] = useState("tests");
  const sliderRef2 = useRef(null);

  const next2 = () => {
    sliderRef2.current.slickNext();
  };
  const previous2 = () => {
    sliderRef2.current.slickPrev();
  };
  const sliderRef3 = useRef(null);

  const next3 = () => {
    sliderRef3.current.slickNext();
  };
  const previous3 = () => {
    sliderRef3.current.slickPrev();
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1400, min: 1024 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 1024, min: 0 },
      items: 1,
    },
  };

  function handleOnClickTest() {
    setActiveGroupsType("tests");
  }
  function handleOnClickODI() {
    setActiveGroupsType("odis");
  }
  function handleOnClickT20() {
    setActiveGroupsType("t20s");
  }
  function handleShowRanking(type) {
    router.replace(`/icc-rankings-men/teams/${type}/`)
    // window.location.href = `/icc-rankings-men/teams/${type}/`; // update men/women dynamically
  }
  const { gender, title, tid } = router.query;
  const pathname = router.asPath;

  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  // const NavigationPlayer = () => {
  //   let value = "squad/player";
  //   navigate(value);
  // };
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    teamListDetailAPI(tid)
      .then((res) => {
        setTeamListDetail(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
    teamWiseMatchSquadsAPI(tid)
      .then((res) => {
        setTeamSquad(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
    newsTeamsPlayersApi(tid, "", "")
      .then((res) => {
        setNewsData(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.messagse);
      });
  }, [tid]);
  useEffect(() => {
    const generateSettingsIPL = () => {
      const newSettingsIpl = {
        infinite: true,
        speed: 500,
        slidesToShow: window.innerWidth < 767 ? 1 : 3,
        slidesToScroll: 1,

        arrows: false,
      };
      setSettingsIpl(newSettingsIpl);
    };

    // Add event listener for window resize
    window.addEventListener("resize", generateSettingsIPL);

    // Initial calculation of settings
    generateSettingsIPL();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", generateSettingsIPL);
    };
  }, []);
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


  return (
    <>
      <div className={styles.Overview}>
        {Object.keys(teamListDetail).length === 0 ? null : (
          <>
            {/* <Head>
              <title>
                {teamListDetail.meta_title === null ||
                teamListDetail.meta_title === ""
                  ? null
                  : teamListDetail.meta_title}
              </title>
              <meta
                name="description"
                content={
                  teamListDetail.meta_descirption === null ||
                  teamListDetail.meta_descirption === ""
                    ? null
                    : teamListDetail.meta_descirption
                }
              />
              <meta
                name="keywords"
                content={
                  teamListDetail.meta_keywords === null ||
                  teamListDetail.meta_keywords === ""
                    ? null
                    : teamListDetail.meta_descirption
                }
              />
              <link rel="canonical" href={canonicalUrl} />
            </Head> */}
            <div
              className={`${styles.TeamRanking} row`}
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              <div className={styles.type_group}>
                <div>
                  <h3 className={styles.IPL__text}>Team Ranking</h3>
                </div>
              </div>
              {teamListDetail.teams_ranks.length === 0 ? (
                <h6
                  style={{ textAlign: "center", margin: "40px", width: "auto" }}
                >
                  No Team Ranking
                </h6>
              ) : (
                <Slider {...settingsIpl}>
                  <div className={styles.playercard_slider}>
                    {teamListDetail.teams_ranks[0] === undefined ? null : (
                      <Card className={styles.IPL_OG_card}>
                        <Card.Body className={styles.IPL_custom_card}>
                          <div className={styles.IPL_full_card}>
                            <div className="row">
                              <div className="col-6">
                                <div className={styles.types}>
                                  <h3 className={styles.test_text}>
                                    {teamListDetail.teams_ranks[0].groups_type.slice(
                                      0,
                                      -1
                                    )}
                                  </h3>
                                </div>
                                <div className={styles.types2}>
                                  <h1>{teamListDetail.teams_ranks[0].rank}</h1>
                                  <h2>
                                    {teamListDetail.teams_ranks[0].rank === "1"
                                      ? "st"
                                      : teamListDetail.teams_ranks[0].rank ===
                                        "2"
                                      ? "nd"
                                      : teamListDetail.teams_ranks[0].rank ===
                                        "3"
                                      ? "rd"
                                      : "th"}
                                  </h2>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className={styles.types3}>
                                  <h5>
                                    rating &nbsp;
                                    {teamListDetail.teams_ranks[0].rating}
                                  </h5>
                                  <h5>
                                    points &nbsp;
                                    {teamListDetail.teams_ranks[0].points}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                        <button
                          className={styles.IPLBtn}
                          onClick={() => handleShowRanking("odis")}
                        >
                          View More Table
                        </button>
                      </Card>
                    )}
                  </div>
                  <div className={styles.playercard_slider}>
                    {teamListDetail.teams_ranks[1] === undefined ? null : (
                      <Card className={styles.IPL_OG_card}>
                        <Card.Body className={styles.IPL_custom_card}>
                          <div className={styles.IPL_full_card}>
                            <div className="row ">
                              <div className="col-6">
                                <div className="types">
                                  <h3 className={styles.test_text}>
                                    {teamListDetail.teams_ranks[1].groups_type.slice(
                                      0,
                                      -1
                                    )}
                                  </h3>
                                </div>
                                <div className={styles.types2}>
                                  <h1>{teamListDetail.teams_ranks[1].rank}</h1>
                                  <h2>
                                    {teamListDetail.teams_ranks[1].rank === "1"
                                      ? "st"
                                      : teamListDetail.teams_ranks[1].rank ===
                                        "2"
                                      ? "nd"
                                      : teamListDetail.teams_ranks[1].rank ===
                                        "3"
                                      ? "rd"
                                      : "th"}
                                  </h2>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className={styles.types3}>
                                  <h5>
                                    rating &nbsp;{" "}
                                    {teamListDetail.teams_ranks[1].rating}
                                  </h5>
                                  <h5>
                                    points &nbsp;
                                    {teamListDetail.teams_ranks[1].points}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                        <button
                          className={styles.IPLBtn}
                          onClick={() => handleShowRanking("tests")}
                        >
                          View More Table
                        </button>
                      </Card>
                    )}
                  </div>
                  <div className={styles.playercard_slider}>
                    {teamListDetail.teams_ranks[2] === undefined ? null : (
                      <Card className={styles.IPL_OG_card}>
                        <Card.Body className={styles.IPL_custom_card}>
                          <div className={styles.IPL_full_card}>
                            <div className="row ">
                              <div className="col-6">
                                <div className={styles.types}>
                                  <h3 className={styles.test_text}>
                                    {teamListDetail.teams_ranks[2].groups_type.slice(
                                      0,
                                      -1
                                    )}
                                  </h3>
                                </div>
                                <div className={styles.types2}>
                                  <h1>{teamListDetail.teams_ranks[2].rank}</h1>
                                  <h2>
                                    {teamListDetail.teams_ranks[2].rank === "1"
                                      ? "st"
                                      : teamListDetail.teams_ranks[2].rank ===
                                        "2"
                                      ? "nd"
                                      : teamListDetail.teams_ranks[2].rank ===
                                        "3"
                                      ? "rd"
                                      : "th"}
                                  </h2>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className={styles.types3}>
                                  <h5>
                                    rating &nbsp;{" "}
                                    {teamListDetail.teams_ranks[2].rating}
                                  </h5>
                                  <h5>
                                    points &nbsp;
                                    {teamListDetail.teams_ranks[2].points}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                        <button
                          className={styles.IPLBtn}
                          onClick={() => handleShowRanking("t20s")}
                        >
                          View More Table
                        </button>
                      </Card>
                    )}
                  </div>
                </Slider>
              )}
            </div>

            <div
              className={`${styles.PlayerRanking} row`}
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              <div className={styles.type_group}>
                <div>
                  <h3 className={styles.IPL__text}>Player Ranking</h3>
                </div>
                <div className={styles.icc_type}>
                  <h5
                    className={styles.test}
                    style={{
                      backgroundColor:
                        activeGroupsType === "tests" ? null : "unset",
                      color:
                        activeGroupsType === "tests"
                          ? "var(--primary)"
                          : "gray",
                      textDecoration:
                        activeGroupsType === "tests" ? "underline" : "unset",
                    }}
                    onClick={handleOnClickTest}
                  >
                    TEST
                  </h5>
                  <h5
                    className={styles.odi}
                    style={{
                      backgroundColor:
                        activeGroupsType === "odis" ? null : "unset",
                      color:
                        activeGroupsType === "odis" ? "var(--primary)" : "gray",
                      textDecoration:
                        activeGroupsType === "odis" ? "underline" : "unset",
                    }}
                    onClick={handleOnClickODI}
                  >
                    ODI
                  </h5>
                  <h5
                    className={styles.t20}
                    style={{
                      backgroundColor:
                        activeGroupsType === "t20s" ? null : "unset",
                      color:
                        activeGroupsType === "t20s" ? "var(--primary)" : "gray",
                      textDecoration:
                        activeGroupsType === "t20s" ? "underline" : "unset",
                    }}
                    onClick={handleOnClickT20}
                  >
                    T20
                  </h5>
                </div>
              </div>
              {/* <Carousel
                className="mt-2"
                swipeable={true}
                draggable={true}
                responsive={responsive}
                removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                autoPlay={window.innerWidth < 991 ? true : false}
              > */}
              <Slider {...settingsIpl}>
                <TeamPlayerCard
                  activeGroupsType={activeGroupsType}
                  img={noFlag}
                  groups="batsmen"
                />
                <TeamPlayerCard
                  activeGroupsType={activeGroupsType}
                  img={noFlag}
                  groups="bowlers"
                />
                <TeamPlayerCard
                  activeGroupsType={activeGroupsType}
                  img={noFlag}
                  groups="all-rounders"
                />
              </Slider>
            </div>
          </>
        )}

        <div
          className={`${styles.News} row`}
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <div className={styles.space}>
            <div>
              <h3 className={styles.IPL__text}>Latest News</h3>
            </div>

            <div>
              <h3 className={styles.viewall}>
                <Link
                  className={styles.link_color}
                  href={`/teams/${gender}/${tid}/${title}-cricket-team/news/`}
                >
                  View All
                </Link>
              </h3>
            </div>
          </div>
          {/* <Carousel
            className={`"mt-2" ${styles.sizes}`}
            swipeable={true}
            draggable={true}
            responsive={responsive}
            removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            autoPlay={false}
          > */}
          <Slider ref={sliderRef2} {...settingsIpl}>
            {newsData.length === 0 ? (
              <h6 className="mx-2">No News...</h6>
            ) : (
              // null
              newsData.map((item, index) => {
                return (
                  <Link
                    key={index}
                    className={styles.team_link_color}
                    href={`/cricket-news/${item.news_category}/${item.slug}/`}
                  >
                    <div className="">
                      <NewsCard
                        title={item.title}
                        date={item.date}
                        source={
                          item.file_uri === "" || item.file_uri === null
                            ? `${background}`
                            : item.file_name === "" || item.file_name === null
                            ? `${background}`
                            : `${HOST}${item.file_uri}/${item.file_name}`
                        }
                      />
                    </div>
                  </Link>
                );
              })
            )}
          </Slider>
          <div
            className={styles.preNextButton}
            style={{
              display: "flex",
              justifyContent: "end",
              width: "auto",
              backgroundColor: "transparent",
            }}
          >
            <button className={styles.preMoreBtn} onClick={previous2}>
              <MdKeyboardArrowLeft />
            </button>
            <button className={styles.preMoreBtn} onClick={next2}>
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>

        <div className="mt-2  row">
          <div className={styles.Squad}>
            <div className={styles.Squad_justify}>
              <div className={styles.Squad_Heading}>
                <h3 className={styles.IPL__text}>Squad</h3>

                <div className={`${styles.icc_type} ${styles.Squad_T20_ODI}`}>
                  <h5
                    className={styles.test}
                    style={{
                      backgroundColor:
                        activeGroupsType === "TEST" ? null : "unset",
                      color:
                        activeGroupsType === "TEST" ? "var(--primary)" : "gray",
                      textDecoration:
                        activeGroupsType === "TEST" ? "underline" : "unset",
                    }}
                    onClick={handleOnClickTest}
                  >
                    TEST
                  </h5>
                  <h5
                    className={styles.odi}
                    style={{
                      backgroundColor:
                        activeGroupsType === "ODI" ? null : "unset",
                      color:
                        activeGroupsType === "ODI" ? "var(--primary)" : "gray",
                      textDecoration:
                        activeGroupsType === "ODI" ? "underline" : "unset",
                    }}
                    onClick={handleOnClickODI}
                  >
                    ODI
                  </h5>
                  <h5
                    className={styles.t20}
                    style={{
                      backgroundColor:
                        activeGroupsType === "T20" ? null : "unset",
                      color:
                        activeGroupsType === "T20" ? "var(--primary)" : "gray",
                      textDecoration:
                        activeGroupsType === "T20" ? "underline" : "unset",
                    }}
                    onClick={handleOnClickT20}
                  >
                    T20
                  </h5>
                </div>
              </div>

              <div className={styles.Squad_View_All}>
                <h3 className={styles.viewall}>
                  <Link
                    className={styles.link_color}
                    href={`/teams/${gender}/${tid}/${title}-cricket-team/squad/`}
                  >
                    View All
                  </Link>
                </h3>
              </div>
            </div>

            {/* <Carousel
              className={`"mt-2" ${styles.sizes}`}
              showDots={false}
              swipeable={true}
              draggable={true}
              responsive={responsive}
              autoPlay={true}
              dotListClass="custom-dot-list-style"
              infinite
            > */}
            <Slider ref={sliderRef3} {...settingsIpl}>
              {teamSquad.map((item, index) => {
                return (
                  <div className={`col ${styles.playerCard_col}`} key={index}>
                    <div className={`card ${styles.playerCard}`}>
                      {item.title === item.captain ? (
                        <div className={styles.playerposition}>
                          <div className={styles.captionPosition}>
                            <h6>C</h6>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.playerposition}>
                          <div className={styles.nonCaptionPosition}></div>
                        </div>
                      )}
                      <div className={styles.back_text}>
                        <b>{item.jersey === null ? 0 : item.jersey}</b>
                      </div>
                      <div className={styles.disp_img}>
                        <Image
                          src={
                            activeGroupsType === "tests"
                              ? item.profile_pic_test === null
                                ? icon
                                : HOST + item.profile_pic_test
                              : item.profile_pic_odi === null
                              ? icon
                              : HOST + item.profile_pic_odi
                          }
                          alt="player Images"
                          width={100}
                          height={100}
                        />
                      </div>

                      <h5 className={`card-title ${styles.player_Card_title}`}>
                        {item.title}
                      </h5>
                    </div>
                    <div className={`card-footer ${styles.player_Card_footer}`}>
                      <Link
                        href={`/players/${item.nationality}/${
                          item.pid
                        }/${slugify(item.title)}/`}
                        className="card-footer"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                );
              })}
            </Slider>
            <div
              className={styles.preNextButton}
              style={{
                display: "flex",
                justifyContent: "end",
                width: "auto",
                backgroundColor: "transparent",
              }}
            >
              <button className={styles.preMoreBtn} onClick={previous3}>
                <MdKeyboardArrowLeft />
              </button>
              <button className={styles.preMoreBtn} onClick={next3}>
                <MdKeyboardArrowRight />
              </button>
            </div>
            {/* </Carousel> */}
            <div className={styles.Squad_View_full_table}>
              <Link
                style={{ color: "black" }}
                className="link_color"
                href={`/teams/${gender}/${tid}/${title}-cricket-team/squad/`}
              >
                <h6>View More Table</h6>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
