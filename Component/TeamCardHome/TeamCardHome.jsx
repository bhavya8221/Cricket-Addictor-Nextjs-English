import React, { useEffect, useState, useCallback } from "react";
import styles from "./TeamCardHome.module.scss";
import { Card, Table } from "react-bootstrap";
import noflag from "../../public/Images/no-flag.png";
 
import { iCCRankingHomePage } from "../../Constants/Api/Api";
import Image from "next/image";
import { useRouter } from "next/router";

function TeamCardHome(props) {
   const router =useRouter()
  const [teamsData, setTeamsData] = useState([]);
  function handleIPL() {
    router.replace(`/icc-rankings-men/${props.type}/teams/`);
  }

  useEffect(() => {
    iCCRankingHomePage("", props.gender, "teams")
      .then((res) => {
        setTeamsData(res.data.data);
      })
      .catch((e) => {});
  }, [props.gender]);

  return (
    <>
      {props.data === undefined ? null : (
        <div className={styles.TeamCard_section}>
          <Card className={styles.IPL_OG_card}>
            <Card.Body className={styles.IPL_custom_card}>
              <div className={styles.IPL_full_card}>
                <div className={styles.IPL_upper}>
                  <div className={styles.IPL_upper_cap_row}>
                  <h2 className={`${styles.test_text} ${styles.textUppercase}`}>
                      {props.activeGroupsType === "tests" ? (
                        <>TEST </>
                      ) : props.activeGroupsType === "odis" ? (
                        <>ODI </>
                      ) : (
                        <>T20 </>
                      )}
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
                            {props.data[0].team}
                          </h2>
                        </div>
                        <div className={styles.ipl_team}>
                          <h2 className={styles.player_name}>Rating</h2>
                        </div>
                        <div className={styles.ipl_team}>
                          <h2 className={styles.player_name}>
                            {props.data[0].rating}
                          </h2>
                        </div>

                        <div className={styles.IPL_upper_row_right}>
                          <image src={props.img} alt="images" className="imgIPLP" />
                        </div>
                      </div>
                    </div>
                    <div className={styles.IPL_upper_row_right}>
                      <Image
                        src={noflag}
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
                    <th>Team</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{props.data[1].rank}</td>

                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {props.data[1].team}
                        <Image
                          src={props.img}
                          alt="images"
                          className={styles.imgIPLF}
                        />
                      </div>
                    </td>
                    <td> {props.data[1].rating}</td>
                  </tr>
                  <tr>
                    <td>{props.data[2].rank}</td>

                    <td>
                      {" "}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {props.data[2].team}
                        <Image
                          src={props.img}
                          alt="images"
                          className={styles.imgIPLF}
                        />
                      </div>
                    </td>
                    <td> {props.data[2].rating}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Footer>
            <button className={styles.IPLBtn} onClick={handleIPL}>
              View Full Table
            </button>
          </Card>
        </div>
      )}
    </>
  );
}

export default TeamCardHome;
