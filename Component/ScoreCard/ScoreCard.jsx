import React, { useEffect, useState, useCallback } from "react";
import styles from "./ScoreCard.module.scss";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { liveScorecardApi } from "../../Constants/Api/Api";
import { recentScorecardApi } from "../../Constants/Api/Api";
import { Table } from "@nextui-org/react";

function ScoreCard(props) {
  const router = useRouter();
  const { slug } = router.query;
  const match_id = slug === undefined ? null : slug[0];
  const [scorecardData, setScorecardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  useEffect(() => {
    if (props.type === "live") {
      setIsLoading(true);
      liveScorecardApi(match_id)
        .then((res) => {
          setScorecardData(res.data.data);
          setIsLoading(false);
          setVisible(true);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
    if (props.type === "recent") {
      setIsLoading(true);
      recentScorecardApi(match_id)
        .then((res) => {
          setScorecardData(res.data.data);
          setIsLoading(false);
          setVisible(true);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
  }, [props.type, match_id]);



  return (
    <>
      {isLoading === true ? null : scorecardData.length === 0 ? null : ( // </div> //   <ClipLoader color={"var(--primary)"} loading={isLoading} size={30} /> // <div className="loader">
        <div>
          {/* <div className="Siderbtn">
            <div className="Menu">
              <p>India Women</p>
              <p>Shri Lanka Women</p>
            </div>
          </div> */}
          {visible === true &&
          Object.keys(scorecardData.innings_data).length === 0
            ? null
            : visible === true &&
              Object.keys(scorecardData.innings_data).map((item, index) => {
                return (
                  <div key={index}>
                    <div className={styles.parent_score}>
                      <div className={styles.top}>
                        <div className={styles.heading}>
                          <p>{item}</p>
                        </div>
                      </div>
                      <div className={styles.TableMain}>
                        <table className="table  table-borderless">
                          <thead>
                            <tr className={styles.TableHead}>
                              <th className="col-3">BATSMEN</th>
                              <th className="col-4"></th>
                              <div className={styles.display}>
                                <th className={`${styles.align} col-1 `}>
                                  RUNS
                                </th>
                                <th className={`${styles.align} col-1 `}>
                                  BALLS
                                </th>
                              </div>
                              <div className={styles.display1}>
                                <th className={`${styles.align} col-1 `}>R</th>
                                <th className={`${styles.align} col-1 `}>B</th>
                              </div>
                              <th className={`${styles.align} col-1 `}>SR</th>
                              <th className={`${styles.align} col-1 `}>4S</th>
                              <th className={`${styles.align} col-1 `}>6s</th>
                            </tr>
                          </thead>
                          <tbody>
                            {scorecardData.innings_data[item].batsmen.map(
                              (item2, index2) => {
                                return (
                                  <tr key={index2} className="row">
                                    <div className={styles.cd}>
                                      <th className="col-3">
                                        {item2.name === "" ? "-" : item2.name}
                                      </th>
                                      <td className="col-4 ">
                                        {item2.how_out === ""
                                          ? "-"
                                          : item2.how_out}
                                      </td>
                                    </div>
                                    <td className={`${styles.align} col-1 `}>
                                      {" "}
                                      {item2.runs === "" ? "-" : item2.runs}
                                    </td>
                                    <td className={`${styles.align} col-1 `}>
                                      {" "}
                                      {item2.balls_faced === ""
                                        ? "-"
                                        : item2.balls_faced}
                                    </td>
                                    <td className={`${styles.align} col-1 `}>
                                      {" "}
                                      {item2.strike_rate === ""
                                        ? "-"
                                        : item2.strike_rate}
                                    </td>
                                    <td className={`${styles.align} col-1 `}>
                                      {" "}
                                      {item2.fours === "" ? "-" : item2.fours}
                                    </td>
                                    <td className={`${styles.align} col-1 `}>
                                      {" "}
                                      {item2.sixes === "" ? "-" : item2.sixes}
                                    </td>
                                  </tr>
                                );
                              }
                            )}

                            <tr className={` row ${styles.Tablebottom}`}>
                              <div className="cd">
                                <th
                                  className="col-3"
                                  style={{ color: "white" }}
                                >
                                  TOTAL
                                </th>
                                <td className="col-4 ">
                                  (
                                  {
                                    scorecardData.innings_data[item].equations
                                      .wickets
                                  }{" "}
                                  wickets,{" "}
                                  {
                                    scorecardData.innings_data[item].equations
                                      .overs
                                  }{" "}
                                  overs )
                                </td>
                              </div>

                              <td
                                className={`col-1 ${styles.align} ${styles.hide}`}
                              >
                                {
                                  scorecardData.innings_data[item].equations
                                    .runs
                                }
                              </td>
                              <td className={`col-1 ${styles.align} ${styles.hide}`}>
                                RR{" "}
                                {
                                  scorecardData.innings_data[item].equations
                                    .runrate
                                }
                              </td>
                              <td className={`${styles.align} col-1 `}></td>
                              <td className={`${styles.align} col-1 `}></td>
                              <td className={`${styles.align} col-1 `}></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className={styles.TableMain}>
                        <table className="table  table-borderless">
                          <thead>
                            <tr className={styles.TableHead}>
                              <th className="col-3">BOWLER</th>
                              <th className="col-4"></th>
                              <th className={`${styles.align} col-1 `}>O</th>
                              <th className={`${styles.align} col-1 `}>R</th>
                              <th className={`${styles.align} col-1 `}>W</th>
                              <th className={`${styles.align} col-1 `}>ECON</th>
                              <th className={`${styles.align} col-1 `}>NB</th>
                            </tr>
                          </thead>
                          <tbody>
                            {scorecardData.innings_data[item].bowlers.map(
                              (item2, index2) => {
                                return (
                                  <tr key={index2} className="row">
                                    <div className="cd">
                                      <th className="col-3">
                                        {item2.name === "" ? "-" : item2.name}
                                      </th>
                                      <td className="col-4 "></td>
                                    </div>
                                    <td className={`${styles.align} col-1 `}>
                                      {item2.overs === "" ? "-" : item2.overs}
                                    </td>
                                    <td className={`${styles.align} col-1 `}>
                                      {item2.runs_conceded === ""
                                        ? "-"
                                        : item2.runs_conceded}
                                    </td>
                                    <td className={`${styles.align} col-1 `}>
                                      {item2.wickets === ""
                                        ? "-"
                                        : item2.wickets}
                                    </td>
                                    <td className={`${styles.align} col-1 `}>
                                      {item2.econ === "" ? "-" : item2.econ}
                                    </td>
                                    <td className={`${styles.align} col-1 `}>
                                      {" "}
                                      {item2.noballs === ""
                                        ? "-"
                                        : item2.noballs}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                            <tr className="row">
                              <div className={styles.cd}>
                                <th className="col-3"></th>
                                <td className="col-4 "></td>
                              </div>
                              <td className={`${styles.align} col-1 `}></td>
                              <td className={`${styles.align} col-1 `}></td>
                              <td className={`${styles.align} col-1 `}></td>
                              <td className={`${styles.align} col-1 `}></td>
                              <td className={`${styles.align} col-1 `}></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className={styles.TableMain}>
                        <table
                          className={`table ${styles.tableBottom}  table-borderless"`}
                          
                        >
                          <tbody>
                            <tr className={`row ${styles.TableHead}`}>
                              <th>FALL OF WICKETS</th>
                            </tr>
                            <tr className="row">
                              <td>
                                <div className={styles.div}>
                                  {scorecardData.innings_data[item].fows.map(
                                    (item2, index2) => {
                                      return (
                                        <div key={index2} className={styles.div2}>
                                          <b>
                                            {item2.score_at_dismissal}-
                                            {item2.number}{" "}
                                          </b>
                                          <p>
                                            {" "}
                                            ({item2.name},{" "}
                                            {item2.overs_at_dismissal} ov){" "}
                                          </p>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      )}
    </>
  );
}

export default ScoreCard;
