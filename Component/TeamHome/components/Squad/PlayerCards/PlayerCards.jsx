import React, { useCallback, useEffect, useState } from "react";
import styles from "./PlayerCards.module.scss";
import Styles from "../Squad.module.scss"
import icon from "../../../../../public/Images/no-player.png";
import {
  TeamWiseMatchSquadsAPI,
  teamWiseMatchSquadsAPI,
} from "../../../../../Constants/Api/Api";
import HOST from "../../../../../Constants/host";
//  
import slugify from "react-slugify";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
const PlayerCards = () => {
  const router = useRouter();
  const pathname = router.asPath;
  //  
  const [teamSquad, setTeamSquad] = useState([]);
  const { tid } = router.query;

  // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    teamWiseMatchSquadsAPI(tid)
      .then((res) => {
        setTeamSquad(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      
      });
  }, [tid]);

  const [gender, setGender] = React.useState("TEST");
  function handleOnClickTEST() {
    setGender("TEST");
  }
  function handleOnClickT20() {
    setGender("T20");
  }
  function handleOnClickODI() {
    setGender("ODI");
  }


  return (
    <>
      <div className={styles.Squad}>
        <div className={styles.container_display}>
          <div className={styles.right_align}>
            <div className={styles.TeamRplayer_gender}>
              <h5
                className={styles.Rtest}
                style={{
                  backgroundColor: gender === "TEST" ? null : "unset",
                  color: gender === "TEST" ? null : "white",
                }}
                onClick={handleOnClickTEST}
              >
                TEST
              </h5>
              <h5
                className={styles.Rt20}
                style={{
                  backgroundColor: gender === "T20" ? null : "unset",
                  color: gender === "T20" ? null : "white",
                }}
                onClick={handleOnClickT20}
              >
                T20
              </h5>
              <h5
                className={styles.Rodi}
                style={{
                  backgroundColor: gender === "ODI" ? null : "unset",
                  color: gender === "ODI" ? null : "white",
                }}
                onClick={handleOnClickODI}
              >
                ODI
              </h5>
            </div>
          </div>

          <div
            className={`row row-cols-1 row-cols-md-3 g-3 ${styles.player_Card_container}`}
          >
            <Head>
              {/* <title>India National Cricket Team  Squads</title> */}
            </Head>
            {teamSquad.map((item, index) => {
              return (
                <div
                  className={`col col-sm-12 ${styles.playerCard_col} mt-3`}
                  key={index}
                >
                  <div className={`card h-90 ${styles.playerCard}`}>
                    {item.title === item.captain ? (
                      <div className={styles.playerposition}>
                        <div className={styles.captionPosition}>
                          <h6>C</h6>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.playerposition}>
                        <div className={styles.nonCaptionPosition}></div>
                      </div>
                    )}
                    <div className={styles.back_text}>
                      <b>{item.jersey === null ? 0 : item.jersey}</b>
                    </div>
                    <div className={styles.disp_img}>
                      {/* {gender==="TEST"?"hello":"hell"} */}
                      <Image
                        src={
                          gender === "TEST"
                            ? item.profile_pic_test === null
                              ? icon
                              : HOST + item.profile_pic_test
                            : item.profile_pic_odi === null
                            ? icon
                            : HOST + item.profile_pic_odi
                        }
                        alt="player Images"
                        width={100}
                        height={100}
                      />
                    </div>

                    <h5
                      className={`${styles.card_title} ${styles.player_Card_title}`}
                    >
                      {item.title}
                    </h5>
                  </div>
                  <div
                    className={`${styles.card_footer} ${styles.player_Card_footer}`}
                  >
                    <Link
                      href={`/players/${item.nationality}/${item.pid}/${slugify(
                        item.title
                      )}`}
                      className={styles.card_footer}
                    >
                      view_profile
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerCards;
