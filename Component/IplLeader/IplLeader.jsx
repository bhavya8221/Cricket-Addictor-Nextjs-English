import React, { useState, useEffect } from "react";
import styles from "./IplLeader.module.scss";
import { Card } from "react-bootstrap";
import NoFlag from "../../public/Images/no-flag.png";
import NoPlayer from "../../public/Images/no-player.png";
import { competitionStatsAPI, iPLListApi } from "../../Constants/Api/Api";
import { useRouter } from "next/router";
import Link from "next/link";

function IplLeader(props) {
  const router = useRouter();
  const { cid, season } = router.query;
  const [competitionStat, setCompetitionStat] = useState([]);
  const [aplListData, setIplListData] = useState([]);
  
  useEffect(() => {
    iPLListApi()
      .then((res) => {
        setIplListData(res.data.data);
        // setIsLoading(true);
        competitionStatsAPI(
          "t20",
          props.activeGroupTitle,
          props.location === "home" ? res.data.data[0].cid : cid,
          props.activeFormatsType,
          "3"
        )
          .then((res) => {
            setCompetitionStat(res.data.data.rows);
          })
          .catch((e) => {});
      })
      .catch((e) => {
      });
  }, [cid, props.activeGroupTitle, props.activeFormatsType, props.location]);

  return (
    <>
      {competitionStat.length === 0 ? null : (
        <div className={styles.iplLeader_section}>
          <Card className={styles.IPL_OG_card}>
            <Card.Body className={styles.IPL_custom_card}>
              <div className={styles.IPL_full_card}>
                <div
                  className={styles.IPL_upper}
                  style={{
                    background: props.backColor,
                  }}
                >
                  <div className={styles.IPL_upper_cap_row}>
                    <h2 className={styles.cap_text}>{props.title}</h2>
                  </div>

                  <div className={styles.flex_row}>
                    <div className={styles.IPL_upper_row}>
                      <div className={styles.IPL_triangleCorner} />
                      <div className={styles.one_div}>
                        <h2 className={styles.one_text}>1</h2>
                      </div>
                      <div className={styles.ipl_team_left}>
                        <div className={styles.ipl_team}>
                          <h2 className={styles.player_name}>
                            {competitionStat[0].player.title}
                          </h2>
                        </div>
                        <div className={styles.ipl_team}>
                          <img
                            src={
                              competitionStat[0].team.logo_url === "" ||
                              competitionStat[0].team.logo_url === null
                                ? NoFlag
                                : competitionStat[0].team.logo_url
                            }
                            alt="f1"
                            className={styles.imgIPLF}
                          />
                          <h2 className={styles.ipl_team_name}>
                            ({competitionStat[0].team.title})
                          </h2>
                        </div>
                        <div className={styles.ipl_team}>
                          <h2 className={styles.ipl_run}>
                            {props.type === "runs"
                              ? competitionStat[0].runs
                              : props.type === "wicket"
                              ? competitionStat[0].wickets
                              : props.type === "score"
                              ? competitionStat[0].highestrun + "*"
                              : competitionStat[0].bestinning}
                          </h2>
                        </div>
                        <h2 className={styles.ipl_footer_text}>{props.type}</h2>
                      </div>
                    </div>
                    <div className={styles.IPL_upper_row_right}>
                      <img
                        src={
                          competitionStat[0].player.logo_url === "" ||
                          competitionStat[0].player.logo_url === null
                            ? NoPlayer
                            : competitionStat[0].player.logo_url
                        }
                        alt="f1"
                        className={styles.imgIPLP}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.IPL_lower}>
                  <div className={`row ${styles.first_row}`}>
                    <div className={styles.col_first}>
                      <h2 className={styles.col_name}>Pos</h2>
                    </div>
                    <div className={styles.col_second}>
                      <h2 className={styles.col_name}> player</h2>
                    </div>
                    <div className={styles.col_third}>
                      <h2 className={styles.col_name}> team</h2>
                    </div>
                    <div className={styles.col_fourth}>
                      <h2 className={styles.col_name}>
                        {props.type === "runs" ? (
                          <> runs</>
                        ) : props.type === "wicket" ? (
                          <> wickets</>
                        ) : props.type === "score" ? (
                          <> runs</>
                        ) : (
                          <> bbi</>
                        )}
                      </h2>
                    </div>
                  </div>

                  <div className={`row ${styles.second_row}`}>
                    <div className={styles.col_first}>
                      <h2 className={`${styles.col_name} fw-bold"`}>2</h2>
                    </div>
                    <div className={styles.col_second}>
                      <h2 className={`${styles.col_name} fw-bold"`}>
                        {competitionStat[1].player.title}{" "}
                      </h2>
                    </div>
                    <div className={styles.col_third}>
                      <img
                        src={
                          competitionStat[1].team.logo_url === "" ||
                          competitionStat[1].team.logo_url === null
                            ? NoFlag
                            : competitionStat[1].team.logo_url
                        }
                        alt="f1"
                        className={styles.imgIPLPF}
                      />
                      <h2 className={styles.col_name}>
                        &nbsp;{competitionStat[1].team.abbr}
                      </h2>
                    </div>
                    <div className={styles.col_fourth}>
                      <h2 className={`${styles.col_name} fw-bold`}>
                        {props.type === "runs"
                          ? competitionStat[1].runs
                          : props.type === "wicket"
                          ? competitionStat[1].wickets
                          : props.type === "score"
                          ? competitionStat[1].highestrun
                          : competitionStat[1].bestinning}
                      </h2>
                    </div>
                  </div>

                  <div className={`row ${styles.third_row}`}>
                    <div className={styles.col_first}>
                      <h2 className={`${styles.col_name} fw-bold`}>3</h2>
                    </div>
                    <div className={styles.col_second}>
                      <h2 className={`${styles.col_name} fw-bold`}>
                        {competitionStat[2].player.title}{" "}
                      </h2>
                    </div>
                    <div className={styles.col_third}>
                      <img
                        src={
                          competitionStat[2].team.logo_url === "" ||
                          competitionStat[2].team.logo_url === null
                            ? NoFlag
                            : competitionStat[2].team.logo_url
                        }
                        alt="f1"
                        className={styles.imgIPLPF}
                      />
                      <h2 className={styles.col_name}>
                        &nbsp;{competitionStat[2].team.abbr}
                      </h2>
                    </div>
                    <div className={styles.col_fourth}>
                      <h2 className={`${styles.col_name} fw-bold`}>
                        {props.type === "runs"
                          ? competitionStat[2].runs
                          : props.type === "wicket"
                          ? competitionStat[2].wickets
                          : props.type === "score"
                          ? competitionStat[2].highestrun
                          : competitionStat[2].bestinning}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                className={styles.link_color}
                href={
                  props.location === "home"
                    ? aplListData.length === 0
                      ? "#"
                      : `/ipl/${aplListData[0].season}/${aplListData[0].cid}/stats/`
                    : `/ipl/${season}/${cid}/stats/`
                }
              >
                <button className={styles.IPLBtn}> view_More_table</button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
}

export default IplLeader;
