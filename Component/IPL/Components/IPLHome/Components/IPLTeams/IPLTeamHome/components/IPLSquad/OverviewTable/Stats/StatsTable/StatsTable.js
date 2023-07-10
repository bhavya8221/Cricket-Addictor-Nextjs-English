import React, { useState, useEffect, useCallback } from "react";
import { Table } from "react-bootstrap";
 
import { useNavigate, useParams } from "react-router-dom";
import { LasrFivePerformance } from "../../../../../../../Constants/Api/Api";
import "./statsTable.scss";
const StatsTable = () => {
  const { pid } = useParams();
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
    LasrFivePerformance(pid, matchType, "1", "1")
      .then((res) => {
        setLastPlayerData(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [matchType, pid]);

  return (
    <div className="perFormanceTableContainer">
      <div className="div2">
        <h5>Last 5 Performance</h5>
      </div>
      <div className="MatchTypeConditionRow">
        <div className="MatchTypeCondition">
          <div
            className="MatchType"
            style={{
              backgroundColor: matchType === "Test" ? "white" : "unset",
            }}
            onClick={() => handleOnClickTest()}
          >
     TEST
          </div>
          <div
            className="MatchType"
            style={{
              backgroundColor: matchType === "ODI" ? "white" : "unset",
            }}
            onClick={() => handleOnClickODI()}
          >
           ODI
          </div>
          <div
            className="MatchType"
            style={{
              backgroundColor: matchType === "World Cup" ? "white" : "unset",
            }}
            onClick={() => handleOnClickWorldCup()}
          >
       World Cup
          </div>
          <div
            className="MatchType"
            style={{
              backgroundColor: matchType === "T20I" ? "white" : "unset",
            }}
            onClick={() => handleOnClickT20I()}
          >
          T20I
          </div>
        </div>
      </div>
      <Table className="Performance_table">
        <thead className="Performance_table_header">
          <tr>
            <th>Batting</th>
            <th>Bowling</th>
            <th>Opposition</th>
            <th>Match Date</th>
          </tr>
        </thead>
        {lastplayerdata.length === 0
          ? <>data not available</>
          : lastplayerdata.map((item, index) => {
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
            })}
      </Table>
    </div>
  );
};

export default StatsTable;
