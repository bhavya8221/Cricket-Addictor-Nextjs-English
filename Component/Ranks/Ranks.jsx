import React, { useEffect, useState, useCallback } from "react";
import styles from "../../styles/Ranks.module.scss";
import { iCCRankingApi } from "../../Constants/Api/Api";
import Image from "next/image";
import winner from "../../public/Images/first.png";
import noFlag from "../../public/Images/no-flag.png";
import noPlayer from "../../public/Images/no-player.png";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

import { useRouter } from "next/router";

const Ranks = (props) => {
  const router = useRouter();
  const [rankingData, setRankingData] = useState([]);
  const [limit, setLimit] = useState("10");
  const [isLoading, setIsLoading] = useState(false);
  // const { pathname } = useLocation();
  // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  function handleOnClickShowMore() {
    if (limit === null) {
      setLimit("10");
    }
    if (limit === "10") {
      setLimit(null);
    }
  }

  useEffect(() => {
    if (limit === "10") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    setIsLoading(true);
    iCCRankingApi(props.activeGroupsType, props.activeGroups, limit)
      .then((res) => {
        setRankingData(res.data.data);
        setIsLoading(false);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [props.activeGroupsType, props.activeGroups, limit]);

  return (
    <div className={styles.rankingCard_section}>
      <div className={`${styles.Ranking_section}`}>
        <div className={styles.main_div}>
          {/* col 1 */}
          <div className="child-details col-md-7 col-xs-12 rank-box">
            {isLoading === true ? //   <ClipLoader // <div className="loader">
            //     color={"var(--primary)"}
            //     loading={isLoading}
            //     size={30}
            //   />
            // </div>
            null : (
              <div>
                <h3 className={styles.iccHeading}>
                  Icc Cricket Ranking
                  {props.gender.split("/")[1] === "icc-rankings-women"
                    ? "Women Team"
                    : "Men Team"}
                </h3>
                {props.gender.split("/")[1] === "icc-rankings-women" ? (
                  <h6 className="" style={{ marginTop: 30 }}>
                    No Data of ICC Women Ranking
                  </h6>
                ) : (
                  <table className={styles.styled_table}>
                    <thead>
                      <tr className={styles.text_size}>
                        <th>Rank</th>
                        {props.activeGroups === "teams" ? (
                          <th className={styles.text_left}>Team</th>
                        ) : (
                          <th className={styles.text_left}>Player</th>
                        )}
                        {props.activeGroups === "teams" ? (
                          <th>Points</th>
                        ) : null}
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rankingData.map((item, index) => {
                        return (
                          <tr
                            key={index}
                            className={
                              item.rank === "1"
                                ? "white-row text_size winner"
                                : "white-row text_size"
                            }
                          >
                            <td>
                              {item.rank === "1" ? (
                                <Image
                                  src={winner}
                                  alt="images"
                                  width={300}
                                  height={200}
                                />
                              ) : (
                                item.rank
                              )}
                            </td>
                            {props.activeGroups === "teams" ? (
                              <td className={styles.text_left}>
                                <div className={styles.flag_team}>
                                  <Image
                                    src={noFlag}
                                    alt="images"
                                    width={300}
                                    height={200}
                                  />
                                  <b>{item.team}</b>
                                </div>
                              </td>
                            ) : (
                              <td className={styles.text_left}>
                                <div className={styles.player_team}>
                                  <Image
                                    src={noPlayer}
                                    alt="images"
                                    width={300}
                                    height={200}
                                  />
                                  <div>
                                    <b>{item.player}</b>
                                    <br />
                                    <b
                                      style={{
                                        color: "grey",
                                        fontSize: "13px",
                                      }}
                                    >
                                      {item.team}
                                    </b>
                                  </div>
                                </div>
                              </td>
                            )}
                            {props.activeGroups === "teams" ? (
                              <td>{item.points}</td>
                            ) : null}
                            <td>{item.rating}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )}
            {props.gender.split("/")[1] === "icc-rankings-women" ? null : (
              <div className={styles.more}>
                <h5
                  className={styles.show_more}
                  onClick={handleOnClickShowMore}
                >
                  {limit === "10" ? (
                    <div>
                      Show More
                      <AiFillCaretDown
                        style={{ fontSize: "25px", verticalAlign: "bottom" }}
                      />
                    </div>
                  ) : (
                    <div>
                      Show Less
                      <AiFillCaretUp
                        style={{ fontSize: "25px", verticalAlign: "bottom" }}
                      />
                    </div>
                  )}
                </h5>
              </div>
            )}
          </div>
          {/* col 2 */}
          {/* <div className="child-details col-md-5 col-xs-12  mt-5 ad-block">
            <h3>AD</h3>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Ranks;
