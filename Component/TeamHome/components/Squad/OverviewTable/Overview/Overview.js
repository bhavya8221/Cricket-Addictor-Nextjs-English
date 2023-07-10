import React, { useCallback, useEffect, useState } from "react";
import styles from "../../../../../../styles/Table.module.scss";
 
import { teamPlayerProfile } from "../../../../../../Constants/Api/Api";
import { useRouter } from "next/router";
const Overviewcom = () => {
  const router = useRouter();
   
  const {slug} = router.query;
  const [playerdata, setPlayerData] = useState({});
  const [playerBattingdata, setplayerBattingdata] = useState({});
  const [playerBowlingdata, setplayerBowlingdata] = useState([]);

  // const pathSegments = window.location.pathname.split("/");
  // const index = pathSegments.indexOf(tid);
  // if (index !== -1) {
  //   pathSegments.splice(index, 1);
  // }
  // const newPath = pathSegments.join("/");

  // const newUrl = window.location.origin + newPath + window.location.search;
  // window.history.replaceState({}, "", newUrl);

  // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  const pathname = router.asPath;
  useEffect(() => {
    teamPlayerProfile(slug[1])
      .then((res) => {
       
        setPlayerData(res.data.data);
        setplayerBattingdata(res.data.data.Batting_Career_Summary);
        setplayerBowlingdata(res.data.data.Bowlling_Career_Summary);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [slug[1]]);

  return (
    <>
      <div className={styles.Tname}>
        {playerdata.length === 0 ? (
          "no data"
        ) : (
          <div className={styles.rightcolOverview}>
            <div className={styles.heading}>
              <h3>{playerdata.title}</h3>
              <div className={styles.line}></div>
            </div>
            <div>
              <ul>
                <li>
                  <p>
                    {playerdata.overview === "" || playerdata.overview === null
                      ? "No Description Data"
                      : playerdata.overview}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        )}
        <div className={styles.Head}>
          <div className={styles.h5}>
            <h5>Batting Career Summary</h5>
          </div>
          {Object.keys(playerBattingdata).length === 0 ? (
            <div style={{ margin: "10px", textAlign: "center" }}>
              <h4>
                {" "}
                Batting Performance data not available...
              </h4>
            </div>
          ) : (
            <div className={styles.Table_Stats}>
              <table className={styles["table table-borderless"]}>
                <thead>
                  <tr>
                    <th scope="col "></th>
                    <th scope="col">M</th>
                    <th scope="col">INN</th>
                    <th scope="col">No</th>
                    <th scope="col">RUNS</th>
                    <th scope="col">HS</th>
                    <th scope="col">AVG</th>
                    <th scope="col">BS</th>
                    <th scope="col">HR</th>
                    <th scope="col">100</th>
                    <th scope="col">200</th>
                    <th scope="col">50</th>
                    <th scope="col">4S</th>
                    <th scope="col">6S</th>
                  </tr>
                </thead>

                <tbody>
                  {Object.keys(playerBattingdata).map((item, index) => {
                    return (
                      <tr key={index}>
                        <th className="row">{item}</th>
                        <td>
                          {playerBattingdata[item].matches === ""
                            ? "-"
                            : playerBattingdata[item].matches}
                        </td>
                        <td>
                          {playerBattingdata[item].innings === ""
                            ? "-"
                            : playerBattingdata[item].innings}
                        </td>
                        <td>
                          {playerBattingdata[item].notout === ""
                            ? "-"
                            : playerBattingdata[item].notout}
                        </td>
                        <td>
                          {playerBattingdata[item].runs === ""
                            ? "-"
                            : playerBattingdata[item].runs}
                        </td>
                        <td>
                          {playerBattingdata[item].highest === ""
                            ? "-"
                            : playerBattingdata[item].highest}
                        </td>
                        <td>
                          {playerBattingdata[item].average === ""
                            ? "-"
                            : playerBattingdata[item].average}
                        </td>
                        <td>
                          {playerBattingdata[item].balls === ""
                            ? "-"
                            : playerBattingdata[item].balls}
                        </td>
                        {/* <td>{playerBattingdata[item].strike}</td>  */}
                        <td>-</td>
                        <td>
                          {playerBattingdata[item].run100 === ""
                            ? "-"
                            : playerBattingdata[item].run100}
                        </td>
                        <td>-</td>
                        <td>
                          {playerBattingdata[item].run50 === ""
                            ? "-"
                            : playerBattingdata[item].run50}
                        </td>
                        <td>
                          {playerBattingdata[item].run4 === ""
                            ? "-"
                            : playerBattingdata[item].run4}
                        </td>
                        <td>
                          {playerBattingdata[item].run6 === ""
                            ? "-"
                            : playerBattingdata[item].run6}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className={styles.h5}>
            <h5>Bowling Career Summary</h5>
          </div>
          {Object.keys(playerBowlingdata).length === 0 ? (
            <div style={{ margin: "10px", textAlign: "center" }}>
              <h4>
              Bowling Performance data not available...
              </h4>
            </div>
          ) : (
            <div className={styles.Table_Stats}>
              <table className={styles["table table-borderless Table_Stats"]}>
                <thead>
                  <tr>
                    <th scope="col "></th>
                    <th scope="col">M</th>
                    <th scope="col">INN</th>
                    <th scope="col">B</th>
                    <th scope="col">RUNS</th>
                    <th scope="col">WKTS</th>
                    <th scope="col">BBI</th>
                    <th scope="col">BBM</th>
                    <th scope="col">ECON</th>
                    <th scope="col">100</th>
                    <th scope="col">AVG</th>
                    <th scope="col">SR</th>
                    <th scope="col">5W</th>
                    <th scope="col">10W</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(playerBowlingdata).map((item, index) => {
                    return (
                      <tr key={index}>
                        <th className="row">{item}</th>
                        <td>
                          {playerBowlingdata[item].matches === ""
                            ? "-"
                            : playerBowlingdata[item].matches}
                        </td>
                        <td>
                          {playerBowlingdata[item].innings === ""
                            ? "-"
                            : playerBowlingdata[item].innings}
                        </td>
                        <td>
                          {playerBowlingdata[item].balls === ""
                            ? "-"
                            : playerBowlingdata[item].balls}
                        </td>
                        <td>
                          {playerBowlingdata[item].runs === ""
                            ? "-"
                            : playerBowlingdata[item].runs}
                        </td>
                        <td>
                          {playerBowlingdata[item].wickets === ""
                            ? "-"
                            : playerBowlingdata[item].wickets}
                        </td>
                        <td>
                          {playerBowlingdata[item].bestinning === ""
                            ? "-"
                            : playerBowlingdata[item].bestinning}
                        </td>
                        <td>
                          {playerBowlingdata[item].bestmatch === ""
                            ? "-"
                            : playerBowlingdata[item].bestmatch}
                        </td>
                        <td>
                          {playerBowlingdata[item].econ === ""
                            ? "-"
                            : playerBowlingdata[item].econ}
                        </td>
                        <td>
                          {playerBowlingdata[item].hattrick === ""
                            ? "-"
                            : playerBowlingdata[item].hattrick}
                        </td>
                        <td>
                          {playerBowlingdata[item].average === ""
                            ? "-"
                            : playerBowlingdata[item].average}
                        </td>
                        <td>
                          {playerBowlingdata[item].strike === ""
                            ? "-"
                            : playerBowlingdata[item].strike}
                        </td>
                        <td>
                          {playerBowlingdata[item].wicket5i === ""
                            ? "-"
                            : playerBowlingdata[item].wicket5i}
                        </td>
                        <td>
                          {playerBowlingdata[item].wicket10m === ""
                            ? "-"
                            : playerBowlingdata[item].wicket10m}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Overviewcom;
