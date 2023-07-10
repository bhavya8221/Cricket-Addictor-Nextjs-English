import React, { useState, useRef, useEffect } from "react";
// import { Calendar } from "react-multi-date-picker";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./LiveScore.module.scss";
import { FcFilledFilter } from "react-icons/fc";
 
import { AiFillCaretUp } from "react-icons/ai";
import { useRouter } from "next/router";

function LiveScore() {
  const router = useRouter();
  const pathname = router.asPath;
  const navigate = router.replace;
  const [activeDiv, setactiveDiv] = useState(1);
  const [Teams, setTeams] = useState();
  const [MatchType, setMatchType] = useState();
  const [dates, setDates] = useState();
  const [score, setScore] = useState("Live");
  const calendarRef = useRef();
  const MatchTypes = ["TEST", "ODI", "T20", "Domestic"];
  const [matchFilter, setMatchFilter] = useState("all");
  // const [filterButtonActive, setFilterButtonActive] = useState(false);

  const AllTeams = [
    "Australia",
    "India",
    "England",
    "Pakistan",
    "West Indies",
    "Zimbabwe",
    "South Africa",
    "New Zealand",
    "Sri Lanka",
    "Bangladesh",
    "Afghanistan",
  ];

  function handleAllFilter() {
    // setFilterButtonActive(true);
    setMatchFilter("all");
    if (score === "Live") {
      navigate(`/cricket-live-score/live-matches/all/`);
    }
    if (score === "Recent") {
      navigate(
        `/cricket-live-score/recent-matches/${Teams}/${MatchType}/${dates}/all/`
      );
    }
    if (score === "Upcoming") {
      navigate(`/cricket-live-score/upcoming-matches/all/`);
    }
  }

  function handleInternationalFilter() {
    // setFilterButtonActive(true);
    setMatchFilter("international");
    if (score === "Live") {
      navigate(`/cricket-live-score/live-matches/international/`);
    }
    if (score === "Recent") {
      navigate(
        `/cricket-live-score/recent-matches/${Teams}/${MatchType}/${dates}/international/`
      );
    }
    if (score === "Upcoming") {
      navigate(`/cricket-live-score/upcoming-matches/international/`);
    }
  }

  function handleDomesticFilter() {
    // setFilterButtonActive(true);
    setMatchFilter("domestic");
    if (score === "Live") {
      navigate(`/cricket-live-score/live-matches/domestic/`);
    }
    if (score === "Recent") {
      navigate(
        `/cricket-live-score/recent-matches/${Teams}/${MatchType}/${dates}/domestic/`
      );
    }
    if (score === "Upcoming") {
      navigate(`/cricket-live-score/upcoming-matches/domestic/`);
    }
  }
  function handleLeagueFilter() {
    // setFilterButtonActive(true);
    setMatchFilter("league");
    if (score === "Live") {
      navigate(`/cricket-live-score/live-matches/league/`);
    }
    if (score === "Recent") {
      navigate(
        `/cricket-live-score/recent-matches/${Teams}/${MatchType}/${dates}/league/`
      );
    }
    if (score === "Upcoming") {
      navigate(`/cricket-live-score/upcoming-matches/league/`);
    }
  }
  function handleClick(value) {
    setactiveDiv(value);
  }
  function handleClickMatches(value) {
    setMatchType(value);
  }
  function OnClickTeams(value) {
    setTeams(value);
  }

  function handleOnClickLive() {
    setScore("Live");
    navigate(`/cricket-live-score/live-matches/${matchFilter}/`);
  }
  function handleOnClickRecent() {
    setScore("Recent");
    navigate(
      `/cricket-live-score/recent-matches/${Teams}/${MatchType}/${dates}/${matchFilter}/`
    );
  }
  function handleOnClickUpcoming() {
    setScore("Upcoming");
    navigate(`/cricket-live-score/upcoming-matches/${matchFilter}/`);
  }

  function onDateChange(e) {
    setDates(`${e.year}-${e.month.number}-${e.day}`);
  }
  function onReset() {
    setTeams();
    setMatchType();
    setDates();
    navigate(
      `/cricket-live-score/recent-matches/${undefined}/${undefined}/${undefined}/${matchFilter}/`
    );
  }
  function onApply() {
    navigate(
      `/cricket-live-score/recent-matches/${Teams}/${MatchType}/${dates}/${matchFilter}/`
    );
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (
      pathname.split("/")[3] === "live-matches" ||
      pathname.split("/")[2] === "live-matches"
    ) {
      setScore("Live");
    }
    if (
      pathname.split("/")[3] === "recent-matches" ||
      pathname.split("/")[2] === "recent-matches"
    ) {
      setScore("Recent");
    }
    if (
      pathname.split("/")[3] === "upcoming-matches" ||
      pathname.split("/")[2] === "upcoming-matches"
    ) {
      setScore("Upcoming");
    }
    if (pathname.split("/")[4] === "all") {
      setMatchFilter("all");
    }
    if (pathname.split("/")[4] === "international") {
      setMatchFilter("international");
    }
    if (pathname.split("/")[4] === "league") {
      setMatchFilter("league");
    }
    if (pathname.split("/")[4] === "domestic") {
      setMatchFilter("domestic");
    }
    if (window.innerWidth <= 767) {
      setShow(true);
    }
  }, []);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <div className={styles.liveScore_section}>
        {pathname.split("/")[3] === "all" ||
        pathname.split("/")[3] === "international" ||
        pathname.split("/")[3] === "league" ||
        pathname.split("/")[3] === "domestic" ||
        pathname.split("/")[6] === "all" ||
        pathname.split("/")[6] === "international" ||
        pathname.split("/")[6] === "league" ||
        pathname.split("/")[6] === "domestic" ? (
          <div
            className={styles.btns}
            style={{
              justifyContent:
                pathname === "/cricket-live-score/live-matches/all/"
                  ? "inherit"
                  : "space-between",
            }}
          >
            <div className={styles.ScoreFilterrr}>
              <div className={styles.scoretype}>
                <div className={styles.ScoreType_name}>
                  <h5
                    className={styles.ScoreType_name_list}
                    style={{
                      backgroundColor: score === "Live" ? null : "unset",
                      color: score === "Live" ? "var(--primary)" : "white",
                    }}
                    onClick={handleOnClickLive}
                  >
                    live
                  </h5>
                  {score === "Live" ? (
                    <AiFillCaretUp
                      className={`${styles.downarrow} ${styles.livearrow}`}
                      size={16}
                      color="rgba(255, 80, 2, 0.5)"
                    />
                  ) : null}
                </div>
                <div className={styles.ScoreType_name}>
                  <h5
                    className={styles.ScoreType_name_list}
                    style={{
                      backgroundColor: score === "Recent" ? null : "unset",
                      color: score === "Recent" ? "var(--primary)" : "white",
                    }}
                    onClick={handleOnClickRecent}
                  >
                    completed
                  </h5>
                  {score === "Recent" ? (
                    <AiFillCaretUp
                      className={`${styles.downarrow} ${styles.recentarrow}`}
                      size={16}
                      color="rgba(255, 80, 2, 0.5)"
                    />
                  ) : null}
                </div>
                <div className={styles.ScoreType_name}>
                  <h5
                    className={styles.ScoreType_name_list}
                    style={{
                      backgroundColor: score === "Upcoming" ? null : "unset",
                      color: score === "Upcoming" ? "var(--primary)" : "white",
                    }}
                    onClick={handleOnClickUpcoming}
                  >
                    upcoming
                  </h5>
                  {score === "Upcoming" ? (
                    <AiFillCaretUp
                      className={`${styles.downarrow} ${styles.recentarrow}`}
                      size={16}
                      color="rgba(255, 80, 2, 0.5)"
                    />
                  ) : null}
                </div>
              </div>

              {(pathname ===
                `/cricket-live-score/recent-matches/${Teams}/${MatchType}/${dates}/${matchFilter}/` ||
                pathname ===
                  `/cricket-live-score/live-matches/${matchFilter}/` ||
                pathname ===
                  `/cricket-live-score/upcoming-matches/${matchFilter}/`) &&
              show === false ? (
                <div className={styles.filterForAll} onClick={handleShow}>
                  <div>
                    <FcFilledFilter />
                  </div>
                  <p>Filter</p>
                </div>
              ) : null}

              {((pathname ===
                `/cricket-live-score/recent-matches/${Teams}/${MatchType}/${dates}/${matchFilter}/` ||
                pathname ===
                  `/cricket-live-score/live-matches/${matchFilter}/` ||
                pathname ===
                  `/cricket-live-score/upcoming-matches/${matchFilter}/`) &&
                show === true) ||
              window.innerWidth < 767 ? (
                <div className={styles.filterTypeForAll}>
                  <div className={styles.filtertypename}>
                    <li
                      style={{
                        textDecoration:
                          matchFilter === "all"
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
              ) : null}
            </div>
            {pathname ===
            `/cricket-live-score/recent-matches/${Teams}/${MatchType}/${dates}/${matchFilter}/` ? (
              <button
                className={styles.filterBtn}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <img
                  className={styles.vectorIcon}
                  src="../../../assets/Images/FilterIcon.png"
                  alt="images"
                />
                <p className={styles.btnText}>Filters</p>
              </button>
            ) : null}
          </div>
        ) : null}

        <div className={styles.custom_margin}>{/* <Outlet /> */}</div>

        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div
                className="modal-body"
                style={{
                  paddingBottom: "0%",
                  paddingTop: "2%",
                  paddingRight: "0",
                }}
              >
                <div className={styles.Top}>
                  <div className={styles.TopText}>
                    <p>
                      <img
                        className={styles.FilterIcon}
                        src="../../../assets/Images/FilterIcon.png"
                        alt="images"
                      />
                      Filter
                    </p>
                  </div>
                  <div className="closeBtn">
                    <button
                      type="button"
                      className="btn btn-danger "
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      x
                    </button>
                  </div>
                </div>
                <div className={styles.mid}>
                  <div className={styles.leftCol}>
                    <ul>
                      <li
                        className={styles["List-items"]}
                        style={{
                          backgroundColor:
                            activeDiv === 1 ? "var(--primary)" : null,
                          color: activeDiv === 1 ? "white" : null,
                        }}
                        onClick={() => handleClick(1)}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <p className={styles.p}>Match Type</p>
                          <p className={styles.p} style={{ fontSize: 10 }}>
                            {MatchType}
                          </p>
                        </div>
                        <div style={{ marginRight: 5 }}>
                          <img
                            className={styles.ArrowIcon}
                            style={{
                              filter: activeDiv === 1 ? " invert(0%)" : null,
                            }}
                            src="../../../assets/Images/FilterArrow.png"
                            alt="images"
                          />
                        </div>
                      </li>
                      <li
                        className={styles["List-items"]}
                        style={{
                          backgroundColor:
                            activeDiv === 2 ? "var(--primary)" : null,
                          color: activeDiv === 2 ? "white" : null,
                        }}
                        onClick={() => handleClick(2)}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <p className={styles.p}>Team</p>
                          <p className={styles.p} style={{ fontSize: 10 }}>
                            {Teams}
                          </p>
                        </div>
                        <div style={{ marginRight: 5 }}>
                          <img
                            className={styles.ArrowIcon}
                            style={{
                              filter: activeDiv === 2 ? " invert(0%)" : null,
                            }}
                            src="../../../assets/Images/FilterArrow.png"
                            alt="images"
                          />
                        </div>
                      </li>
                      <li
                        className={styles["List-items"]}
                        style={{
                          backgroundColor:
                            activeDiv === 3 ? "var(--primary)" : null,
                          color: activeDiv === 3 ? "white" : null,
                        }}
                        onClick={() => handleClick(3)}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <p className={styles.p}>Date</p>
                          <p className={styles.p} style={{ fontSize: 10 }}>
                            {dates}
                          </p>
                        </div>
                        <div className={styles.calenderLogo}>
                          <img
                            src="../../../assets/Images/calender.png"
                            style={{
                              filter: activeDiv === 3 ? null : " invert(100%)",
                            }}
                            alt="images"
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.rightCol}>
                      <div className={activeDiv === 1 ? styles.first  : styles.firstHide}>
                        <ul className={styles.RightUl}>
                          {MatchTypes.map((item, index) => {
                            return (
                              <li
                                key={item}
                                className={styles.RightItems}
                                style={{
                                  backgroundColor:
                                    MatchType === MatchTypes[index]
                                      ? "var(--primary)"
                                      : null,
                                  color:
                                    MatchType === MatchTypes[index]
                                      ? "white"
                                      : null,
                                }}
                                onClick={() =>
                                  handleClickMatches(MatchTypes[index])
                                }
                              >
                                {MatchTypes[index]}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div
                        className={activeDiv === 2 ? styles.second  : styles.secondHide}
                      >
                        <ul className={styles.ul}>
                          {AllTeams.map((item, index) => {
                            return (
                              <div
                                key={item}
                                className={styles.TeamLogo}
                                style={{
                                  backgroundColor:
                                    Teams === AllTeams[index]
                                      ? "var(--primary)"
                                      : null,
                                  color:
                                    Teams === AllTeams[index] ? "white" : null,
                                }}
                                onClick={() => OnClickTeams(AllTeams[index])}
                              >
                                <div className={styles.logo}>
                                  <img
                                    src="../../../assets/Images/IndiaVectorIcon.png"
                                    alt="images"
                                  />
                                </div>
                                <li className={styles.li}>{AllTeams[index]}</li>
                              </div>
                            );
                          })}
                        </ul>
                      </div>
                      <div className={activeDiv === 3 ? styles.third  : styles.thirdHide}>
                        <Calendar
                          onChange={(e) => onDateChange(e)}
                          ref={calendarRef}
                        />
                      </div>
                    </div>
                    <div className={styles.bottomBtn}>
                      <button
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => {
                          onReset();
                        }}
                      >
                        Reset
                      </button>
                      <button
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => {
                          onApply();
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LiveScore;
