import React, { useState, useCallback, useEffect } from "react";
import winner from "../../public/Images/no-player.png";
import { Col, Row } from "react-bootstrap";
import {
  competitionStatsAPI,
  competitionStatsTypeAPI,
} from "../../Constants/Api/Api";
import styles from "./SeriesStatsDetail.module.scss";
import MenuButton from "../MenuButton/MenuButton";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

// import BreadcrumbsSchema from "../BreadcrumbsSchema/BreadcrumbsSchema";
import HOST from "../../Constants/host";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

const SeriesStatsDetail = (props) => {
  const router = useRouter();
  const pathname = router.asPath;
  const [limit, setLimit] = useState("10");
  const [activeIndex, setActiveIndex] = useState("");
  const [competitionStatType, setCompetitionStatType] = useState();
  const [competitionStat, setCompetitionStat] = useState([]);
  const [activeFormats, setActiveFormats] = useState("Most Runs");
  // const [activeFormatsType, setActiveFormatsType] = useState(activeIndex);

  const [activeMatchType, setActiveMatchType] = useState("t20");
  const [activeFormatsType, setActiveFormatsType] =
    useState("batting_most_runs");
  const [activeGroupTitle, setActiveGroupTitle] = useState("Batting");
  const { cid, title, status, season } = router.query;

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

  function handleOnClickIPLType(value, value1) {
    setActiveFormatsType(value);
    setActiveFormats(value1);
    if (activeFormatsType !== activeIndex) {
      setActiveIndex();
    }
  }
  function unslugify(slug) {
    if (!slug) {
      return ''; // Handle the case when slug is undefined or falsy
    }
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  
  function handleOnClickT20() {
    setActiveMatchType("t20");
  }
  function handleOnClickODI() {
    setActiveMatchType("odi");
  }
  function handleOnClickBatting() {
    setActiveFormatsType("batting_most_runs");
    setActiveFormats("Most Runs");
    setActiveGroupTitle("Batting");
  }
  function handleOnClickBowling() {
    setActiveFormatsType("bowling_top_wicket_takers");
    setActiveFormats("Top Wicket Takers");
    setActiveGroupTitle("Bowling");
  }
  // function handleOnClickAllTeam() {
  //   setActiveGroupTitle("Team");
  // }

  // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {
  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );
  function handleOnClickShowMore() {
    if (limit === null) {
      setLimit("10");
    }
    if (limit === "10") {
      setLimit(null);
    }
  }
  // window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  useEffect(() => {
    // setIsLoading(true);
    competitionStatsTypeAPI(activeMatchType, activeGroupTitle, cid)
      .then((res) => {
        setCompetitionStatType(res.data.data.selectedbox);

        // setIsLoading(false);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
    competitionStatsAPI(
      activeMatchType,
      activeGroupTitle,
      cid,
      activeFormatsType,
      limit
    )
      .then((res) => {
        setCompetitionStat(res.data.data.rows);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [activeMatchType, activeGroupTitle, cid, activeFormatsType, limit]);

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
    <div className={styles.SeriesDetailAllSection}>
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
          }}/>
       
      </Head>
      {/* <div className="Breadcrums " style={{ margin: "5px 15px" }}>
       <ol className="breadcrumb" style={{ alignItems: "baseline" }}>
          {articleBreadcrumb.itemListElement.map((breadcrumb, index) => (
            <BreadcrumbsSchema
              key={index}
              label={breadcrumb.name}
              url={breadcrumb.item}
              isActive={index === articleBreadcrumb.itemListElement.length - 1}
              isLast={index === articleBreadcrumb.itemListElement.length - 1}
            />
          ))}
        </ol>
      </div> */}
      <div className={styles.SeriesDetail_Stats_section}>
        <div className={styles.fil}>
          <div className={styles.Rplayer_formats_new}>
            <h5
              className={styles.Rt20}
              style={{
                backgroundColor: activeMatchType === "t20" ? null : "unset",
                color: activeMatchType === "t20" ? null : "white",
              }}
              onClick={handleOnClickT20}
            >
              T20
            </h5>
            <h5
              className={styles.Rt20}
              style={{
                backgroundColor: activeMatchType === "odi" ? null : "unset",
                color: activeMatchType === "odi" ? null : "white",
              }}
              onClick={handleOnClickODI}
            >
              ODI
            </h5>
          </div>
          <div className={styles.Sicc_type}>
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
            className={styles.Sallrounder}
            style={{
              backgroundColor: activeGroupTitle === "Team" ? null : "unset",
            }}
            onClick={handleOnClickAllTeam}
          >
            Team
          </h5> */}
          </div>
        </div>
      </div>
      <Row className={styles.SeriesDetailStatsRow_section}>
        <Col sm={3} className={styles.SeriesDetail_Stats_col}>
          <div className={styles.child}>
            <h3 className={`"mx-3" ${styles.color_red}`}>
              {/* {unslugify(title)} */}
              {title}
            </h3>

            <div className={styles.format}>
              <div className={styles.Rplayer_formats_new_SeriesDetailStats}>
                {competitionStatType !== undefined
                  ? competitionStatType.map((item, index) => {
                      return (
                        <div key={index}>
                          <div
                            className={styles.SeriesStats_format}
                            style={{
                              backgroundColor:
                                activeFormatsType === item.types_key ||
                                activeIndex === item.types_key
                                  ? null
                                  : "#d9d9d9",
                              color:
                                activeFormatsType === item.types_key ||
                                activeIndex === item.types_key
                                  ? null
                                  : "unset",
                            }}
                            onClick={() =>
                              handleOnClickIPLType(item.types_key, item.types)
                            }
                          >
                            {index === 0 && activeIndex === ""
                              ? setActiveIndex(item.types_key)
                              : null}
                            {item.types}
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </Col>

        <Col sm={9} className={styles.SeriesDetail_Stats_col}>
          <div className={styles.child}>
            <h3 className={`mx-1 ${styles.color_red}`}>{activeFormats}</h3>
            <div className={styles.Table_Back}>
              <table className={styles.SeriesDetail_Stats_Table}>
                <thead className={styles.SeriesDetail_Stats_Table_header}>
                  <tr>
                    <th className={styles.no}>No.</th>
                    <th className={styles.player_name}>Player</th>
                    {activeGroupTitle === "Batting" ? (
                      <>
                        {activeFormats === "Most Runs" ||
                        activeFormats === "Highest Average" ||
                        activeFormats === "Highest Strike Rates" ||
                        activeFormats === "Highest Strike Rates (Innings)" ||
                        activeFormats === "Most Centuries" ||
                        activeFormats === "Most Fifties" ||
                        activeFormats === "Most Sixes" ||
                        activeFormats === "Most Sixes (Innings)" ||
                        activeFormats === "Most Fours" ||
                        activeFormats === "Most Fours (Innings)" ? (
                          <>
                            <th className={styles.M}>M</th>
                            <th className={styles.I}>I</th>
                            <th className={styles.Runs}>Runs</th>
                          </>
                        ) : null}
                        {activeFormats === "Most Runs" ||
                        activeFormats === "Highest Average" ||
                        activeFormats === "Most Sixes" ||
                        activeFormats === "Most Sixes (Innings)" ||
                        activeFormats === "Most Fours" ||
                        activeFormats === "Most Fours (Innings)" ? (
                          <th className={styles.Avg}>Avg</th>
                        ) : null}
                        {activeFormats === "Most Runs" ? (
                          <th className={styles.HS}>HS</th>
                        ) : null}
                        {activeFormats === "Highest Strike Rates" ||
                        activeFormats === "Highest Strike Rates (Innings)" ? (
                          <th className={styles.SR}>SR</th>
                        ) : null}
                        {activeFormats === "Most Fifties" ? (
                          <th className={styles.s50}>50s</th>
                        ) : null}
                        {activeFormats === "Most Centuries" ? (
                          <th className={styles.s100}>100s</th>
                        ) : null}
                        {activeFormats === "Most Sixes" ||
                        activeFormats === "Most Sixes (Innings)" ? (
                          <th className={styles.s6}>6s</th>
                        ) : null}
                        {activeFormats === "Most Fours" ||
                        activeFormats === "Most Fours (Innings)" ? (
                          <th className={styles.s4}>4s</th>
                        ) : null}
                        {activeFormats === "Highest Individual Score" ? (
                          <>
                            <th className={styles.Date}>Date</th>
                            <th className={styles.Score}>Score</th>
                            <th className={styles.Balls}>Balls faced</th>
                          </>
                        ) : null}
                      </>
                    ) : (
                      <>
                        {activeFormats === "Top Wicket Takers" ||
                        activeFormats === "Best Strike Rates" ||
                        activeFormats === "Best Strike Rates (Innings)" ||
                        activeFormats === "Most runs conceded in an innings" ||
                        activeFormats === "Maidens" ||
                        activeFormats === "Best Averages" ||
                        activeFormats === "Five Wickets" ||
                        activeFormats === "Four Wickets" ||
                        activeFormats === "Best Economy Rates" ||
                        activeFormats === "Best Economy Rates (Innings)" ? (
                          <th className={styles.MP}>MP</th>
                        ) : null}
                        {activeFormats === "Best Strike Rates" ||
                        activeFormats === "Best Strike Rates (Innings)" ||
                        activeFormats === "Most runs conceded in an innings" ||
                        activeFormats === "Maidens" ||
                        activeFormats === "Best Averages" ||
                        activeFormats === "Five Wickets" ||
                        activeFormats === "Four Wickets" ||
                        activeFormats === "Best Economy Rates" ||
                        activeFormats === "Best Economy Rates (Innings)" ? (
                          <th className={styles.O}>O</th>
                        ) : null}

                        {activeFormats === "Best Economy Rates" ||
                        activeFormats === "Best Economy Rates (Innings)" ? (
                          <th className={styles.M}>M</th>
                        ) : null}
                        {activeFormats === "Best Bowling Figures" ||
                        activeFormats === "Top Wicket Takers" ||
                        activeFormats === "Best Strike Rates" ||
                        activeFormats === "Best Strike Rates (Innings)" ||
                        activeFormats === "Most runs conceded in an innings" ||
                        activeFormats === "Maidens" ||
                        activeFormats === "Best Averages" ||
                        activeFormats === "Five Wickets" ||
                        activeFormats === "Four Wickets" ||
                        activeFormats === "Best Economy Rates" ||
                        activeFormats === "Best Economy Rates (Innings)" ? (
                          <>
                            <th className={styles.R}>R</th>
                            <th className={styles.W}>W</th>
                          </>
                        ) : null}

                        {activeFormats === "Best Bowling Figures" ||
                        activeFormats === "Top Wicket Takers" ? (
                          <th className={styles.VS}>VS</th>
                        ) : null}
                        {activeFormats === "Best Bowling Figures" ? (
                          <th className={styles.Date}>Date</th>
                        ) : null}
                        {activeFormats === "Best Bowling Figures" ? (
                          <th className={styles.BBI}>BBI</th>
                        ) : null}
                        {activeFormats === "Best Strike Rates" ||
                        activeFormats === "Best Strike Rates (Innings)" ||
                        activeFormats === "Most runs conceded in an innings" ||
                        activeFormats === "Maidens" ? (
                          <th className={styles.SR}>SR</th>
                        ) : null}
                        {activeFormats === "Best Averages" ? (
                          <th className={styles.Avg}>Avg</th>
                        ) : null}
                        {activeFormats === "Five Wickets" ? (
                          <th className={styles["5W"]}>5W</th>
                        ) : null}
                        {activeFormats === "Four Wickets" ? (
                          <th className={styles["4W"]}>4W</th>
                        ) : null}
                        {activeFormats === "Best Economy Rates" ||
                        activeFormats === "Best Economy Rates (Innings)" ? (
                          <th className={styles.Eco}>Eco</th>
                        ) : null}
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {competitionStat.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className={styles.no}>{index + 1}</td>
                        <td className={styles.text_left}>
                          <Image
                            alt="images"
                            className={styles.player_img}
                            src={winner}
                          />{" "}
                          <b className={styles.player_name}>
                            {item.player.title}
                          </b>
                        </td>

                        {activeGroupTitle === "Batting" ? (
                          <>
                            {activeFormats === "Most Runs" ||
                            activeFormats === "Highest Average" ||
                            activeFormats === "Highest Strike Rates" ||
                            activeFormats ===
                              "Highest Strike Rates (Innings)" ||
                            activeFormats === "Most Centuries" ||
                            activeFormats === "Most Fifties" ||
                            activeFormats === "Most Sixes" ||
                            activeFormats === "Most Sixes (Innings)" ||
                            activeFormats === "Most Fours" ||
                            activeFormats === "Most Fours (Innings)" ? (
                              <>
                                <td className={styles.M}>{item.matches}</td>
                                <td className={styles.I}>{item.innings}</td>
                                <td className={styles.Runs}>{item.runs}</td>
                              </>
                            ) : null}
                            {activeFormats === "Most Runs" ||
                            activeFormats === "Highest Average" ||
                            activeFormats === "Most Sixes" ||
                            activeFormats === "Most Sixes (Innings)" ||
                            activeFormats === "Most Fours" ||
                            activeFormats === "Most Fours (Innings)" ? (
                              <td className={styles.Avg}>{item.average}</td>
                            ) : null}
                            {activeFormats === "Most Runs" ? (
                              <td className={styles.HS}>{item.highest}</td>
                            ) : null}
                            {activeFormats === "Highest Strike Rates" ||
                            activeFormats ===
                              "Highest Strike Rates (Innings)" ? (
                              <td className={styles.SR}>{item.strike}</td>
                            ) : null}
                            {activeFormats === "Most Fifties" ? (
                              <td className={styles.s50}>{item.run50}</td>
                            ) : null}
                            {activeFormats === "Most Centuries" ? (
                              <td className={styles.s100}>{item.run100}</td>
                            ) : null}
                            {activeFormats === "Most Sixes" ||
                            activeFormats === "Most Sixes (Innings)" ? (
                              <td className={styles.s6}>{item.run6}</td>
                            ) : null}
                            {activeFormats === "Most Fours" ||
                            activeFormats === "Most Fours (Innings)" ? (
                              <td className={styles.s4}>{item.run4}</td>
                            ) : null}
                            {activeFormats === "Highest Individual Score" ? (
                              <>
                                <td className={styles.Date}>-</td>
                                <td className={styles.Score}>{item.highest}</td>
                                <td className={styles.Balls}>{item.balls}</td>
                              </>
                            ) : null}
                          </>
                        ) : (
                          <>
                            {activeFormats === "Top Wicket Takers" ||
                            activeFormats === "Best Strike Rates" ||
                            activeFormats === "Best Strike Rates (Innings)" ||
                            activeFormats ===
                              "Most runs conceded in an innings" ||
                            activeFormats === "Maidens" ||
                            activeFormats === "Best Averages" ||
                            activeFormats === "Five Wickets" ||
                            activeFormats === "Four Wickets" ||
                            activeFormats === "Best Economy Rates" ||
                            activeFormats === "Best Economy Rates (Innings)" ? (
                              <td className={styles.MP}>{item.matches}</td>
                            ) : null}
                            {activeFormats === "Best Strike Rates" ||
                            activeFormats === "Best Strike Rates (Innings)" ||
                            activeFormats ===
                              "Most runs conceded in an innings" ||
                            activeFormats === "Maidens" ||
                            activeFormats === "Best Averages" ||
                            activeFormats === "Five Wickets" ||
                            activeFormats === "Four Wickets" ||
                            activeFormats === "Best Economy Rates" ||
                            activeFormats === "Best Economy Rates (Innings)" ? (
                              <td className={styles.O}>{item.overs}</td>
                            ) : null}
                            {activeFormats === "Best Economy Rates" ||
                            activeFormats === "Best Economy Rates (Innings)" ? (
                              <th className={styles.M}>{item.matches}</th>
                            ) : null}
                            {activeFormats === "Best Bowling Figures" ||
                            activeFormats === "Top Wicket Takers" ||
                            activeFormats === "Best Strike Rates" ||
                            activeFormats === "Best Strike Rates (Innings)" ||
                            activeFormats ===
                              "Most runs conceded in an innings" ||
                            activeFormats === "Maidens" ||
                            activeFormats === "Best Averages" ||
                            activeFormats === "Five Wickets" ||
                            activeFormats === "Four Wickets" ||
                            activeFormats === "Best Economy Rates" ||
                            activeFormats === "Best Economy Rates (Innings)" ? (
                              <>
                                <td className={styles.R}>{item.runs}</td>
                                <td className={styles.W}>{item.wickets}</td>
                              </>
                            ) : null}

                            {activeFormats === "Best Bowling Figures" ||
                            activeFormats === "Top Wicket Takers" ? (
                              <td className={styles.VS}>{item.team.abbr}</td>
                            ) : null}
                            {activeFormats === "Best Bowling Figures" ? (
                              <td className={styles.Date}>-</td>
                            ) : null}
                            {activeFormats === "Best Bowling Figures" ? (
                              <td className={styles.BBI}>{item.bestinning}</td>
                            ) : null}
                            {activeFormats === "Best Strike Rates" ||
                            activeFormats === "Best Strike Rates (Innings)" ||
                            activeFormats ===
                              "Most runs conceded in an innings" ||
                            activeFormats === "Maidens" ? (
                              <td className={styles.SR}>{item.bestinning}</td>
                            ) : null}
                            {activeFormats === "Best Averages" ? (
                              <td className={styles.Avg}>{item.average}</td>
                            ) : null}
                            {activeFormats === "Five Wickets" ? (
                              <td className={styles.W5}>{item.wicket5i}</td>
                            ) : null}
                            {activeFormats === "Four Wickets" ? (
                              <td className={styles.W4}>{item.wicket4i}</td>
                            ) : null}
                            {activeFormats === "Best Economy Rates" ||
                            activeFormats === "Best Economy Rates (Innings)" ? (
                              <th className={styles.Eco}>{item.econ}</th>
                            ) : null}
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className={styles.more}>
              <h5 className={styles.show_more} onClick={handleOnClickShowMore}>
                {limit === "10" ? (
                  <div>
                    Show More
                    <AiFillCaretDown
                      style={{ fontSize: "18px", verticalAlign: "bottom" }}
                    />
                  </div>
                ) : (
                  <div>
                    Show Less
                    <AiFillCaretUp
                      style={{ fontSize: "18px", verticalAlign: "bottom" }}
                    />
                  </div>
                )}
              </h5>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SeriesStatsDetail;
