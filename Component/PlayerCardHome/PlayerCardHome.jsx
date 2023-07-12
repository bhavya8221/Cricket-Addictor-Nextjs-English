import React, { memo, useEffect, useState } from "react";
import styles from "./PlayerCardHome.module.scss";
import { Card, Table } from "react-bootstrap";
import noPlayer from "../../public/Images/no-player.png";
import Image from "next/image";
import { useRouter } from "next/router";
function PlayerCardHome(props) {
  const router = useRouter();
  return (
    <>
      {props.data === undefined ? null : (
        <div className={styles.PlayerCard_section}>
          <Card className={styles.IPL_OG_card}>
            <Card.Body className={styles.IPL_custom_card}>
              <div className={styles.IPL_full_card}>
                <div className={styles.IPL_upper}>
                  <div className={styles.IPL_upper_cap_row}>
                    <h2
                      className={`${styles.test_text} ${styles.textUppercase}`}
                    >
                      {props.activeGroupsType === "tests"
                        ? "TEST"
                        : props.activeGroupsType === "odis"
                        ? "ODI"
                        : "T20"}
                    </h2>
                    <h2 className={styles.cap_text}>
                      {props.type === "batsmen" ? (
                        "Batting"
                      ) : props.type === "bowlers" ? (
                        "Bowling"
                      ) : (
                        "All Rounder"
                      )}
                      Ranking
                    </h2>
                  </div>

                  <div className={styles.flex_row}>
                    <div className={styles.IPL_upper_row}>
                      <div className={styles.IPL_triangleCorner} />
                      <div className={styles.one_div}>
                        <h2 className={styles.one_text}>
                          {props.data[0].rank}
                        </h2>
                      </div>
                      <div className={styles.ipl_team_left}>
                        <div className={styles.ipl_team}>
                          <h2 className={styles.player_name}>
                            {props.data[0].player}
                          </h2>
                        </div>
                        <div className={styles.ipl_team}>
                          <Image
                            src={props.img}
                            alt="images"
                            className={styles.imgIPLF}
                          />
                          <span className={styles.ipl_team_name}>
                            {props.data[0].team}
                          </span>
                        </div>
                        <h2 className={styles.ipl_footer_text}>Rating</h2>

                        <div className={styles.ipl_team}>
                          <h2 className={styles.ipl_run}>
                            {props.data[0].rating}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className={styles.IPL_upper_row_right}>
                      <Image
                        src={noPlayer}
                        alt="images"
                        className={styles.imgIPLP}
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
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{props.data[1].rank}</td>
                    <td className={styles.player}>
                      <h6>{props.data[1].player}</h6>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Image
                          src={props.img}
                          alt="images"
                          className={styles.imgIPLF}
                        />
                        {props.data[1].team}
                      </div>
                    </td>
                    <td> {props.data[1].rating}</td>
                  </tr>
                  <tr>
                    <td>{props.data[2].rank}</td>
                    <td className={styles.player}>
                      <h6>{props.data[2].player}</h6>
                    </td>
                    <td>
                      {" "}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Image
                          src={props.img}
                          alt="images"
                          className={styles.imgIPLF}
                        />
                        {props.data[2].team}
                      </div>
                    </td>
                    <td> {props.data[2].rating}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Footer>
            <button className={styles.IPLBtn} onClick={() => {
              const path = `/icc-rankings-men/${props.type}/${props.activeGroupsType}/`;
              router.push(path);
            }}>
              View Full Table
            </button>
          </Card>
        </div>
      )}
    </>
  );
}

export default memo(PlayerCardHome);
