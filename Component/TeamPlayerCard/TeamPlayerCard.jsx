import React, { useEffect, useState, useCallback } from "react";
import styles from "./TeamPlayerCard.module.scss";
import { Card } from "react-bootstrap";
// import { useNavigate, useParams } from "react-router-dom";
import { TeamListDetailAPI, teamListDetailAPI } from "../../Constants/Api/Api";
import noPlayer from "../../public/Images/no-player.png";
import { useRouter } from "next/router";
import Image from "next/image";
//  

function TeamPlayerCard(props) {
  //  
  const router = useRouter();
  const [teamplayersData, setTeamPlayersData] = useState([]);
  const { tid } = router.query;
  // const navigate = useNavigate();

  function handleShowRanking(type, ranktype) {
    router.replace(`/icc-rankings-men/${ranktype}/${type}`)
    // window.location.href = `/icc-rankings-men/${ranktype}/${type}`; // update men/women dynamically
  }

  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  useEffect(() => {
    teamListDetailAPI(tid, props.activeGroupsType, props.groups)
      .then((res) => {
        setTeamPlayersData(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [tid, props.activeGroupsType, props.groups]);


  return (
    <>
      {teamplayersData.length === 0 ? (
        <>
          <h6 style={{ textAlign: "center", margin: "40px" }}>
            No Player {props.groups} Ranking Data
          </h6>
        </>
      ) : (
        <div className={styles.TeamPlayerCard_section}>
          <Card className={styles.IPL_OG_card}>
            <Card.Body className={styles.IPL_custom_card}>
              <div className={styles.IPL_full_card}>
                <div className={styles.IPL_upper}>
                  <div className={styles.IPL_upper_cap_row}>
                    <h1 className={styles.test_text}>
                      {props.activeGroupsType === "tests" ? (
                        <>TEST</>
                      ) : props.activeGroupsType === "odis" ? (
                        <>ODI</>
                      ) : (
                        <>T20</>
                      )}
                    </h1>
                    <h1 className={styles.cap_text}>
                      {props.groups === "batsmen" ? (
                        <>Batting</>
                      ) : props.groups === "bowlers" ? (
                        <>Bowling</>
                      ) : (
                        <>All Rounder</>
                      )}{" "}
                      ranking
                    </h1>
                  </div>
                  {teamplayersData[0] === undefined ? null : (
                    <div className={styles.flex_row}>
                      <div className={styles.IPL_upper_row}>
                        <div className={styles.IPL_triangleCorner} />
                        <div className={styles.one_div}>
                          <h1 className={styles.one_text}>
                            {teamplayersData[0].rank}
                          </h1>
                        </div>

                        <div className={`${styles.ipl_team} "mt-3"`}>
                          <h1 className={styles.player_name}>
                            {teamplayersData[0].player}
                          </h1>
                        </div>
                        <div className={styles.ipl_team}>
                          <Image
                            src={props.img}
                            alt="images"
                            className={styles.imgIPLF}
                          />
                          <h1 className={styles.ipl_team_name}>
                            {teamplayersData[0].team}
                          </h1>
                        </div>
                        <h1 className={styles.ipl_footer_text}>rating</h1>
                        <div className={styles.ipl_team}>
                          <h1 className={styles.ipl_run}>
                            {teamplayersData[0].rating}
                          </h1>
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
                  )}
                </div>

                <div className={styles.IPL_lower}>
                  <div className="row">
                    <div className={styles.first_row}>
                      <div className={styles.col_first}>
                        <h1 className={styles.col_name}>Pos</h1>
                      </div>
                      <div className={styles.col_second}>
                        <h1 className={styles.col_name}>Player</h1>
                      </div>
                      <div className={styles.col_third}>
                        <h1 className={styles.col_name}>Team</h1>
                      </div>
                      <div className={styles.col_fourth}>
                        <h1 className={styles.col_name}>Rating</h1>
                      </div>
                    </div>
                  </div>
                  {teamplayersData[1] === undefined ? (
                    <div style={{ textAlign: "center" }}>No Data</div>
                  ) : (
                    <div className="row">
                      <div className={styles.second_row}>
                        <div className={styles.col_first}>
                          <h1 className={`${styles.col_name} "fw-bold`}>
                            {teamplayersData[1].rank}
                          </h1>
                        </div>
                        <div className={styles.col_second}>
                          <h1 className={`${styles.col_name} "fw-bold`}>
                            {teamplayersData[1].player}
                          </h1>
                        </div>
                        <div className={styles.col_third}>
                          <Image
                            src={props.img}
                            alt="images"
                            className={styles.imgIPLP1}
                          />
                          <h1 className={styles.col_name}>
                            {teamplayersData[1].team}
                          </h1>
                        </div>
                        <div className={styles.col_fourth}>
                          <h1 className={`${styles.col_name} "fw-bold`}>
                            {teamplayersData[1].rating}
                          </h1>
                        </div>
                      </div>
                    </div>
                  )}

                  {teamplayersData[2] === undefined ? (
                    <div style={{ textAlign: "center" }}>No Data</div>
                  ) : (
                    <div className="row">
                      <div className={styles.third_row}>
                        <div className={styles.col_first}>
                          <h1 className={`${styles.col_name} "fw-bold`}>
                            {teamplayersData[2].rank}
                          </h1>
                        </div>
                        <div className={styles.col_second}>
                          <h1 className={`${styles.col_name} "fw-bold`}>
                            {teamplayersData[2].player}
                          </h1>
                        </div>
                        <div className={styles.col_third}>
                          <Image
                            src={props.img}
                            alt="images"
                            className={styles.imgIPLP1}
                          />
                          <h1 className={styles.col_name}>
                            {teamplayersData[2].team}
                          </h1>
                        </div>
                        <div className={styles.col_fourth}>
                          <h1 className={`${styles.col_name} "fw-bold`}>
                            {teamplayersData[2].rating}
                          </h1>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                className={styles.IPLBtn}
                onClick={() =>
                  handleShowRanking(props.activeGroupsType, props.groups)
                }
              >
                View More Table
              </button>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
}

export default TeamPlayerCard;
