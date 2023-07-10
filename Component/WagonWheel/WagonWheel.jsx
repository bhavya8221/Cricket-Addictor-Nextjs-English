import React, { useEffect, useState, useCallback } from "react";
import styles from "./WagonWheel.module.scss";
import wheel from "../../public/Images/wheel.png";
import { NavDropdown } from "react-bootstrap";
import { wagonsWheelAPI } from "../../Constants/Api/Api";
import ColorLine from "./ColorLine";
 
import { useRouter } from "next/router";
import Image from "next/image";

const WagonWheel = () => {
  const router = useRouter();
  const { slug } = router.query;
  const match_id = slug[0];
  const latest_inning_number = slug[1];
  const [runType, setRunType] = useState("off_side_runs");
  const [wagonwheel, setWagonWheel] = useState();
  const [wagonWheelTab, setWagonWheelTab] = useState([]);
  const [wagonWheelAllBowler, setWagonWheelAllBowler] = useState([]);
  const [wagonWheelAllBatsman, setWagonWheelAllBatsman] = useState([]);
  const [selectinning, setSelectInning] = useState(latest_inning_number);
  const [selectBatsman, setSelectBatsman] = useState("");
  const [selectBatsmanName, setSelectBatsmanName] = useState("All Batsman");
  const [SelectBowlerName, setSelectBowlerName] = useState("All Bowler");
  const [selectinningName, setSelectInningName] = useState("");
  const [inningRender, setInningRender] = useState(false);
  const [intialRender, setIntialRender] = useState(false);
  const [SelectBowler, setSelectBowler] = useState("");
  const [wagonWheelResponse, setWagonWheelResponse] = useState({});
  const [wagonWheelResponseAxis, setWagonWheelResponseAxis] = useState([]);
  const [wagonLineColor, setWagonLineColor] = useState([]);

  function handleOnClickOffSideRuns() {
    setRunType("off_side_runs");
  }

  function handleOnClickOnSideRuns() {
    setRunType("on_side_runs");
  }

  function OnClickTab(value1, value2) {
    setSelectInning(value1);
    setSelectInningName(value2);
    setIntialRender(true);
  }

  function OnClickBatsman(value1, value2) {
    setSelectBatsman(value1);
    setSelectBatsmanName(value2);
  }

  function OnClickBowler(value1, value2) {
    setSelectBowler(value1);
    setSelectBowlerName(value2);
  }
  useEffect(() => {
    wagonsWheelAPI(
      match_id,
      selectinning.toString(),
      selectBatsman,
      SelectBowler
    )
      .then((res) => {
        setWagonWheel(res.data.data);
        setWagonWheelTab(res.data.data.tab);
        setWagonWheelResponse(res.data.data.response);
        setWagonWheelAllBatsman(res.data.data.all_batsmans);
        setWagonWheelAllBowler(res.data.data.all_bowlers);
        setWagonWheelResponseAxis(
          Object.keys(res.data.data.response.axis).map((item) => {
            return res.data.data.response.axis[item].map((item2) => {
              return item2;
            });
          })
        );
        setWagonLineColor(
          wagonWheelResponseAxis.flat().map((item) => {
            return item.runs;
          })
        );
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
    if (intialRender !== true) {
      setSelectInningName(
        wagonWheelTab.length !== 0 &&
          wagonWheelTab.find(function (item) {
            return item.number === Number(latest_inning_number);
          }).name
      );
    }
   
    // don't remove console
  }, [
    match_id,
    latest_inning_number,
    selectinning,
    selectBatsman,
    SelectBowler,
    inningRender,
  ]);

  return (
    <div className={styles.WagonWheel}>
      <div className={styles.head}>
        <h3 className={styles.H3}>
          <b>WagonWheel</b>
        </h3>
      </div>
      <div className={styles.wheel_section}>
        {wagonWheelTab.length !== 0 &&
        wagonWheelAllBatsman.length !== 0 &&
        wagonWheelAllBowler.length !== 0 ? (
          <div className={styles.navSelection_box}>
            {inningRender === false ? setInningRender(true) : null}
            <NavDropdown
              title={selectinningName === false ? "--" : selectinningName}
              id="navbarScrollingDropdown"
            >
              {wagonWheelTab.length !== 0
                ? wagonWheelTab.map((item, index) => {
                    return (
                      <NavDropdown.Item
                        key={index}
                        style={{
                          backgroundColor:
                            selectinning === wagonWheelTab[index].number
                              ? "var(--primary)"
                              : null,
                          color:
                            selectinning === wagonWheelTab[index].number
                              ? "white"
                              : null,
                        }}
                        onClick={() =>
                          OnClickTab(
                            wagonWheelTab[index].number,
                            wagonWheelTab[index].name
                          )
                        }
                      >
                        {item.name}
                      </NavDropdown.Item>
                    );
                  })
                : "no play inning"}
            </NavDropdown>
            <NavDropdown title={selectBatsmanName} id="navbarScrollingDropdown">
              <NavDropdown.Item
                style={{
                  backgroundColor:
                    selectBatsman === "" ? "var(--primary)" : null,
                  color: selectBatsman === "" ? "white" : null,
                }}
                onClick={() => OnClickBatsman("", "All Batsman")}
              >
                All Batsman
              </NavDropdown.Item>
              {wagonWheelAllBatsman.length !== 0
                ? wagonWheelAllBatsman.map((item, index) => {
                    return (
                      <NavDropdown.Item
                        key={index}
                        style={{
                          backgroundColor:
                            selectBatsman ===
                            wagonWheelAllBatsman[index].batsman_id
                              ? "var(--primary)"
                              : null,
                          color:
                            selectBatsman ===
                            wagonWheelAllBatsman[index].batsman_id
                              ? "white"
                              : null,
                        }}
                        onClick={() =>
                          OnClickBatsman(
                            wagonWheelAllBatsman[index].batsman_id,
                            wagonWheelAllBatsman[index].name
                          )
                        }
                      >
                        {item.name}
                      </NavDropdown.Item>
                    );
                  })
                : null}
            </NavDropdown>
            <NavDropdown title={SelectBowlerName} id="navbarScrollingDropdown">
              <NavDropdown.Item
                style={{
                  backgroundColor:
                    SelectBowler === "" ? "var(--primary)" : null,
                  color: SelectBowler === "" ? "white" : null,
                }}
                onClick={() => OnClickBowler("", "All Bowler")}
              >
                All Bowler
              </NavDropdown.Item>
              {wagonWheelAllBowler.length !== 0
                ? wagonWheelAllBowler.map((item, index) => {
                    return (
                      <NavDropdown.Item
                        key={index}
                        style={{
                          backgroundColor:
                            SelectBowler ===
                            wagonWheelAllBowler[index].bowler_id
                              ? "var(--primary)"
                              : null,
                          color:
                            SelectBowler ===
                            wagonWheelAllBowler[index].bowler_id
                              ? "white"
                              : null,
                        }}
                        onClick={() =>
                          OnClickBowler(
                            wagonWheelAllBowler[index].bowler_id,
                            wagonWheelAllBowler[index].name
                          )
                        }
                      >
                        <div className={styles.bowler}>{item.name}</div>
                      </NavDropdown.Item>
                    );
                  })
                : null}
            </NavDropdown>
          </div>
        ) : (
          "no data"
        )}

        <div className={`row py-5 ${styles.wagonLine}`}>
          <div
            className={`col-lg-4 col-xs-12 col-md-12 ${styles.wagonLine2}`}

            // style={{ textAlign: "center" }}
          >
            <Image src={wheel} alt="images" className={styles.imgsize} />
          </div>

          {/* <div
            // className="colorline"
            className="colorline col-lg-4 col-xs-12 col-md-12"
            style={{ textAlign: "center" }}
          > */}
          {/* <ColorLine
              endpoints={[
                { x: 250, y: 360, runs: 1 },
                { x: 350, y: 100, runs: 2 },
                { x: 200, y: 300, runs: 3 },
              ]}
            /> */}
          {wagonWheelResponseAxis.length === 0 ? null : (
            <ColorLine endpoints={wagonWheelResponseAxis.flat()} />
          )}
          {/* </div> */}

          <div className={`col-lg-8 col-xs-12 col-md-12 ${styles.boxes}`}>
            <div className={styles.titles}>
              <div
                className={styles.first_title}
                style={{
                  backgroundColor:
                    runType === "off_side_runs" ? "#534019" : "#aaa4a4",
                  color: runType === "off_side_runs" ? null : "white",
                }}
                onClick={handleOnClickOffSideRuns}
              >
                OFF SIDES RUNS-
                {wagonWheelResponse.length !== 0
                  ? wagonWheelResponse.totalRunsPlayer_off_side_runs
                  : "--"}
                ({" "}
                {wagonWheelResponse.length !== 0
                  ? wagonWheelResponse.playerPercentage_off_side
                  : "--"}
                % )
              </div>
              <div
                className={styles.second_title}
                style={{
                  backgroundColor:
                    runType === "on_side_runs" ? "#534019" : "#aaa4a4",
                  color: runType === "on_side_runs" ? null : "white",
                }}
                onClick={handleOnClickOnSideRuns}
              >
                ON SIDES RUNS-
                {wagonWheelResponse.length !== 0
                  ? wagonWheelResponse.totalRunsPlayer_on_side_runs
                  : "--"}
                ({" "}
                {wagonWheelResponse.length !== 0
                  ? wagonWheelResponse.playerPercentage_on_side
                  : "--"}
                % )
              </div>
            </div>
            <hr className={styles.hrs}></hr>
            {runType === "off_side_runs" ? (
              <div className={`${styles.respon} row my-4 mx-5`}>
                <div className="col">
                  <div className={styles.red_box}>
                    <h6 className={styles.red_boder}>THIRD MAN</h6>
                    <h3>
                      {Object.keys(wagonWheelResponse).length === 0
                        ? "--"
                        : Object.keys(wagonWheelResponse.off_side_runs)
                            .length !== 0 &&
                          Object.keys(wagonWheelResponse.off_side_runs).map(
                            (item, index) => {
                              return (
                                index === 0 &&
                                wagonWheelResponse.off_side_runs[item]
                              );
                            }
                          )}
                    </h3>
                    <h5>RUNS</h5>
                  </div>
                </div>
                <div className="col">
                  <div className={styles.red_box}>
                    <h6 className={styles.red_boder}>POINT</h6>
                    <h3>
                      {Object.keys(wagonWheelResponse).length === 0
                        ? "--"
                        : Object.keys(wagonWheelResponse.off_side_runs)
                            .length !== 0 &&
                          Object.keys(wagonWheelResponse.off_side_runs).map(
                            (item, index) => {
                              return (
                                index === 1 &&
                                wagonWheelResponse.off_side_runs[item]
                              );
                            }
                          )}
                    </h3>
                    <h5>RUNS</h5>
                  </div>
                </div>
                <div className="col">
                  <div className={styles.red_box}>
                    <h6 className={styles.red_boder}>COVER</h6>
                    <h3>
                      {Object.keys(wagonWheelResponse).length === 0
                        ? "--"
                        : Object.keys(wagonWheelResponse.off_side_runs)
                            .length !== 0 &&
                          Object.keys(wagonWheelResponse.off_side_runs).map(
                            (item, index) => {
                              return (
                                index === 2 &&
                                wagonWheelResponse.off_side_runs[item]
                              );
                            }
                          )}
                    </h3>
                    <h5>RUNS</h5>
                  </div>
                </div>
                <div className="col">
                  <div className={styles.red_box}>
                    <h6 className={styles.red_boder}>LONG OFF</h6>
                    <h3>
                      {Object.keys(wagonWheelResponse).length === 0
                        ? "--"
                        : Object.keys(wagonWheelResponse.off_side_runs)
                            .length !== 0 &&
                          Object.keys(wagonWheelResponse.off_side_runs).map(
                            (item, index) => {
                              return (
                                index === 3 &&
                                wagonWheelResponse.off_side_runs[item]
                              );
                            }
                          )}
                    </h3>
                    <h5>RUNS</h5>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${styles.respon} row my-4 mx-5`}>
                <div className="col">
                  <div className={styles.red_box}>
                    <h6 className={styles.red_boder}>FINE LEG</h6>
                    <h3>
                      {Object.keys(wagonWheelResponse).length === 0
                        ? "--"
                        : Object.keys(wagonWheelResponse.on_side_runs)
                            .length !== 0 &&
                          Object.keys(wagonWheelResponse.on_side_runs).map(
                            (item, index) => {
                              return (
                                index === 0 &&
                                wagonWheelResponse.on_side_runs[item]
                              );
                            }
                          )}
                    </h3>
                    <h5>RUNS</h5>
                  </div>
                </div>
                <div className="col">
                  <div className={styles.red_box}>
                    <h6 className={styles.red_boder}>SQUARE LEG</h6>
                    <h3>
                      {" "}
                      {Object.keys(wagonWheelResponse).length === 0
                        ? "--"
                        : Object.keys(wagonWheelResponse.on_side_runs)
                            .length !== 1 &&
                          Object.keys(wagonWheelResponse.on_side_runs).map(
                            (item, index) => {
                              return (
                                index === 1 &&
                                wagonWheelResponse.on_side_runs[item]
                              );
                            }
                          )}
                    </h3>
                    <h5>RUNS</h5>
                  </div>
                </div>
                <div className="col">
                  <div className={styles.red_box}>
                    <h6 className={styles.red_boder}>MID WICKET</h6>
                    <h3>
                      {Object.keys(wagonWheelResponse).length === 0
                        ? "--"
                        : Object.keys(wagonWheelResponse.on_side_runs)
                            .length !== 2 &&
                          Object.keys(wagonWheelResponse.on_side_runs).map(
                            (item, index) => {
                              return (
                                index === 2 &&
                                wagonWheelResponse.on_side_runs[item]
                              );
                            }
                          )}
                    </h3>
                    <h5>RUNS</h5>
                  </div>
                </div>
                <div className="col">
                  <div className={styles.red_box}>
                    <h6 className={styles.red_boder}>LONG ON</h6>
                    <h3>
                      {Object.keys(wagonWheelResponse).length === 0
                        ? "--"
                        : Object.keys(wagonWheelResponse.on_side_runs)
                            .length !== 3 &&
                          Object.keys(wagonWheelResponse.on_side_runs).map(
                            (item, index) => {
                              return (
                                index === 3 &&
                                wagonWheelResponse.on_side_runs[item]
                              );
                            }
                          )}
                    </h3>
                    <h5>RUNS</h5>
                  </div>
                </div>
              </div>
            )}

            <div className={styles.btns_all}>
              <div className={styles.btns_all_2}>
                <div className={styles.green_btn}>ALL</div>
                <div className={styles.yellow_btn}>
                  1s-
                  {Object.keys(wagonWheelResponse).length === 0
                    ? "--"
                    : Object.keys(wagonWheelResponse.runs).length !== 0 &&
                      Object.keys(wagonWheelResponse.runs).map(
                        (item, index) => {
                          return index === 0 && wagonWheelResponse.runs[item];
                        }
                      )}
                </div>
                <div className={styles.pink_btn}>
                  2s-
                  {Object.keys(wagonWheelResponse).length === 0
                    ? "--"
                    : Object.keys(wagonWheelResponse.runs).length !== 0 &&
                      Object.keys(wagonWheelResponse.runs).map(
                        (item, index) => {
                          return index === 1 && wagonWheelResponse.runs[item];
                        }
                      )}
                </div>
              </div>
              <div className={styles.btns_all_2}>
                <div className={styles.sea_btn}>
                  3s-
                  {Object.keys(wagonWheelResponse).length === 0
                    ? "--"
                    : Object.keys(wagonWheelResponse.runs).length !== 0 &&
                      Object.keys(wagonWheelResponse.runs).map(
                        (item, index) => {
                          return index === 2 && wagonWheelResponse.runs[item];
                        }
                      )}
                </div>
                <div className={styles.blue_btn}>
                  4s-
                  {Object.keys(wagonWheelResponse).length === 0
                    ? "--"
                    : Object.keys(wagonWheelResponse.runs).length !== 0 &&
                      Object.keys(wagonWheelResponse.runs).map(
                        (item, index) => {
                          return index === 3 && wagonWheelResponse.runs[item];
                        }
                      )}
                </div>
                <div className={styles.reds_btn}>
                  6s-
                  {Object.keys(wagonWheelResponse).length === 0
                    ? "--"
                    : Object.keys(wagonWheelResponse.runs).length !== 0 &&
                      Object.keys(wagonWheelResponse.runs).map(
                        (item, index) => {
                          return index === 4 && wagonWheelResponse.runs[item];
                        }
                      )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WagonWheel;
