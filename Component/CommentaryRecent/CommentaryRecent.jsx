import React, { useEffect, useState, useCallback } from "react";
import styles from "./CommentaryRecent.module.scss";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useRouter } from "next/router";
import {
  liveCommentaryApi,
  liveMatchByIdApi,
  livePlayersApi,
  liveScorecardApi,
  recentCommentaryApi,
  recentMatcByIdApi,
  recentPlayersApi,
  recentScorecardApi,
  upcomingMatchByIdApi,
} from "../../Constants/Api/Api";
import CommentaryBoxRecent from "./CommentaryBoxRecent/CommentaryBoxRecent";
import Image from "next/image";
const CommentaryRecent = (props) => {
  const router = useRouter();
  const { slug } = router.query;
  
  const match_id = slug === undefined ? null : slug[0];
  const latest_inning_number = slug === undefined ? null : slug[1];
  const [scorecardData, setScorecardData] = useState({});
  const [matchData, setMatchData] = useState();
  const [commentaryData, setCommentaryData] = useState([]);
  const [playingXIData, setPlayingXIData] = useState([]);
  const [upcomingData, setUpcomingData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadings, setIsLoadings] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibles, setVisibles] = useState(false);
  const [visibleBox, setVisibleBox] = useState(false);
  const [visiblePlayingXI, setVisiblePlayingXI] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  function handleOnClickShowMore() {
    if (isScrolling === true) {
      setIsScrolling(false);
    }
    if (isScrolling === false) {
      setIsScrolling(true);
    }
  }

  useEffect(() => {
    if (props.type === "live") {
      setIsLoading(true);
      liveCommentaryApi(match_id, latest_inning_number)
        .then((res) => {
          setCommentaryData(res.data.data);
          setIsLoading(false);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
    if (props.type === "recent") {
      setIsLoading(true);
      recentCommentaryApi(match_id, latest_inning_number)
        .then((res) => {
          setCommentaryData(res.data.data);
          setIsLoading(false);
          setVisibleBox(true);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
    if (props.type === "live") {
      setIsLoadings(true);
      liveMatchByIdApi(match_id)
        .then((res) => {
          setMatchData(res.data.data);
          setIsLoadings(false);
          setVisible(true);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
    if (props.type === "recent") {
      setIsLoadings(true);
      recentMatcByIdApi(match_id)
        .then((res) => {
          setMatchData(res.data.data);
          setIsLoadings(false);
          setVisible(true);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
    if (props.type === "live") {
      liveScorecardApi(match_id)
        .then((res) => {
          setScorecardData(res.data.data);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
    if (props.type === "recent") {
      recentScorecardApi(match_id)
        .then((res) => {
          setScorecardData(res.data.data);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
    if (props.type === "live") {
      livePlayersApi(match_id)
        .then((res) => {
          setPlayingXIData(res.data.data);
          setVisibles(true);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
    if (props.type === "recent") {
      recentPlayersApi(match_id)
        .then((res) => {
          setPlayingXIData(res.data.data);
          setVisibles(true);
          setVisiblePlayingXI(true);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
    if (props.type === "upcoming") {
      upcomingMatchByIdApi(match_id)
        .then((res) => {
          setMatchData(res.data.data);
          setUpcomingData(res.data.data);
          setVisible(true);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
  }, [visiblePlayingXI, props.type, match_id, latest_inning_number]);


  var myKeys = Object.keys(commentaryData);
  var arr = [];
  for (let i = myKeys.length - 1; i >= 0; i--) {
    let temp = {};
    temp[myKeys[i]] = commentaryData[myKeys[i]];
    arr.push(temp);
  }

  return (
    <>
      <div className={styles.commentary_recent_section}>
        <div className={styles.H3}>
          <div className={`${styles.head} mt-3`}>
            <div>
              <h3 className={styles.H3}>Match Stream</h3>
            </div>
          </div>

          <div className="row gx-0">
            <div className={`col-md-8 col-xs-12 ${styles.height - styles}`}>
              <div
                className={
                  (props.type === "live" || props.type === "recent") &&
                  Object.keys(commentaryData).length !== 0
                    ? styles.cont_live
                    : `${styles.cont} border border-dark`
                }
                style={{
                  overflow: isScrolling === true ? "scroll" : "clip",
                  height:
                    isScrolling === true
                      ? "2200px"
                      : Object.keys(commentaryData).length !== 0
                      ? "1689px"
                      : "500px",
                }}
              >
                {props.type !== "upcoming" ? (
                  <>
                    {(props.type === "live" || props.type === "recent") &&
                    Object.keys(commentaryData).length !== 0 ? (
                      isLoading === true ? //     loading={isLoading} //     color={"var(--primary)"} //   <ClipLoader // <div className="loader">
                      //     size={30}
                      //   />
                      // </div>
                      null : Object.keys(commentaryData).length !== 0 ? (
                        <>
                          {visibleBox === true &&
                            visible === true &&
                            arr.slice(2).map((item, index) => {
                              return (
                                <div key={index}>
                                  <CommentaryBoxRecent data={item} />
                                </div>
                              );
                            })}
                        </>
                      ) : //  (
                      //   <>
                      //     <p className="">NO</p>
                      //     <h1 className="">COMMENTARY</h1>
                      //   </>
                      // )
                      null
                    ) : //  (
                    //   <>
                    //     <p className="">No</p>
                    //     <h1 className="">COMMENTARY</h1>
                    //   </>
                    // )
                    null}
                  </>
                ) : (
                  <>
                    <p className="">Match Start</p>
                    <h1 style={{ textAlign: "center" }}>
                      {upcomingData === undefined ? "-" : upcomingData.title}
                    </h1>
                  </>
                )}
              </div>

              {(props.type === "live" || props.type === "recent") &&
              Object.keys(commentaryData).length !== 0 ? (
                <div className={styles.more}>
                  <h5
                    className={styles.show_more}
                    onClick={handleOnClickShowMore}
                  >
                    {isScrolling === false ? (
                      <div>
                        showMore
                        <AiFillCaretDown
                          style={{ fontSize: "18px", verticalAlign: "bottom" }}
                        />
                      </div>
                    ) : (
                      <div>
                        showLess
                        <AiFillCaretUp
                          style={{ fontSize: "18px", verticalAlign: "bottom" }}
                        />
                      </div>
                    )}
                  </h5>
                </div>
              ) : null}
            </div>

            <div className={`col-md-4 col-xs-12 ${styles.tab}`}>
              {matchData === undefined ? null : (
                <div
                  className={`row ${styles.marginX} ${styles.custom_margin_right}`}
                >
                  {/* <div className="table "> */}
                  <div className={styles.table}>
                    <div className={styles.thName}>
                      <h5>match_details</h5>
                    </div>

                    {isLoadings === true ? //     loading={isLoadings} //     color={"var(--primary)"} //   <ClipLoader // <div className="loader">
                    //     size={30}
                    //   />
                    // </div>
                    null : visible === true ? (
                      <div style={{ padding: "7px" }}>
                        <div className={`row ${styles.tbrow}`}>
                          <div className="col-4 ">Tournament</div>
                          <div className={`col-8 ${styles.tbrow1}`}>
                            {matchData.title}
                          </div>
                        </div>
                        <div className={`row ${styles.tbrow}`}>
                          <div className="col-4 ">Match</div>
                          <div className={`col-8 ${styles.tbrow1}`}>
                            {matchData.toss.text === "" ||
                            matchData.toss.text === undefined
                              ? "-"
                              : matchData.toss.text}
                          </div>
                        </div>
                        <div className={`row ${styles.tbrow}`}>
                          <div className="col-4 ">Venue</div>
                          <div className={`col-8 ${styles.tbrow1}`}>
                            {matchData.venue.name}, {matchData.venue.location},{" "}
                            {matchData.venue.country}
                          </div>
                        </div>
                        <div className={`row ${styles.tbrow}`}>
                          <div className="col-4 ">Umpires</div>
                          <div className={`col-8 ${styles.tbrow1}`}>
                            {props.type === "live"
                              ? matchData.umpires === ""
                                ? "-"
                                : matchData.umpires
                              : props.type === "recent"
                              ? matchData.livedata.response.umpires === ""
                                ? "-"
                                : matchData.livedata.response.umpires
                              : "--"}
                          </div>
                        </div>
                        <div className={`row ${styles.tbrow}`}>
                          <div className="col-4 ">Referee</div>
                          <div className={`col-8 ${styles.tbrow1}`}>
                            {props.type === "live"
                              ? matchData.referee === ""
                                ? "-"
                                : matchData.referee
                              : props.type === "recent"
                              ? matchData.livedata.response.referee === ""
                                ? "-"
                                : matchData.livedata.response.referee
                              : "--"}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  {/* </div> */}
                </div>
              )}

              {props.type === "upcoming" ||
              latest_inning_number === "null" ||
              Object.keys(scorecardData).length === 0 ? null : (
                <div
                  // style={{
                  //   display:
                  //     Object.keys(scorecardData.innings_data).length !== 0
                  //       ? "block"
                  //       : "none",
                  // }}
                  className={`mt-4 ${styles.marginX} ${styles.custom_margin_right}`}
                >
                  <h4 style={{ fontWeight: "700" }}>match_Summary</h4>
                  {Object.keys(scorecardData.innings_data).length ===
                  0 ? null : (
                    <div className={styles.secondtable}>
                      {visible === true &&
                        Object.keys(scorecardData.innings_data).map(
                          (item, index) => {
                            return (
                              <div key={index}>
                                <div className="pt-2">
                                  <p>{item}</p>
                                </div>
                                {scorecardData.innings_data[item].fows.map(
                                  (item2, index2) => {
                                    return (
                                      <div
                                        key={index2}
                                        style={{
                                          fontSize: 16,
                                          fontWeight: "200",
                                        }}
                                      >
                                        {item2.number}
                                        {item2.number === 1
                                          ? "st"
                                          : item2.number === 2
                                          ? "nd"
                                          : item2.number === 3
                                          ? "rd"
                                          : "th"}{" "}
                                        Wicket:&nbsp;
                                        {item2.score_at_dismissal}/
                                        {item2.number} ({item2.name},{" "}
                                        {item2.overs_at_dismissal})
                                        <hr className={styles.line} />
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            );
                          }
                        )}
                    </div>
                  )}
                </div>
              )}

              {/* {props.type === "upcoming" ? (
              upcomingData !== undefined &&
              upcomingData.teamb_player.squads.length !== 0 &&
              upcomingData.teama_players.squads.length !== 0 ? (
                <div>
                  <div className=" col rightTable mx-4 mt-4 marginX custom_margin_right">
                    <h4>Squad</h4>
                  </div>

                  <div className="playingxiTable mx-4 marginX custom_margin_right">
                    {matchData === undefined ? null : (
                      <div className="playingxi">
                        <div className="teamA">
                          <div className="logo">
                            <img
                              src={
                                matchData.teama.logo_url === "" ||
                                matchData.teama.logo_url.includes("/") === false
                                  ? noFlag
                                  : matchData.teama.logo_url
                              }
                              alt="images"
                            />
                            <p>{matchData.teama.name}</p>
                          </div>
                          <div className="playersLeft">
                            {visible === true &&
                              upcomingData !== undefined &&
                              upcomingData.teama_players.squads.length !== 0 &&
                              upcomingData.teama_players.squads
                                // .filter((user) => user.playing11 === "true")
                                .map((item, index) => {
                                  return (
                                    <div key={index} className="columns">
                                      {item.role_str === "(WK)" ? (
                                        <div className="playerpositionWicket">
                                          Wk
                                        </div>
                                      ) : item.role_str === "(C)" ? (
                                        <div className="playerpositionCaption">
                                          C
                                        </div>
                                      ) : null}
                                      <img
                                        src={require("../../../assets/Images/no-player.png")}
                                        alt="images"
                                      />
                                      <p>{item.name}</p>
                                    </div>
                                  );
                                })}
                          </div>
                        </div>
                        <div className="TeamB">
                          <div className="logo">
                            <img
                              src={
                                matchData.teamb.logo_url === "" ||
                                matchData.teamb.logo_url.includes("/") === false
                                  ? noFlag
                                  : matchData.teamb.logo_url
                              }
                              alt="images"
                            />
                            <p>{matchData.teamb.name}</p>
                          </div>
                          <div className="playersRight">
                            {visible === true &&
                              upcomingData !== undefined &&
                              upcomingData.teamb_player.squads.length !== 0 &&
                              upcomingData.teamb_player.squads
                                // .filter((user) => user.playing11 === "true")
                                .map((item, index) => {
                                  return (
                                    <div key={index} className="columns">
                                      {item.role_str === "(WK)" ? (
                                        <div className="playerpositionWicket">
                                          Wk
                                        </div>
                                      ) : item.role_str === "(C)" ? (
                                        <div className="playerpositionCaption">
                                          C
                                        </div>
                                      ) : null}
                                      <img
                                        src={require("../../../assets/Images/no-player.png")}
                                        alt="images"
                                      />
                                      <p>{item.name}</p>
                                    </div>
                                  );
                                })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : null
            ) : ( */}
              <div>
                <div
                  className={`col ${styles.rightTable} mx-4 mt-4 ${styles.marginX} ${styles.custom_margin_right}`}
                >
                  <h4 style={{ fontWeight: "700" }}>Playing XI</h4>
                </div>

                <div
                  className={`${styles.playingxiTable}  mx-4 ${styles.marginX} ${styles.custom_margin_right}`}
                >
                  {matchData === undefined ? null : (
                    <div className={styles.playingxi}>
                      <div className={styles.teamA}>
                        <div className={styles.logo}>
                          <Image
                            src={matchData.teama.logo_url}
                            alt="images"
                            width={100}
                            height={20}
                          />
                          <p>{matchData.teama.name}</p>
                        </div>
                        <div className={styles.playersLeft}>
                          {visibles === true &&
                            visiblePlayingXI === true &&
                            Object.keys(playingXIData.players_data).map(
                              (item, index) => {
                                return (
                                  index === 1 &&
                                  playingXIData.players_data[item]
                                    .filter((user) => user.playing11 === "true")
                                    .map((item2, index2) => {
                                      return (
                                        <div
                                          key={index2}
                                          className={styles.columns}
                                        >
                                          {item2.role_str === "(WK)" ? (
                                            <div
                                              className={
                                                styles.playerpositionWicket
                                              }
                                            >
                                              Wk
                                            </div>
                                          ) : item2.role_str === "(C)" ? (
                                            <div
                                              className={
                                                styles.playerpositionCaption
                                              }
                                            >
                                              C
                                            </div>
                                          ) : null}
                                          <Image
                                            src="../../public/no-player.png"
                                            alt="images"
                                            width={20}
                                            height={20}
                                          />
                                          <p>{item2.name}</p>
                                        </div>
                                      );
                                    })
                                );
                              }
                            )}
                        </div>
                      </div>
                      <div className={styles.TeamB}>
                        <div className={styles.logo}>
                          <Image
                            src={matchData.teamb.logo_url}
                            alt="images"
                            width={100}
                            height={20}
                          />
                          <p>{matchData.teamb.name}</p>
                        </div>
                        <div className={styles.playersRight}>
                          {visibles === true &&
                            Object.keys(playingXIData.players_data).map(
                              (item, index) => {
                                return (
                                  index === 0 &&
                                  playingXIData.players_data[item]
                                    .filter((user) => user.playing11 === "true")
                                    .map((item2, index2) => {
                                      return (
                                        <div
                                          key={index2}
                                          className={styles.columns}
                                        >
                                          {item2.role_str === "(WK)" ? (
                                            <div
                                              className={
                                                styles.playerpositionWicket
                                              }
                                            >
                                              Wk
                                            </div>
                                          ) : item2.role_str === "(C)" ? (
                                            <div
                                              className={
                                                styles.playerpositionCaption
                                              }
                                            >
                                              C
                                            </div>
                                          ) : null}
                                          <Image
                                            src="../../public/no-player.png"
                                            alt="images"
                                            width={20}
                                            height={20}
                                          />
                                          <p>{item2.name}</p>
                                        </div>
                                      );
                                    })
                                );
                              }
                            )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* )} */}
            </div>
          </div>
        </div>

        {/* /////////////////////////////////////////////// */}
      </div>
    </>
  );
};

export default CommentaryRecent;
