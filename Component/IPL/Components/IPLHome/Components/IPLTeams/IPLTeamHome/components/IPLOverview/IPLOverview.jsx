import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import icon from "../../../../../../../../../public/Images/no-player.png";
import "react-multi-carousel/lib/styles.css";
import styles from "./IPLOverview.module.scss";
import NewsCard from "../../../../../../../../NewsCard/NewsCard";
import background from "../../../../../../../../../public/Images/no-banner.png";

import { useState } from "react";
import HOST from "../../../../../../../../../Constants/host";
import slugify from "react-slugify";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  newsTeamsPlayersApi,
  teamWiseMatchSquadsAPI,
} from "../../../../../../../../../Constants/Api/Api";

const IPLOverview = () => {
  const router = useRouter();
  const { cid, season, tid, gender, title } = router.query;
  // const [teamListDetail, setTeamListDetail] = useState({});
  const [newsData, setNewsData] = useState([]);
  const [teamSquad, setTeamSquad] = useState([]);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1400, min: 1024 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 1024, min: 0 },
      items: 1,
    },
  };

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
    newsTeamsPlayersApi(tid, "", "")
      .then((res) => {
        setNewsData(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [tid]);


  return (
    <>
      <div className={styles.IPL_Overview}>
        <div className={`${styles.News} row ${styles.RowGrid}`}>
          <div className={styles.space}>
            <div className={styles.type_group}>
              <div>
                <h3 className={styles.IPL__text}>latest news</h3>
              </div>
            </div>
            <div>
              <h3 className={styles.viewall}>
                <Link
                  className={styles.link_color}
                  href={`/ipl/${season}/${cid}/teams/${gender}/${tid}/${title}/news/`}
                >
                  view_all
                </Link>
              </h3>
            </div>
          </div>
          <Carousel
            className={styles.sizes}
            swipeable={true}
            draggable={true}
            responsive={responsive}
            removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            autoPlay={false}
          >
            {newsData.length === 0 ? (
              <div>
                <h4>no_news</h4>
                {/* null */}
              </div>
            ) : (
              newsData.map((item, index) => {
                return (
                  <Link
                    key={index}
                    className={styles.team_link_color}
                    href={`/cricket-news/${item.news_category}/${item.slug}/`}
                  >
                    <div className="px-2">
                      <NewsCard
                        title={item.title}
                        date={item.date}
                        source={
                          item.file_uri === "" || item.file_uri === null
                            ? `${background}/`
                            : item.file_name === "" || item.file_name === null
                            ? `${background}/`
                            : `${HOST}${item.file_uri}/${item.file_name}/`
                        }
                      />
                    </div>
                  </Link>
                );
              })
            )}
          </Carousel>
        </div>

        <div className={`${styles.Squad} row ${styles.RowGrid}`}>
          <div className={styles.space}>
            <div className={styles.type_group}>
              <div>
                <h3 className={styles.IPL__text}>squads</h3>
              </div>
            </div>
            <div>
              <h3 className={styles.viewall}>
                <Link
                  className={styles.link_color}
                  href={`/ipl/${season}/${cid}/teams/${gender}/${tid}/${title}/squad/`}
                >
                  view_all
                </Link>
              </h3>
            </div>
          </div>
          <Carousel
            className={styles.sizes}
            showDots={false}
            swipeable={true}
            draggable={true}
            responsive={responsive}
            dotListClass="custom-dot-list-style"
            autoPlay={false}
            infinite
          >
            {teamSquad.map((item, index) => {
              return (
                // <div
                //   className="child-disp mx-2 boder-box"
                //   // onClick={() => NavigationPlayer()}
                //   key={index}
                // >
                //   <div className="back-text">
                //     <b>0</b>
                //   </div>
                //   <div className=" disp-img">
                //     <img alt="th" src={icon} />
                //   </div>
                //   <div className="detials">
                //     <h4>
                //       <b>{item.title}</b>
                //     </h4>
                //     <Link className="profiles" to={`player/${item.pid}`}>
                //       View Profile
                //     </Link>
                //   </div>
                // </div>
                <div className={`col ${styles.playerCard_col}`} key={index}>
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
                          item.profile_pic_odi === null
                            ? icon
                            : HOST + item.profile_pic_odi
                        }
                        alt="player Images"
                      />
                    </div>

                    <h5 className={`card-title ${styles.player_Card_title}`}>
                      {item.title}
                    </h5>
                  </div>
                  <div className={`card-footer ${styles.player_Card_footer}`}>
                    <Link
                      href={`/players/${item.pid}/${slugify(item.title)}/`}
                      className="card-footer"
                    >
                      view_profile
                    </Link>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default IPLOverview;
