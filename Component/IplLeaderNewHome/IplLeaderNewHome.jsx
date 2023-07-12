import React, { memo, useState } from "react";
import styles from "./IplLeaderNewHome.module.scss";
import { Card, Table } from "react-bootstrap";
import noPlayer from "../../public/Images/no-player.png";
import Image from "next/image";

function IplLeaderNewHome(props) {
console.log(props,"dataa")
  function handleIPL() {
    navigate(
      `/ipl/ipl-2023/${props.data[0].cid}/stats/`
    );
  }
  return (
    <>
      {props.data===undefined||props.data[0] === undefined ||props.data[1] === undefined ||props.data[2]===undefined? null : (
        <div className={styles.IplLeaderNew_section}>
          <Card className={styles.IplLeaderNew_IPL_OG_card}>
            <Card.Body className={styles.IplLeaderNew_IPL_custom_card}>
              <div className={styles.IplLeaderNew_IPL_full_card}>
                <div
                  className={styles.IplLeaderNew_IPL_upper}
                  style={{
                    background: props.backColor,
                  }}
                >
                  <div className={styles.IplLeaderNew_IPL_upper_cap_row}>
                    <h2 className={styles.IplLeaderNew_cap_text}>
                      {props.data[0].types_key === "batting_most_runs"
                        ? "Aramco Orange Cap"
                        : props.data[0].types_key ===
                          "bowling_top_wicket_takers"
                        ? "Aramco Purple Cap"
                        : props.data[0].types_key ===
                          "batting_most_runs_innings"
                        ? "Highest Score"
                        : props.data[0].types_key ===
                          "bowling_best_bowling_figures"
                        ? "Best Bowling Perfomance"
                        : ""}
                    </h2>
                  </div>

                  <div className={styles.IplLeaderNew_flex_row}>
                    <div className={styles.IplLeaderNew_IPL_upper_row}>
                      <div className={styles.IplLeaderNew_IPL_triangleCorner} />
                      <div className={styles.IplLeaderNew_one_div}>
                        <h2 className={styles.IplLeaderNew_one_text}>1</h2>
                      </div>
                      <div className={styles.IplLeaderNew_ipl_team_left}>
                        <div className={styles.IplLeaderNew_ipl_team}>
                          <h2 className={styles.IplLeaderNew_player_name}>
                            {props.data[0].player.title}
                          </h2>
                        </div>
                        <div className={styles.IplLeaderNew_ipl_team}>
                          <Image
                            src={props.img}
                            alt="images"
                            className={styles.IplLeaderNew_imgIPLF}
                          />
                          <h2 className={styles.IplLeaderNew_ipl_team_name}>
                            {props.data[0].team.abbr}
                          </h2>
                        </div>

                        <div className={styles.IplLeaderNew_ipl_team}>
                          <h2 className={styles.IplLeaderNew_ipl_run}>
                            {props.data[0].types_key === "batting_most_runs"
                              ? props.data[0].runs
                              : props.data[0].types_key ===
                                "bowling_top_wicket_takers"
                              ? props.data[0].wickets
                              : props.data[0].types_key ===
                                "batting_most_runs_innings"
                              ? props.data[0].highestrun + "*"
                              : props.data[0].types_key ===
                                "bowling_best_bowling_figures"
                              ? props.data[0].bestinning
                              : ""}
                          </h2>
                        </div>
                        <h2 className={styles.IplLeaderNew_ipl_footer_text}>
                          {props.type}
                        </h2>
                      </div>
                    </div>
                    <div className={styles.IplLeaderNew_IPL_upper_row_right}>
                      <Image
                        src={noPlayer}
                        alt="images"
                        className={styles.IplLeaderNew_imgIPLP}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
            <Card.Footer style={{ padding: "0px" }}>
              <Table striped style={{ margin: "0px" }}>
                <thead>
                  <tr>
                    <th>Pos</th>
                    <th>Player</th>
                    <th>Team</th>
                    <th>
                      {props.data[0].types_key === "batting_most_runs" ? (
                        <>रन</>
                      ) : props.data[0].types_key ===
                        "bowling_top_wicket_takers" ? (
                        <>गेंद</>
                      ) : props.data[0].types_key ===
                        "batting_most_runs_innings" ? (
                        <>रन</>
                      ) : props.data[0].types_key ===
                        "bowling_best_bowling_figures" ? (
                        <>गेंद</>
                      ) : (
                        ""
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <td>2</td>
                    <td className={styles.IplLeaderNew_player}>
                      <h6> {props.data[1].player.title} </h6>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Image
                          src={props.img}
                          alt="images"
                          className={styles.IplLeaderNew_imgIPLF}
                        />{" "}
                        {props.data[1].team.abbr}
                      </div>
                    </td>
                    {/* <td>
                      {props.data[1].types_key === "batting_most_runs"
                        ? props.data[1].runs
                        : props.data[1].types_key ===
                          "bowling_top_wicket_takers"
                        ? props.data[1].wickets
                        : props.data[1].types_key ===
                          "batting_most_runs_innings"
                        ? props.data[1].highestrun
                        : props.data[1].types_key ===
                          "bowling_best_bowling_figures"
                        ? props.data[1].bestinning
                        : ""}
                    </td> */}
                  </tr>
                  <tr>
                    <td>3</td>
                    <td className={styles.IplLeaderNew_player}>
                      <h6> {props.data[2].player.title} </h6>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Image
                          src={props.img}
                          alt="images"
                          className={styles.IplLeaderNew_imgIPLF}
                        />{" "}
                        {props.data[2].team.abbr}
                      </div>
                    </td>
                    {/* <td>
                      {props.data[2].types_key === "batting_most_runs"
                        ? props.data[2].runs
                        : props.data[2].types_key ===
                          "bowling_top_wicket_takers"
                        ? props.data[2].wickets
                        : props.data[2].types_key ===
                          "batting_most_runs_innings"
                        ? props.data[2].highestrun
                        : props.data[2].types_key ===
                          "bowling_best_bowling_figures"
                        ? props.data[2].bestinning
                        : ""}
                    </td> */}
                  </tr>
                </tbody>
              </Table>
            </Card.Footer>
            <button className={styles.IplLeaderNew_IPLBtn} onClick={handleIPL}>
            View Full Table
            </button>
          </Card>
        </div>
      )}
    </>
   
  );
}

export default memo(IplLeaderNewHome);
