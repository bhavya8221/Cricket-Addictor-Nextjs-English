import React, { useEffect, useState } from "react";
import styles from "./Teamcom.module.scss";
import icon from "../../public/Images/no-player.png";
import {
  LivePlayersApi,
  RecentPlayersApi,
  livePlayersApi,
  recentPlayersApi,
} from "../../Constants/Api/Api";
import { useRouter } from "next/router";
import Image from "next/image";

const Teamcom = (props) => {
  const [team, setTeam] = React.useState("TEAM_A");
  const [playersData, setPlayersData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const { slug } = router.query;
  const match_id = slug === undefined ? null : slug[0];
  function handleOnClickTEAM_A() {
    setTeam("TEAM_A");
    setActiveIndex(0);
  }
  function handleOnClickTEAM_B() {
    setTeam("TEAM_B");
    setActiveIndex(1);
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
    if (props.type === "live") {
      livePlayersApi(match_id)
        .then((res) => {
         
          setPlayersData(res.data.data);
          setVisible(true);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
    if (props.type === "recent") {
      recentPlayersApi(match_id)
        .then((res) => {
          setPlayersData(res.data.data);
          setVisible(true);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
  }, [match_id, props.type]);
 

  return (
    <div className={styles.Teamcom}>
     {Object.keys(playersData).length===0||Object.keys(playersData).length===undefined?"no player":

        <>
          <div className={`${styles.justi} mx-5`}>
            <div>
              <h3 className={styles.H3}>Squad</h3>
            </div>
            <div className={styles.player_team}>
              <h5
                className={styles.team_a}
                style={{
                  backgroundColor: team === "TEAM_A" ? null : "unset",
                  color: team === "TEAM_A" ? "var(--primary)" : "white",
                }}
                onClick={handleOnClickTEAM_A}
              >
                {visible === true ? playersData.tab[0]!==undefined&& playersData.tab[0].title : "Team_A"}
              </h5>
              <h5
                className={styles.team_b}
                style={{
                  backgroundColor: team === "TEAM_B" ? null : "unset",
                  color: team === "TEAM_B" ? "var(--primary)" : "white",
                }}
                onClick={handleOnClickTEAM_B}
              >
                {visible === true ? playersData.tab[1]!==undefined&&playersData.tab[1].title : "Team B"}
              </h5>
            </div>
          </div>
          <div className={`${styles.Teamcom_section} py-5 mt-1`}>
            <div className={`row ${styles.Team}`}>
              <h3 className={styles.text_red}>Playing XI</h3>
              {visible === true &&
                Object.keys(playersData.players_data).map((item, index) => {
                  return (
                    <div
                      style={{ display: "flex", flexFlow: "wrap" }}
                      className="row"
                      key={index}
                    >
                      {index === activeIndex
                        ? playersData.players_data[item]
                            .filter((user) => user.playing11 === "true")
                            .map((item2, index2) => {
                              return (
                                <div
                                  key={index2}
                                  className="col-lg-4 col-xs-12 col-xl-3 col-md-6 "
                                >
                                  <div
                                    className={styles["child-winn boder-box"]}
                                  >
                                    <div className={styles["winn-img "]}>
                                      <Image
                                        className={styles.plr}
                                        src={icon}
                                        alt="images"
                                        width={20}
                                      />
                                    </div>
                                    <div className={styles["winn-cen"]}>
                                      <h4>
                                        <b>{item2.name}</b>
                                      </h4>
                                      <h5>
                                        {item2.role === "" ? "--" : item2.role}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                        : null}
                    </div>
                  );
                })}

              <h3 className={styles.text_grey}>Rest Of Squad</h3>

              {visible === true &&
                Object.keys(playersData.players_data).map((item, index) => {
                  return (
                    <div
                      style={{ display: "flex", flexFlow: "wrap" }}
                      className="row"
                      key={index}
                    >
                      {index === activeIndex
                        ? playersData.players_data[item]
                            .filter((user) => user.playing11 === "false")
                            .map((item2, index2) => {
                              return (
                                <div
                                  key={index2}
                                  className="col-lg-4 col-xs-12 col-xl-3 col-md-6"
                                >
                                  <div
                                    className={styles["child-winn boder-box"]}
                                  >
                                    <div className={styles["winn-img "]}>
                                      <Image
                                        src={icon}
                                        className={styles.plr}
                                        alt="images"
                                      />
                                    </div>
                                    <div className={styles["winn-cen"]}>
                                      <h4>
                                        <b>{item2.name}</b>
                                      </h4>
                                      <h5>
                                        {item2.role === "" ? "--" : item2.role}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                        : null}
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default Teamcom;
