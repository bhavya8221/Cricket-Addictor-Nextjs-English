import styles from "./IPLStats.module.scss";
import React, { useState, useEffect } from "react";
// import { link } from "react-router-dom";
import winner from "../../../../../../public/Images/no-player.png";
import { Col, Row } from "react-bootstrap";

import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useRouter } from "next/router";
import { competitionStatsTypeAPI } from "../../../../../../Constants/Api/Api";
import { competitionStatsAPI } from "../../../../../../Constants/Api/Api";
import Image from "next/image";
// import ClipLoader from "react-spinners/ClipLoader";

const IPLStats = () => {
  const router = useRouter();
  const [limit, setLimit] = useState("10");
  const [isLoading, setIsLoading] = useState(false);
  const [competitionStatType, setCompetitionStatType] = useState();
  const [competitionStat, setCompetitionStat] = useState();
  const [activeFormats, setActiveFormats] = useState("Most Runs");
  // const [activeFormatsType, setActiveFormatsType] = useState(activeIndex);
  const [activeFormatsType, setActiveFormatsType] =
    useState("batting_most_runs");
  const [activeGroupTitle, setActiveGroupTitle] = useState("Batting");
  const { cid, season } = router.query;

  function handleOnClickIPLType(value, value1) {
    setActiveFormatsType(value);
    setActiveFormats(value1);
   
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    competitionStatsTypeAPI("t20", activeGroupTitle, cid)
      .then((res) => {
        setCompetitionStatType(res.data.data.selectedbox);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
    setIsLoading(true);
    competitionStatsAPI("t20", activeGroupTitle, cid, activeFormatsType, limit)
      .then((res) => {
        setCompetitionStat(res.data.data.rows);
        setIsLoading(false);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [cid, activeGroupTitle, limit, activeFormatsType]);

 

  return (
    <div className={styles.IPLStats_sections}>
      <div className={styles.fil}>
        <div className={styles.Sicc_type}>
          <h5
            className={styles.Steam}
            style={{
              backgroundColor: activeGroupTitle === "Batting" ? null : "unset",
            }}
            onClick={handleOnClickBatting}
          >
            batting
          </h5>
          <h5
            className={styles.Sbowling}
            style={{
              backgroundColor: activeGroupTitle === "Bowling" ? null : "unset",
            }}
            onClick={handleOnClickBowling}
          >
            bowling
          </h5>
          {/* <h5
            className="Sallrounder"
            style={{
              backgroundColor: activeGroupTitle === "Team" ? null : "unset",
            }}
            onClick={handleOnClickAllTeam}
          >
            Team
          </h5> */}
        </div>
      </div>

      <Row className={styles.IPL_Stats_Row}>
        <Col sm={3} className={styles.IPL_Stats_col}>
          <div className={styles.child}>
            <h3 className={`mx-3 ${styles.color_red}`}>leaders</h3>
            <div className={styles.format}>
              <div className={styles.Rplayer_formats_new_IPLStats}>
                {competitionStatType !== undefined
                  ? competitionStatType.map((item, index) => {
                      return (
                        <div key={index}>
                          <div
                            className={styles.IPLSTats_format}
                            style={{
                              backgroundColor:
                                activeFormatsType === item.types_key
                                  ? // ||
                                    // activeIndex === item.types_key
                                    null
                                  : "#d9d9d9",
                              color:
                                activeFormatsType === item.types_key
                                  ? // ||
                                    // activeIndex === item.types_key
                                    null
                                  : "unset",
                            }}
                            onClick={() =>
                              handleOnClickIPLType(item.types_key, item.types)
                            }
                          >
                            {/* {index === 0 && activeIndex === ""
                              ? setActiveIndex(item.types_key)
                              : null} */}
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

        <Col sm={9} className={styles.IPL_Stats_col}>
          <div className={styles.child}>
            <h3 className={`mx-1 ${styles.color_red}`}>{activeFormats} </h3>
            {isLoading === true ? //     size={30} //     loading={isLoading} //     color={"var(--primary)"} //   <ClipLoader // <div className="loader">
            //   />
            // </div>
            null : (
              <div className={styles.Table_Back}>
                <table className={styles.IPL_Stats_Table}>
                  <thead className={styles.IPL_Stats_Table_header}>
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
                          activeFormats ===
                            "Most runs conceded in an innings" ||
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
                          activeFormats ===
                            "Most runs conceded in an innings" ||
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
                          activeFormats ===
                            "Most runs conceded in an innings" ||
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
                          activeFormats ===
                            "Most runs conceded in an innings" ||
                          activeFormats === "Maidens" ? (
                            <th className={styles.SR}>SR</th>
                          ) : null}
                          {activeFormats === "Best Averages" ? (
                            <th className={styles.Avg}>Avg</th>
                          ) : null}
                          {activeFormats === "Five Wickets" ? (
                            <th className={styles.W5}>5W</th>
                          ) : null}
                          {activeFormats === "Four Wickets" ? (
                            <th className={styles.W4}>4W</th>
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
                    {competitionStat !== undefined
                      ? competitionStat.map((item, index) => {
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
                                      <td className={styles.M}>
                                        {item.matches}
                                      </td>
                                      <td className={styles.I}>
                                        {item.innings}
                                      </td>
                                      <td className={styles.Runs}>
                                        {item.runs}
                                      </td>
                                    </>
                                  ) : null}
                                  {activeFormats === "Most Runs" ||
                                  activeFormats === "Highest Average" ||
                                  activeFormats === "Most Sixes" ||
                                  activeFormats === "Most Sixes (Innings)" ||
                                  activeFormats === "Most Fours" ||
                                  activeFormats === "Most Fours (Innings)" ? (
                                    <td className={styles.Avg}>
                                      {item.average}
                                    </td>
                                  ) : null}
                                  {activeFormats === "Most Runs" ? (
                                    <td className={styles.HS}>
                                      {item.highest}
                                    </td>
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
                                    <td className={styles.s100}>
                                      {item.run100}
                                    </td>
                                  ) : null}
                                  {activeFormats === "Most Sixes" ||
                                  activeFormats === "Most Sixes (Innings)" ? (
                                    <td className={styles.s6}>{item.run6}</td>
                                  ) : null}
                                  {activeFormats === "Most Fours" ||
                                  activeFormats === "Most Fours (Innings)" ? (
                                    <td className={styles.s4}>{item.run4}</td>
                                  ) : null}
                                  {activeFormats ===
                                  "Highest Individual Score" ? (
                                    <>
                                      <td className={styles.Date}>-</td>
                                      <td className={styles.Score}>
                                        {item.highest}
                                      </td>
                                      <td className={styles.Balls}>
                                        {item.balls}
                                      </td>
                                    </>
                                  ) : null}
                                </>
                              ) : (
                                <>
                                  {activeFormats === "Top Wicket Takers" ||
                                  activeFormats === "Best Strike Rates" ||
                                  activeFormats ===
                                    "Best Strike Rates (Innings)" ||
                                  activeFormats ===
                                    "Most runs conceded in an innings" ||
                                  activeFormats === "Maidens" ||
                                  activeFormats === "Best Averages" ||
                                  activeFormats === "Five Wickets" ||
                                  activeFormats === "Four Wickets" ||
                                  activeFormats === "Best Economy Rates" ||
                                  activeFormats ===
                                    "Best Economy Rates (Innings)" ? (
                                    <td className={styles.MP}>
                                      {item.matches}
                                    </td>
                                  ) : null}
                                  {activeFormats === "Best Strike Rates" ||
                                  activeFormats ===
                                    "Best Strike Rates (Innings)" ||
                                  activeFormats ===
                                    "Most runs conceded in an innings" ||
                                  activeFormats === "Maidens" ||
                                  activeFormats === "Best Averages" ||
                                  activeFormats === "Five Wickets" ||
                                  activeFormats === "Four Wickets" ||
                                  activeFormats === "Best Economy Rates" ||
                                  activeFormats ===
                                    "Best Economy Rates (Innings)" ? (
                                    <td className={styles.O}>{item.overs}</td>
                                  ) : null}
                                  {activeFormats === "Best Economy Rates" ||
                                  activeFormats ===
                                    "Best Economy Rates (Innings)" ? (
                                    <th className={styles.M}>{item.matches}</th>
                                  ) : null}
                                  {activeFormats === "Best Bowling Figures" ||
                                  activeFormats === "Top Wicket Takers" ||
                                  activeFormats === "Best Strike Rates" ||
                                  activeFormats ===
                                    "Best Strike Rates (Innings)" ||
                                  activeFormats ===
                                    "Most runs conceded in an innings" ||
                                  activeFormats === "Maidens" ||
                                  activeFormats === "Best Averages" ||
                                  activeFormats === "Five Wickets" ||
                                  activeFormats === "Four Wickets" ||
                                  activeFormats === "Best Economy Rates" ||
                                  activeFormats ===
                                    "Best Economy Rates (Innings)" ? (
                                    <>
                                      <td className={styles.R}>{item.runs}</td>
                                      <td className={styles.W}>
                                        {item.wickets}
                                      </td>
                                    </>
                                  ) : null}

                                  {activeFormats === "Best Bowling Figures" ||
                                  activeFormats === "Top Wicket Takers" ? (
                                    <td className={styles.VS}>
                                      {item.team.abbr}
                                    </td>
                                  ) : null}
                                  {activeFormats === "Best Bowling Figures" ? (
                                    <td className={styles.Date}>-</td>
                                  ) : null}
                                  {activeFormats === "Best Bowling Figures" ? (
                                    <td className={styles.BBI}>
                                      {item.bestinning}
                                    </td>
                                  ) : null}
                                  {activeFormats === "Best Strike Rates" ||
                                  activeFormats ===
                                    "Best Strike Rates (Innings)" ||
                                  activeFormats ===
                                    "Most runs conceded in an innings" ||
                                  activeFormats === "Maidens" ? (
                                    <td className={styles.SR}>
                                      {item.bestinning}
                                    </td>
                                  ) : null}
                                  {activeFormats === "Best Averages" ? (
                                    <td className={styles.Avg}>
                                      {item.average}
                                    </td>
                                  ) : null}
                                  {activeFormats === "Five Wickets" ? (
                                    <td className={styles.W5}>
                                      {item.wicket5i}
                                    </td>
                                  ) : null}
                                  {activeFormats === "Four Wickets" ? (
                                    <td className={styles.W4}>
                                      {item.wicket4i}
                                    </td>
                                  ) : null}
                                  {activeFormats === "Best Economy Rates" ||
                                  activeFormats ===
                                    "Best Economy Rates (Innings)" ? (
                                    <th className={styles.Eco}>{item.econ}</th>
                                  ) : null}
                                </>
                              )}
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
            )}

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
                    Show Less{" "}
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

export default IPLStats;
