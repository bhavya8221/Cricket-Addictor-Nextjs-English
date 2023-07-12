import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import HOST from "../../../Constants/host";
import styles from "./Home.module.scss";
import dataList from "../../../Common/data.json";
import { Container } from "react-bootstrap";
import { Paper } from "@mui/material";
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import noFlag from "../../../public/Images/no-flag.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import background from "../../../public/Images/no-img.png";
import TagManager from "react-gtm-module";
import { AiFillCaretUp } from "react-icons/ai";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import slugify from "react-slugify";
import { useLayoutEffect } from "react";
import { Grid } from "@nextui-org/react";
import {
  homeBannerNewsApi,
  iCCRankingHomePage,
  iPLHomeLeader,
  newLiveMatchApi,
  newRecentMatchApi,
  newUpcommingMatchApi,
} from "../../../Constants/Api/Api";
import ImageSlider from "../ImageSlider";
import { useRouter } from "next/router";
import LatestNewsCard from "../../LatestNewsCard/LatestNewsCard";
import FantasyNewsCard from "../../LatestNewsCard/FantasyNewsCard";
import PlayerCardHome from "../../PlayerCardHome/PlayerCardHome";
import IplLeaderNewHome from "../../IplLeaderNewHome/IplLeaderNewHome";
import LiveScoreCardLatest from "../../LiveScoreCardLatest/LiveScoreCardLatest";
import NewsCard from "../../NewsCard/NewsCard";
import Link from "next/link";
import TeamCardHome from "../../TeamCardHome/TeamCardHome";
import Head from "next/head";

function Home() {
  const router = useRouter();
  const navigate = router.replace;
  const [ScoreData, setScoreData] = useState([]);
  const [CarouselData, setCarouselData] = useState([]);
  const [LatestData, setLatestData] = useState([]);
  const [NewsData, setNewsData] = useState([]);
  const [value, setValue] = useState(0);
  const [gender, setGender] = useState("MENS");
  const [activeGroupsType, setActiveGroupsType] = useState("tests");
  const [matchFilter, setMatchFilter] = useState("");
  const [match, setMatch] = useState("live");
  const [iplHomeData, setIplHomeData] = useState([]);
  const [iccHome, setICCHome] = useState([]);
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);
  const sliderRef3 = useRef(null);

  const next1 = () => {
    sliderRef1.current.slickNext();
  };
  const previous1 = () => {
    sliderRef1.current.slickPrev();
  };

  const next2 = () => {
    sliderRef2.current.slickNext();
  };
  const previous2 = () => {
    sliderRef2.current.slickPrev();
  };

  const next3 = () => {
    sliderRef3.current.slickNext();
  };
  const previous3 = () => {
    sliderRef3.current.slickPrev();
  };
  const [settings, setSettings] = useState({});
  const [settingsLiveScore, setSettingsLiveScore] = useState({});
  const [settingsIpl, setSettingsIpl] = useState({});

  useEffect(() => {
    const generateSettings = () => {
      const newSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: window.innerWidth < 767 ? 1 : 3,
        slidesToScroll: 1,
        rows: window.innerWidth < 767 ? 1 : 2,
        arrows: false,
      };
      setSettings(newSettings);
    };
    window.addEventListener("resize", generateSettings);
    generateSettings();
    return () => {
      window.removeEventListener("resize", generateSettings);
    };
  }, []);

  useEffect(() => {
    const generateSettingsLiveScore = () => {
      const newSettingsLiveScore = {
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        arrows: false,
        slidesToScroll: 1,
      };
      setSettingsLiveScore(newSettingsLiveScore);
    };
    window.addEventListener("resize", generateSettingsLiveScore);
    generateSettingsLiveScore();
    return () => {
      window.removeEventListener("resize", generateSettingsLiveScore);
    };
  }, []);

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
    window.addEventListener("resize", generateSettingsIPL);
    generateSettingsIPL();
    return () => {
      window.removeEventListener("resize", generateSettingsIPL);
    };
  }, []);

  const handleMoreNews = () => {
    navigate("/cricket-news/all/");
  };

  function handleOnClickMens() {
    setGender("MENS");
  }

  function handleOnClickWomens() {
    setGender("WOMENS");
  }

  function handleOnClickTest() {
    setActiveGroupsType("tests");
  }

  function handleOnClickODI() {
    setActiveGroupsType("odis");
  }

  function handleOnClickT20() {
    setActiveGroupsType("t20s");
  }

  function handleAllFilter() {
    setMatchFilter("");
  }

  function handleInternationalFilter() {
    setMatchFilter("international");
  }

  function handleDomesticFilter() {
    setMatchFilter("domestic");
  }

  function handleLeagueFilter() {
    setMatchFilter("league");
  }

  function handleLive() {
    setMatch("live");
  }

  function handleCompleted() {
    navigate(
      "/cricket-live-score/recent-matches/undefined/undefined/undefined/all/"
    );
  }

  function handleUpcoming() {
    navigate("/cricket-live-score/upcoming-matches/all/");
  }

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
  const baseUrl = `${$url.protocol}${HOST.split("/")[2]}`;
  const primaryUrl = `${baseUrl}`;

  useLayoutEffect(() => {
    //-----GTM------//
    const tagManagerArgs = {
      gtmId: "G-BG7P8LT7SL",
      dataLayer: {
        event: "PageLoad",
        eventAction: "Home-Page-Load",
        eventCategory: "Website",
      },
    };
    TagManager.initialize(tagManagerArgs);

    homeBannerNewsApi("")
      .then((res) => {
        setCarouselData(res.data.data.slice(0, 4));
        setLatestData(res.data.data.slice(0, 6));
        setNewsData(res.data.data);
      })
      .catch((e) => {
        console.log(e)
      });

    iPLHomeLeader(dataList.data.IPL[0].cid)
      .then((res) => {
        setIplHomeData(res.data.data);
      })
      .catch((e) => {
        console.log(e)
      });

    iCCRankingHomePage(
      value === 0 ? activeGroupsType : "",
      gender,
      value === 0 ? "" : "teams"
    )
      .then((res) => {
        setICCHome(res.data.data);
      })
      .catch((e) => {
        console.log(e)
      });

    if (match === "live") {
      newLiveMatchApi(matchFilter)
        .then((res) => {
          setScoreData(res.data.data);
        })
        .catch((e) => {
          console.log(e)
        });
    }
    if (match === "completed") {
      newRecentMatchApi(matchFilter === "all" ? "" : matchFilter)
        .then((res) => {
          setScoreData(res.data.data);
        })
        .catch((e) => {
          console.log(e)
        });
    }
    if (match === "upcoming") {
      newUpcommingMatchApi(matchFilter === "all" ? "" : matchFilter)
        .then((res) => {
          setScoreData(res.data.data);
        })
        .catch((e) => {
          console.log(e)
        });
    }
  }, [matchFilter, match, dataList, activeGroupsType, gender]);

  return (
    <>
      <Head>
        <title>
          Cricket News Today, Latest Cricket Updates, Fantasy Cricket
        </title>
        <meta
          name="description"
          content="Cricket news today: Get the latest cricket news updates, cricket schedule, cricket stats, live score, fantasy cricket tips & ICC rankings"
        />
        <link rel="canonical" href={HOST} />
      </Head>
      <div className={styles.home}>
        <Grid.Container gap={2}>
          <Grid xs={12} md={8} className="row">
            <div className={`"col-md-8" ${styles.col_one}`}>
              {CarouselData.length === 0 ? null : (
                <ImageSlider CarouselData={CarouselData} />
              )}
              <div className={styles.filterDiv}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className={styles.matches}>
                    <div className={styles.filtertypename}>
                      <li
                        style={{
                          color: match === "live" ? "var(--primary)" : "black",
                          fontWeight: "800",
                        }}
                        onClick={handleLive}
                      >
                        Live
                      </li>
                      {match === "live" ? (
                        <AiFillCaretUp
                          size={16}
                          color="rgba(255, 80, 2, 0.5)"
                        />
                      ) : null}
                    </div>
                    <div className={styles.filtertypename}>
                      <li
                        style={{
                          color:
                            match === "completed" ? "var(--primary)" : "black",
                          fontWeight: "800",
                        }}
                        onClick={handleCompleted}
                      >
                        Completed
                      </li>
                      {match === "completed" ? (
                        <AiFillCaretUp
                          size={16}
                          color="rgba(255, 80, 2, 0.5)"
                        />
                      ) : null}
                    </div>
                    <div className={styles.filtertypename}>
                      <li
                        style={{
                          color:
                            match === "upcoming" ? "var(--primary)" : "black",
                          fontWeight: "800",
                        }}
                        onClick={handleUpcoming}
                      >
                        Upcoming
                      </li>
                      {match === "upcoming" ? (
                        <AiFillCaretUp
                          size={16}
                          color="rgba(255, 80, 2, 0.5)"
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className={styles.filterTypeForAll}>
                    <div className={styles.filtertypename}>
                      <li
                        style={{
                          textDecoration:
                            matchFilter === ""
                              ? "underline 2px solid var(--primary)"
                              : null,
                        }}
                        onClick={handleAllFilter}
                      >
                        All
                      </li>
                    </div>
                    <div className={styles.filtertypename}>
                      <li
                        style={{
                          textDecoration:
                            matchFilter === "international"
                              ? "underline 2px solid var(--primary)"
                              : null,
                        }}
                        onClick={handleInternationalFilter}
                      >
                        International
                      </li>
                    </div>
                    <div className={styles.filtertypename}>
                      <li
                        style={{
                          textDecoration:
                            matchFilter === "league"
                              ? "underline 2px solid var(--primary)"
                              : null,
                        }}
                        onClick={handleLeagueFilter}
                      >
                        League
                      </li>
                    </div>
                    <div className={styles.filtertypename}>
                      <li
                        style={{
                          textDecoration:
                            matchFilter === "domestic"
                              ? " underline 2px solid var(--primary)"
                              : null,
                        }}
                        onClick={handleDomesticFilter}
                      >
                        Domestic
                      </li>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mobileViewLivecard}>
                <div>
                  {Object.keys(ScoreData).map((item) => {
                    return ScoreData[item].map((item2, index) => {
                      return (
                        <LiveScoreCardLatest
                          key={index}
                          data={item2}
                          type="live-matches"
                          location="home"
                          match={match}
                        />
                      );
                    });
                  })}
                </div>
              </div>
              <div className={styles.desktopViewLivecard}>
                <Slider ref={sliderRef3} {...settingsLiveScore}>
                  {Object.keys(ScoreData).map((item) => {
                    return ScoreData[item].map((item2, index) => {
                      return (
                        <LiveScoreCardLatest
                          key={index}
                          data={item2}
                          type="live-matches"
                          location="home"
                          match={match}
                        />
                      );
                    });
                  })}
                </Slider>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <div
                    className={styles.preNextButton}
                    style={{
                      width: "auto",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <button className={styles.preMoreBtn} onClick={previous3}>
                      <MdKeyboardArrowLeft />
                    </button>
                    <button className={styles.preMoreBtn} onClick={next3}>
                      <MdKeyboardArrowRight />
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.livescore_btn}>
                <Link
                  href={`/cricket-live-score/live-matches/all/`}
                  className={styles.link_color}
                >
                  <h3 className={styles.btn}>Live Scores</h3>
                </Link>
              </div>
            </div>
          </Grid>
          <Grid xs={12} md={4}>
            <div className={`"col-md-8" ${styles.col_two}`}>
              <h3 className={styles.latest__text}>Latest</h3>
              <LatestNewsCard data={LatestData} />
            </div>
          </Grid>
        </Grid.Container>
        <Grid.Container gap={2} className={`${styles.row} ${styles.HomeRow}`}>
          <Grid
            xs={12}
            md={8}
            className={`"col-md-8 row" ${styles.col_one}`}
            style={{ display: "block" }}
          >
            <h3 className={styles.latest__text}>News</h3>
            <div>
              <Slider ref={sliderRef1} {...settings}>
                {NewsData.length === 0
                  ? null
                  : NewsData.map((item, index) => {
                    return (
                      <div key={index} className="col-md-12 p-1">
                        <Link
                          className={styles.link_color}
                          href={
                            item.category === null ||
                              item.category.length === 0 ||
                              item.category.slug === null
                              ? `/${item.news_category}/${item.slug}/`
                              : `/${item.news_category}/${slugify(
                                item.category.slug
                              )}/${item.slug}/`
                          }
                        >
                          <NewsCard
                            title={item.title}
                            date={item.post_date}
                            source={
                              item.attachment.length === 0 ||
                                item.attachment === [] ||
                                item.attachment === undefined
                                ? `${background}`
                                : item.attachment[0].file_name === ""
                                  ? `${background}`
                                  : `${HOST}${item.attachment[0].file_uri}/${item.attachment[0].file_name}`
                            }
                          />
                        </Link>
                      </div>
                    );
                  })}
              </Slider>
              <div className={styles.buttonsection}>
                <div className={styles.morenewsbutton}>
                  <button
                    className={styles.ltsMoreBtn}
                    onClick={handleMoreNews}
                  >
                    More &nbsp;News
                  </button>
                </div>
                <div className={styles.preNextButton}>
                  <button className={styles.preMoreBtn} onClick={previous1}>
                    <MdKeyboardArrowLeft />
                  </button>
                  <button className={styles.preMoreBtn} onClick={next1}>
                    <MdKeyboardArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </Grid>
          <Grid xs={12} md={4}>
            <div className={`"col-md-8" ${styles.col_two}`}>
              <h3 className={styles.latest__text}>Latest</h3>
              <FantasyNewsCard news_type="fantasy-cricket" data={LatestData} />

            </div>
          </Grid>
        </Grid.Container>
        <div className={`${styles.row} ${styles.HomeRow}`}>
          <Container>
            <h3 className={styles.IPL__text}>ICC Ranking</h3>
            <Paper square>
              <Tabs
                value={value}
                textColor="primary"
                indicatorColor="primary"
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}

              >
                <Tab style={{ color: "white" }} label="Player Ranking" />
                <Tab style={{ color: "white" }} label="Team Ranking" />
              </Tabs>

              <div className={styles.type_group}>
                {" "}
                <div className={styles.player_gender}>
                  <h5
                    className={`${styles.mens} ${styles.textUppercase}`}
                    style={{
                      backgroundColor: gender === "MENS" ? null : "unset",
                      color: gender === "MENS" ? "var(--primary)" : "white",
                    }}
                    onClick={handleOnClickMens}
                  >
                    Men
                  </h5>
                  <h5
                    className={`${styles.womens} ${styles.textUppercase}`}
                    style={{
                      backgroundColor: gender === "WOMENS" ? null : "unset",
                      color: gender === "WOMENS" ? "var(--primary)" : "white",
                    }}
                    onClick={handleOnClickWomens}
                  >
                    Women
                  </h5>
                </div>
                {value === 0 ? (
                  <div className={styles.icc_type}>
                    <h5
                      className={`${styles.test} ${styles.textUppercase}`}
                      style={{
                        backgroundColor:
                          activeGroupsType === "tests" ? null : "unset",
                      }}
                      onClick={handleOnClickTest}
                    >
                      TEST
                    </h5>
                    <h5
                      className={`${styles.odi} ${styles.textUppercase}`}
                      style={{
                        backgroundColor:
                          activeGroupsType === "odis" ? null : "unset",
                      }}
                      onClick={handleOnClickODI}
                    >
                      ODI
                    </h5>
                    <h5
                      className={`${styles.t20} ${styles.textUppercase}`}
                      style={{
                        backgroundColor:
                          activeGroupsType === "t20s" ? null : "unset",
                      }}
                      onClick={handleOnClickT20}
                    >
                      T20
                    </h5>
                  </div>
                ) : null}
              </div>

              {gender === "WOMENS" ? (
                <h4 style={{ marginTop: 20, marginLeft: 20 }}>
                  No Women ICC Ranking Data...
                </h4>
              ) : value === 0 ? (
                <Slider ref={sliderRef2} {...settingsIpl}>
                  <PlayerCardHome
                    activeGroupsType={activeGroupsType}
                    img={noFlag}
                    data={iccHome[0]}
                    type="batsmen"
                  />

                  <PlayerCardHome
                    activeGroupsType={activeGroupsType}
                    img={noFlag}
                    type="bowlers"
                    data={iccHome[1]}
                  />
                  <PlayerCardHome
                    activeGroupsType={activeGroupsType}
                    img={noFlag}
                    data={iccHome[2]}
                    type="all-rounders"
                  />
                </Slider>
              ) : (
                <Slider ref={sliderRef2} {...settingsIpl}>
                  <TeamCardHome img={noFlag} type="tests" data={iccHome[0]} />
                  <TeamCardHome img={noFlag} type="odis" data={iccHome[1]} />
                  <TeamCardHome img={noFlag} type="t20s" data={iccHome[2]} />
                </Slider>
              )}
            </Paper>
          </Container>
        </div>
        {iplHomeData.length === 0 ? null : (
          <div className={`${styles.row} ${styles.HomeRow} ${styles.iplRow}`}>
            <Container>
              <h3 className={`${styles.IPL__text} ${styles.textUppercase}`}>
                IPL Leaders
              </h3>
              <Slider ref={sliderRef2} {...settingsIpl}>
                <IplLeaderNewHome
                  img={noFlag}
                  type="Runs"
                  backColor="linear-gradient(256.23deg, #fa601f 45.4%, #e5c322 99.95%)"
                  data={iplHomeData[0]}
                />

                <IplLeaderNewHome
                  img={noFlag}
                  type="Score"
                  backColor="linear-gradient(256.23deg, #153279 45.4%, #0F2354 99.95%)"
                  data={iplHomeData[1]}
                />
                <IplLeaderNewHome
                  img={noFlag}
                  type="Wicket"
                  backColor="linear-gradient(256.23deg, #9334E9 45.4%, #7030AA 99.95%)"
                  data={iplHomeData[2]}
                />
                <IplLeaderNewHome
                  img={noFlag}
                  type="BBI"
                  backColor="linear-gradient(256.23deg, #16347C 45.4%, #0F2354 99.95%)"
                  data={iplHomeData[3]}
                />
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
            </Container>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
