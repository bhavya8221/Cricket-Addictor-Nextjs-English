import React, { useEffect, useState } from "react";
import styles from "./IPLPlayerCards.module.scss";
import icon from "../../../../../../../../../../public/Images/no-player.png";

import { teamWiseMatchSquadsAPI } from "../../../../../../../../../../Constants/Api/Api";
import HOST from "../../../../../../../../../../Constants/host";
import slugify from "react-slugify";
import { useRouter } from "next/router";
import Link from "next/link";
const IPLPlayerCards = () => {
  const router = useRouter();
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

  return (
    <>
      <div className={styles.IPL_Squad}>
        <div className="container-display">
          <div
            className={`row row-cols-1 row-cols-md-3 g-3 ${styles.player_Card_container}`}
          >
            {teamSquad.map((item, index) => {
              return (
                <div
                  className={`col col-sm-12 ${styles.playerCard_col}`}
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
                      <img
                        src={
                          item.profile_pic_ipl === null
                            ? icon
                            : HOST + item.profile_pic_ipl
                        }
                        alt="player Images"
                      />
                    </div>

                    <h5
                      className={`${styles.card_title} ${
                        styles.player_Card_title
                      }`}
                    >
                      {item.title}
                    </h5>
                  </div>
                  <div
                    className={`styles.card-footer ${
                      styles.player_Card_footer
                    }
                  `}
                  >
                    <Link
                      href={`/players/${item.nationality}/${item.pid}/${slugify(
                        item.title
                      )}/`}
                      className={`card-footer ${styles.card_fotter}`}
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

export default IPLPlayerCards;
