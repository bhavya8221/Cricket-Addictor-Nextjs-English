import React, { useState, useEffect, useCallback } from "react";
import styles from "../../../../../../styles/Table.module.scss";
import StatsTable from "./StatsTable/StatsTable";
import {
  TeamPlayerProfile,
  TeamStatsAPI,
} from "../../../../../../Constants/Api/Api";
import { Col, Row } from "react-bootstrap";

 
import { useRouter } from "next/router";

const Stats = () => {
   
  // const { pid ,tid} = useParams();
  const [teamStatsData, setTeamStatsData] = useState({});
  // const navigate = useNavigate();
  const [teamPlayerinfo, setTeamPlayerInfo] = useState({});
  const [matchCondition, setMatchCondition] = useState("against");
  const [matchType, setMatchType] = useState("Test");

  // const pathSegments = window.location.pathname.split("/");
  // const index = pathSegments.indexOf(tid);
  // if (index !== -1) {
  //   pathSegments.splice(index, 1);
  // }
  // const newPath = pathSegments.join("/");
 
  // const newUrl = window.location.origin + newPath + window.location.search;
  // window.history.replaceState({}, "", newUrl);
  // function handleOnClickAgainstOpposition() {
  //   setMatchCondition("against");
  // }
  // function handleOnClickLocationWiseStats() {
  //   setMatchCondition("Location Wise Stats");

  // }
  function handleOnClickYearWiseStats() {
    setMatchCondition("year");
  }
  function handleOnClickTest() {
    setMatchType("Test");
  }
  function handleOnClickODI() {
    setMatchType("ODI");
  }
  // function handleOnClickWorldCup() {
  //   setMatchType("World Cup");
  // }
  function handleOnClickT20I() {
    setMatchType("T20I");
  }
  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );
  const router = useRouter();
  const pathname = router.asPath;
  // useEffect(() => {
  //   TeamPlayerProfile(pid)
  //     .then((res) => {
  //       setTeamPlayerInfo(res.data.data);
  //     })
  //     .catch((e) => {
  //       // Navigation(e.code, e.message);
  //     });
  //   TeamStatsAPI(pid, matchType, matchCondition)
  //     .then((res) => {
  //       setTeamStatsData(res.data.data);
  //     })
  //     .catch((e) => {
  //       // Navigation(e.code, e.message);
  //     });
  // }, [ matchCondition, matchType]);

  return (
    <>
      <div className={styles.Tname}>
        <h5>
          {" "}
          {Object.keys(teamStatsData).length === 0
            ? "-"
            : teamPlayerinfo.title}{" "}
          Overall Stats
        </h5>
        <div className={styles.rightcol}>
          {Object.keys(teamStatsData).length === 0 ? (
            <div>data not available </div>
          ) : (
            <>
              <div className={styles.MatchConditionList}>
                <div
                  className={styles.MatchCondition}
                  style={{
                    backgroundColor:
                      matchCondition === "against" ? "white" : "unset",
                    color:
                      matchCondition === "against" ? "var(--primary)" : "unset",
                  }}
                  onClick={() => handleOnClickAgainstOpposition()}
                >
                  Against Opposition
                </div>
                {/* <div
                  className="MatchCondition"
                  style={{
                    backgroundColor:
                      matchCondition === "Location Wise Stats"
                        ? "white"
                        : "unset",
                    color:
                      matchCondition === "Location Wise Stats"
                        ? "var(--primary)"
                        : "unset",
                  }}
                  onClick={() => handleOnClickLocationWiseStats()}
                >
                  Location Wise Stats
                </div> */}
                <div
                  className={styles.MatchCondition}
                  style={{
                    backgroundColor:
                      matchCondition === "year" ? "white" : "unset",
                    color:
                      matchCondition === "year" ? "var(--primary)" : "unset",
                  }}
                  onClick={() => handleOnClickYearWiseStats()}
                >
                  Year Wise Stats
                </div>
              </div>
              <Row className={`${styles.MatchTypeConditionRowStats} ${styles.Heading}`}>
                <Col className={styles.MatchTypeCondition}>
                  <div
                    className={styles.MatchType}
                    style={{
                      backgroundColor: matchType === "Test" ? "white" : "unset",
                    }}
                    onClick={() => handleOnClickTest()}
                  >
                   TEST
                  </div>
                  <div
                    className={styles.MatchType}
                    style={{
                      backgroundColor: matchType === "ODI" ? "white" : "unset",
                    }}
                    onClick={() => handleOnClickODI()}
                  >
                    ODI
                  </div>
                  {/* <div
                    className={styles.MatchType}
                    style={{
                      backgroundColor:
                        matchType === "World Cup" ? "white" : "unset",
                    }}
                    onClick={() => handleOnClickWorldCup()}
                  >
                    World Cup
                  </div> */}
                  <div
                    className={styles.MatchType}
                    style={{
                      backgroundColor: matchType === "T20I" ? "white" : "unset",
                    }}
                    onClick={() => handleOnClickT20I()}
                  >
                    T20I
                  </div>
                </Col>
              </Row>
              <div className={styles.Heading}>
                <h5>Batting Fielding Performance</h5>
              </div>
              {Object.keys(teamStatsData).length === 0 ? (
                <div style={{ margin: "10px", textAlign: "center" }}>
                  <h4>
                    Batting Performance
                    data not available ...
                  </h4>
                </div>
              ) : (
                <div className={styles.Table_Stats}>
                  <table className={`${styles.table} ${styles.table-borderless}`}>
                    <thead>
                      <tr>
                        <th className="col "></th>
                        <th className="col">M</th>
                        <th className="col">INN</th>
                        <th className="col">N/O</th>
                        <th className="col">RUNS</th>
                        <th className="col">HS</th>
                        <th className="col">100s</th>
                        <th className="col">50s</th>
                        <th className="col">4s</th>
                        <th className="col">6s</th>
                        <th className="col">Avg</th>
                        <th className="col">SR</th>
                        <th className="col">Ct</th>
                        <th className="col">Ducks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(teamStatsData).map((item, index) => {
                        return (
                          <tr key={index}>
                            <th className={`row ${styles.TeamItem}`}>{item}</th>

                            <td>{teamStatsData[item].match}</td>
                            <td>{teamStatsData[item].innings}</td>
                            <td>{teamStatsData[item].not_out}</td>
                            <td>{teamStatsData[item].run}</td>
                            <td>{teamStatsData[item].hs}</td>
                            <td>{teamStatsData[item]["100s"]}</td>
                            <td>{teamStatsData[item]["50s"]}</td>
                            <td>{teamStatsData[item]["4s"]}</td>
                            <td>{teamStatsData[item]["6s"]}</td>
                            <td>{teamStatsData[item].avg}</td>
                            <td>{teamStatsData[item].strike_rate}</td>
                            <td>{teamStatsData[item].ct}</td>
                            <td>{teamStatsData[item].ducks}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              {/* <div className="Heading">
            <h5>Bowling Performance</h5>
          </div>
          <div className="Table_Stats">
          <table className="table  table-borderless ">
            <thead>
              <tr>
                <th className="col"></th>
                <th className="col">I</th>
                <th className="col">O</th>
                <th className="col">m</th>
                <th className="col">R</th>
                <th className="col">W</th>
                <th className="col">BEST</th>
                <th className="col">3W</th>
                <th className="col">5W</th>
                <th className="col">AVG</th>
                <th className="col">ER</th>
                <th className="col">SR</th>
                <th className="col">SN</th>
                <th className="col">TID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="row">Australia</th>
                <td>45</td>
                <td>77</td>
                <td>09</td>
                <td>3137</td>
                <td>212</td>
                <td>4646.13</td>
                <td>5625</td>
                <td>5555.77</td>
                <td>08</td>
                <td>01</td>
                <td>14</td>
                <td>335</td>
                <td>64</td>
              </tr>
              <tr>
                <th className="row">Bangladesh</th>
                <td>233</td>
                <td>226</td>
                <td>33</td>
                <td>9376</td>
                <td>264</td>
                <td>48.58</td>
                <td>10513</td>
                <td>89.18</td>
                <td>29</td>
                <td>03</td>
                <td>45</td>
                <td>855</td>
                <td>250</td>
              </tr>
              <tr>
                <th className="row">England</th>
                <td>233</td>
                <td>226</td>
                <td>33</td>
                <td>9376</td>
                <td>264</td>
                <td>48.58</td>
                <td>10513</td>
                <td>89.18</td>
                <td>29</td>
                <td>03</td>
                <td>45</td>
                <td>855</td>
                <td>250</td>
              </tr>
              <tr>
                <th className="row">New Zealand</th>
                <td>233</td>
                <td>226</td>
                <td>33</td>
                <td>9376</td>
                <td>264</td>
                <td>48.58</td>
                <td>10513</td>
                <td>89.18</td>
                <td>29</td>
                <td>03</td>
                <td>45</td>
                <td>855</td>
                <td>250</td>
              </tr>
            </tbody>
          </table> 
          </div>
          */}
            </>
          )}
        </div>
        <StatsTable />
      </div>
    </>
  );
};
export default Stats;
