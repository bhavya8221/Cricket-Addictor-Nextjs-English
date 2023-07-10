import styles from "./SeriesResultCard.module.scss";
import React from "react";
import winner from "../../public/Images/first.png";
import icon1 from "../../public/Images/no-player.png";
import { useState } from "react";
import { useCallback } from "react";
import { competitionStatsAPI } from "../../Constants/Api/Api";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Table } from "@nextui-org/react";
import Image from "next/image";

const SeriesResultCard = (props) => {
  const [competitionStat, setCompetitionStat] = useState([]);
  const router = useRouter();
  const { cid, title, status } = router.query;
  // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  useEffect(() => {
    competitionStatsAPI(
      props.activeFormats,
      props.activeGroupTitle,
      cid,
      props.data.types_key,
      "5"
    )
      .then((res) => {
        setCompetitionStat(res.data.data.rows);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [props.activeFormats, props.activeGroupTitle, cid, props.data.types_key]);

  // const eventSchema = {
  //   "@context": "http://schema.org",
  //   "@type": "SportsEvent",
  //   name: `${props.data.teama.name} vs ${props.data.teamb.name}`,
  //   description: title,
  //   startDate: props.data.date_start,
  //   endDate: props.data.date_end,
  //   location: {
  //     "@type": "Place",
  //     name: props.data.venue.location,
  //     address: {
  //       "@type": "PostalAddress",
  //       addressLocality: props.data.venue.name,
  //       // addressRegion: "CA",
  //       // postalCode: "90301",
  //       addressCountry: props.data.venue.country,
  //     },
  //   },
  //   competitor: [
  //     {
  //       "@type": "SportsTeam",
  //       name: props.data.teama.name,
  //       image: props.data.teama.logo_url,
  //     },
  //     {
  //       "@type": "SportsTeam",
  //       name: props.data.teamb.name,
  //       image: props.data.teamb.logo_url,
  //     },
  //   ],
  // };

  return (
    <div className={styles.resultCard_section}>
      <div className={styles["Result-section pb-4"]}>
        <div className={styles.result_main_div}>
          {/* col 1 */}
          <div className={styles.result_box}>
            <h6 className={styles.result_text_size_top}>{props.data.types}</h6>
            <Table
              aria-label="Example static collection table"
              css={{
                height: "auto",
                minWidth: "100%",
              }}
              selectionMode="single"
            >
              <Table.Header>
                <Table.Column
                  className={`"white-row" ${styles.result_text_size}`}
                >
                  {" "}
                  <b>No.</b>
                </Table.Column>
                <Table.Column className={styles.result_text_left}>
                  <b>Player</b>
                </Table.Column>
                <Table.Column>
                  {" "}
                  <b>
                    {props.data.types === "Most Runs" ? (
                      <>Score</>
                    ) : props.data.types === "Highest Individual Score" ? (
                      <>Score</>
                    ) : props.data.types === "Highest Strike Rates" ? (
                      <>SR</>
                    ) : props.data.types ===
                      "Highest Strike Rates (Innings)" ? (
                      <>Score</>
                    ) : props.data.types === "Highest Average" ? (
                      <>Avg</>
                    ) : props.data.types === "Most Centuries" ? (
                      <>100s</>
                    ) : props.data.types === "Most Fifties" ? (
                      <>50s</>
                    ) : props.data.types === "Most Sixes" ? (
                      <>6s</>
                    ) : props.data.types === "Most Sixes (Innings)" ? (
                      <>Score</>
                    ) : props.data.types === "Most Fours" ? (
                      <>4s</>
                    ) : props.data.types === "Most Fours (Innings)" ? (
                      <>Score</>
                    ) : props.data.types === "Top Wicket Takers" ? (
                      <>wkt</>
                    ) : props.data.types === "Best Economy Rates" ? (
                      <>Eco</>
                    ) : props.data.types === "Best Strike Rates (Innings)" ? (
                      <>Score</>
                    ) : props.data.types === "Best Bowling Figures" ? (
                      <>BBI</>
                    ) : props.data.types === "Best Strike Rates" ? (
                      <>SR</>
                    ) : props.data.types === "Best Strike Rates (Innings)" ? (
                      <>Score</>
                    ) : props.data.types === "Best Averages" ? (
                      <>Avg</>
                    ) : props.data.types ===
                      "Most runs conceded in an innings" ? (
                      <>Score</>
                    ) : props.data.types === "Four Wickets" ? (
                      <>Score</>
                    ) : props.data.types === "Five Wickets" ? (
                      <>Score</>
                    ) : props.data.types === "Maidens" ? (
                      <>Score</>
                    ) : (
                      <>Score</>
                    )}
                  </b>
                </Table.Column>
              </Table.Header>
              <Table.Body>
                {competitionStat.map((item, index) => {
                  return (
                    <Table.Row
                      key={index}
                      className={`"white-row" ${styles.result_text_size}`}
                    >
                      <Table.Cell>
                        {" "}
                        {index + 1 === 1 ? (
                          <Image
                            className="icon_style"
                            alt="teams"
                            src={winner}
                            width={10}
                          />
                        ) : (
                          <>{index + 1}</>
                        )}
                      </Table.Cell>
                      <Table.Cell className={styles.result_text_Second}>
                        <div style={{ display: "flex" }}>
                          <Image
                            className={styles.icon_style}
                            alt="teams"
                            src={icon1}
                            width={10}
                          />{" "}
                          <div className={styles.player_flex}>
                            <b className={styles.player_name}>
                              {item.player.title}
                            </b>
                            <b className={styles.team_text}>
                              {item.team.title}
                            </b>
                          </div>
                        </div>{" "}
                      </Table.Cell>
                      <Table.Cell>
                        {props.data.types === "Most Runs" ? (
                          <>{item.runs}</>
                        ) : props.data.types === "Highest Individual Score" ? (
                          <>{item.highestrun}</>
                        ) : props.data.types === "Highest Strike Rates" ? (
                          <>{item.strike}</>
                        ) : props.data.types ===
                          "Highest Strike Rates (Innings)" ? (
                          <>{item.hstrike}</>
                        ) : props.data.types === "Highest Average" ? (
                          <>{item.average}</>
                        ) : props.data.types === "Most Centuries" ? (
                          <>{item.run100}</>
                        ) : props.data.types === "Most Fifties" ? (
                          <>{item.run50}</>
                        ) : props.data.types === "Most Sixes" ? (
                          <>{item.run6}</>
                        ) : props.data.types === "Most Sixes (Innings)" ? (
                          <>
                            <b>-</b>
                          </>
                        ) : props.data.types === "Most Fours" ? (
                          <>{item.run4}</>
                        ) : props.data.types === "Most Fours (Innings)" ? (
                          <>
                            <b>-</b>
                          </>
                        ) : props.data.types === "Top Wicket Takers" ? (
                          <>{item.wickets}</>
                        ) : props.data.types === "Best Economy Rates" ? (
                          <>{item.econ}</>
                        ) : props.data.types ===
                          "Best Strike Rates (Innings)" ? (
                          <>
                            <b>-</b>
                          </>
                        ) : props.data.types === "Best Bowling Figures" ? (
                          <>{item.bestinning}</>
                        ) : props.data.types === "Best Strike Rates" ? (
                          <>{item.strike}</>
                        ) : props.data.types ===
                          "Best Strike Rates (Innings)" ? (
                          <>
                            <b>-</b>
                          </>
                        ) : props.data.types === "Best Averages" ? (
                          <>{item.average}</>
                        ) : props.data.types ===
                          "Most runs conceded in an innings" ? (
                          <>-</>
                        ) : props.data.types === "Four Wickets" ? (
                          <>-</>
                        ) : props.data.types === "Five Wickets" ? (
                          <>-</>
                        ) : props.data.types === "Maidens" ? (
                          <>-</>
                        ) : (
                          <b>-</b>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
            <div
              colSpan="3"
              className="more"
              // onClick={() => {
              //   window.location.href = `/cricket-series/${status}/${cid}/${title}/stats/details`;
              // }}
            >
             <Link href={`/cricket-series/${status}/${cid}/${title}/stats/details`}>More</Link>
              
            </div>
          </div>
          {/* <div className={styles.result_box}>
            <table className="result-styled-table mx-1">
              <thead>
                <tr className={styles.result_text_size}>
                  <th colSpan="3">{props.data.types}</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`"white-row" ${styles.result_text_size}`}>
                  <td>
                    <b>No.</b>
                  </td>
                  <td className={styles.result_text_left}>
                    <b>Player</b>
                  </td>
                  <td>
                    <b>
                      {props.data.types === "Most Runs" ? (
                        <>Score</>
                      ) : props.data.types === "Highest Individual Score" ? (
                        <>Score</>
                      ) : props.data.types === "Highest Strike Rates" ? (
                        <>SR</>
                      ) : props.data.types ===
                        "Highest Strike Rates (Innings)" ? (
                        <>Score</>
                      ) : props.data.types === "Highest Average" ? (
                        <>Avg</>
                      ) : props.data.types === "Most Centuries" ? (
                        <>100s</>
                      ) : props.data.types === "Most Fifties" ? (
                        <>50s</>
                      ) : props.data.types === "Most Sixes" ? (
                        <>6s</>
                      ) : props.data.types === "Most Sixes (Innings)" ? (
                        <>Score</>
                      ) : props.data.types === "Most Fours" ? (
                        <>4s</>
                      ) : props.data.types === "Most Fours (Innings)" ? (
                        <>Score</>
                      ) : props.data.types === "Top Wicket Takers" ? (
                        <>wkt</>
                      ) : props.data.types === "Best Economy Rates" ? (
                        <>Eco</>
                      ) : props.data.types === "Best Strike Rates (Innings)" ? (
                        <>Score</>
                      ) : props.data.types === "Best Bowling Figures" ? (
                        <>BBI</>
                      ) : props.data.types === "Best Strike Rates" ? (
                        <>SR</>
                      ) : props.data.types === "Best Strike Rates (Innings)" ? (
                        <>Score</>
                      ) : props.data.types === "Best Averages" ? (
                        <>Avg</>
                      ) : props.data.types ===
                        "Most runs conceded in an innings" ? (
                        <>Score</>
                      ) : props.data.types === "Four Wickets" ? (
                        <>Score</>
                      ) : props.data.types === "Five Wickets" ? (
                        <>Score</>
                      ) : props.data.types === "Maidens" ? (
                        <>Score</>
                      ) : (
                        <>Score</>
                      )}
                    </b>
                  </td>
                </tr>
                {competitionStat.map((item, index) => {
                  return (
                    <tr className={`"white-row" ${styles.result_text_size}`} key={index}>
                      <td>
                        {index + 1 === 1 ? (
                          <img
                            className="icon_style"
                            alt="teams"
                            src={winner}
                          ></img>
                        ) : (
                          <>{index + 1}</>
                        )}
                      </td>
                      <td className={styles.result_text_left}>
                        <img className={styles.icon_style} alt="teams" src={icon1} />{" "}
                        <div className={styles.player_flex}>
                          <b className={styles.player_name}>{item.player.title}</b>
                          <b className={styles.team_text}>{item.team.title}</b>
                        </div>
                      </td>
                      <td>
                        {props.data.types === "Most Runs" ? (
                          <>{item.runs}</>
                        ) : props.data.types === "Highest Individual Score" ? (
                          <>{item.highestrun}</>
                        ) : props.data.types === "Highest Strike Rates" ? (
                          <>{item.strike}</>
                        ) : props.data.types ===
                          "Highest Strike Rates (Innings)" ? (
                          <>{item.hstrike}</>
                        ) : props.data.types === "Highest Average" ? (
                          <>{item.average}</>
                        ) : props.data.types === "Most Centuries" ? (
                          <>{item.run100}</>
                        ) : props.data.types === "Most Fifties" ? (
                          <>{item.run50}</>
                        ) : props.data.types === "Most Sixes" ? (
                          <>{item.run6}</>
                        ) : props.data.types === "Most Sixes (Innings)" ? (
                          <>
                            <b>-</b>
                          </>
                        ) : props.data.types === "Most Fours" ? (
                          <>{item.run4}</>
                        ) : props.data.types === "Most Fours (Innings)" ? (
                          <>
                            <b>-</b>
                          </>
                        ) : props.data.types === "Top Wicket Takers" ? (
                          <>{item.wickets}</>
                        ) : props.data.types === "Best Economy Rates" ? (
                          <>{item.econ}</>
                        ) : props.data.types ===
                          "Best Strike Rates (Innings)" ? (
                          <>
                            <b>-</b>
                          </>
                        ) : props.data.types === "Best Bowling Figures" ? (
                          <>{item.bestinning}</>
                        ) : props.data.types === "Best Strike Rates" ? (
                          <>{item.strike}</>
                        ) : props.data.types ===
                          "Best Strike Rates (Innings)" ? (
                          <>
                            <b>-</b>
                          </>
                        ) : props.data.types === "Best Averages" ? (
                          <>{item.average}</>
                        ) : props.data.types ===
                          "Most runs conceded in an innings" ? (
                          <>-</>
                        ) : props.data.types === "Four Wickets" ? (
                          <>-</>
                        ) : props.data.types === "Five Wickets" ? (
                          <>-</>
                        ) : props.data.types === "Maidens" ? (
                          <>-</>
                        ) : (
                          <b>-</b>
                        )}
                      </td>
                    </tr>
                  );
                })}

                <tr className={`"white-row"${styles.result_text_size}`}>
                  <td
                    colSpan="3"
                    className="more"
                    onClick={() => {
                      window.location.href = `/cricket-series/${status}/${cid}/${title}/stats/details`;
                    }}
                  >
                    More
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SeriesResultCard;
