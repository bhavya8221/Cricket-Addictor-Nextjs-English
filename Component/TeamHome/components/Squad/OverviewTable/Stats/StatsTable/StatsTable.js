import React, { useState, useEffect, useCallback } from "react";
import { Table } from "react-bootstrap";
 
import { lasrFivePerformance } from "../../../../../../../Constants/Api/Api";
import styles from "./statsTable.module.scss";
import { useRouter } from "next/router";
const StatsTable = () => {
   
  const router=useRouter()
  const {slug}=router.query
  // const { pid } = useParams();
  const [lastplayerdata, setLastPlayerData] = useState([]);
  const [matchType, setMatchType] = useState("Test");

  function handleOnClickTest() {
    setMatchType("Test");
  }
  function handleOnClickODI() {
    setMatchType("ODI");
  }
  function handleOnClickWorldCup() {
    setMatchType("World Cup");
  }
  function handleOnClickT20I() {
    setMatchType("T20I");
  }

  // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  useEffect(() => {
    lasrFivePerformance(slug[1], matchType, "1", "1")
      .then((res) => {
        
        setLastPlayerData(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);

      });
  }, [matchType,slug[1]]);

  return (
    <div className={styles.perFormanceTableContainer}>
      <div className={styles.div2}>
        <h5>Last 5 Performance</h5>
      </div>
      <div className={styles.MatchTypeConditionRow}>
        <div className={styles.MatchTypeCondition}>
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
          <div
            className={styles.MatchType}
            style={{
              backgroundColor: matchType === "World Cup" ? "white" : "unset",
            }}
            onClick={() => handleOnClickWorldCup()}
          >
            World Cup
          </div>
          <div
            className={styles.MatchType}
            style={{
              backgroundColor: matchType === "T20I" ? "white" : "unset",
            }}
            onClick={() => handleOnClickT20I()}
          >
            T20I
          </div>
        </div>
      </div>
      <Table className={styles.Performance_table}>
        <thead className={styles.Performance_table_header}>
          <tr>
            <th>Batting</th>
            <th>Bowling</th>
            <th>Opposition</th>
            <th>Match Date</th>
          </tr>
        </thead>
        {lastplayerdata.length === 0 ? (
          <>data not available</>
        ) : (
          lastplayerdata.map((item, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>{item.Batting.length === 0 ? "--" : item.Batting}</td>
                  <td> {item.Bowling.length === 0 ? "--" : item.Bowling}</td>
                  <td>{item.opposition}</td>
                  <td>{item.Match_Date}</td>
                </tr>
              </tbody>
            );
          })
        )}
      </Table>
    </div>
  );
};

export default StatsTable;
