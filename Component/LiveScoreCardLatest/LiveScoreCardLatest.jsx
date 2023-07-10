import React, { memo } from "react";
import styles from "./LiveScoreCardLatest.module.scss";
import logo from "../../public/Images/no-flag.png";
import fantasy from "../../public/Images/fantasy.png";
import bat from "../../public/Images/bat.png";
import ticket from "../../public/Images/ticket.png";
import news from "../../public/Images/news.png";
import { Card } from "react-bootstrap";
import slugify from "react-slugify";
import Link from "next/link";
import Image from "next/image";

const LiveScoreCardLatest = (props) => {
 
  return (
    <div className={styles.LiveScoreCardLatest}>
      <Link
        href={`/cricket-live-score/live-matches/${props.data.match_id}/${
          props.data.latest_inning_number
        }/${slugify(props.data.short_title)}-${slugify(
          props.data.subtitle
        )}-${slugify(props.data.competition.title)}/`}
        className={styles.link}
      >
        <Card style={{}} className={styles.LiveLatestCard}>
          <Card.Body>
            <div className={styles.cardinner}>
              <div className={styles.livelatest_header}>
                <div className={styles.liveStatus}>
                  <div className={styles.liveBlog_liveAni}>
                    <div className={styles.liveblog_liveAnimation}>LIVE</div>
                    <div id="div2"></div>
                  </div>
                </div>
                <div className={styles.liveCardLatest_title}>
                  <h4>
                    {" "}
                    {props.data.competition.title === "" ||
                    props.data.competition.title === null ||
                    props.data.competition.title === undefined
                      ? "Match"
                      : props.data.competition.title}
                    ,&nbsp;
                    {props.data.venue.name},&nbsp;{props.data.subtitle}
                  </h4>
                </div>
              </div>
              <div className={styles.livelatest_middle}>
                <div className={styles.teamA}>
                  <div
                    className={
                      props.match === "upcoming"
                        ? styles.team_name_Upcoming
                        : styles.team_name
                    }
                  >
                    <h5>{props.data.teama.short_name}</h5>
                  </div>
                  <div className={styles.score}>
                    {props.match === "upcoming" ? null : props.data.teama
                        .scores_full === "" ? (
                      <h5>
                        (0.0&nbsp;ov ) &nbsp;
                        <span>0/0</span>
                      </h5>
                    ) : (
                      <h5>
                        ({props.data.teama.overs}&nbsp;ov ) &nbsp;
                        <span>{props.data.teama.scores}</span>
                      </h5>
                    )}
                  </div>
                </div>
                <div className={styles.teamB}>
                  <div
                    className={
                      props.match === "upcoming"
                        ? styles.team_name_Upcoming
                        : styles.team_name
                    }
                  >
                    <h5>{props.data.teamb.short_name}</h5>
                  </div>
                  <div className={styles.score}>
                    {props.match === "upcoming" ? null : props.data.teamb
                        .scores_full === "" ? (
                      <h5>
                        (0.0&nbsp;ov ) &nbsp;
                        <span>0/0</span>
                      </h5>
                    ) : (
                      <h5>
                        ({props.data.teamb.overs}&nbsp;ov ) &nbsp;
                        <span>{props.data.teamb.scores}</span>
                      </h5>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.livelatest_middle2}>
                {props.match === "live" ? (
                  <h6>
                    {/* {props.data.toss.text === undefined
                      ? "--"
                      : props.data.toss.text} */}
                      {props.data.status_note===undefined?"--":props.data.status_note}
                  </h6>
                ) : props.match === "completed" ? (
                  <h6>
                    {props.data.status_note === undefined
                      ? "--"
                      : props.data.status_note}
                  </h6>
                ) : (
                  <h6>
                    {props.data.venue.name === undefined
                      ? "--"
                      : props.data.venue.name}
                  </h6>
                )}
              </div>
              <hr />
              <div className={styles.livelatest_footer}>
                <div className={styles.livelatest_footer_col1}>
                  {/* <h6>
                    &nbsp;
                    </h6>
                  <h6>fantasy team</h6> */}
                  <Image src={fantasy} height={20}  width={1} alt="images"/>
                  <span>fantasy team</span>
                </div>
                <div className={styles.livelatest_footer_col1}>
                  {/* <h6>
                    <Image src={bat} height={20}  width={1} alt="images"/>
                    &nbsp;
                  </h6>
                  <h6>Place a bet</h6> */}
                   <Image src={bat} height={20}  width={1} alt="images"/>
                  <span>Place a bet</span>
                </div>
                <div className={styles.livelatest_footer_col1}>
                  {/* <h6>
                    <Image src={ticket} height={20}  width={1} alt="images"/>
                    &nbsp;
                  </h6>
                  <h6>Buy Ticket</h6> */}
                   <Image src={ticket} height={20}  width={1} alt="images"/>
                  <span>Buy Ticket</span>
                </div>
                <div className={styles.livelatest_footer_col1}>
                  {/* <h6>
                    <Image src={news} height="12px" />
                    &nbsp;
                  </h6>
                  <h6>News</h6> */}
                   <Image src={news} height={20}  width={1} alt="images"/>
                  <span>News</span>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default memo(LiveScoreCardLatest);
