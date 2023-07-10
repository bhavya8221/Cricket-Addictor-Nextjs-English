import React, { useState, useEffect } from "react";
import styles from "./IPLTeams.module.scss";
import Medal from "../../../../../../public/Images/Medal.png";

import slugify from "react-slugify";
import { useRouter } from "next/router";
import { iPLMatchTeamApi } from "../../../../../../Constants/Api/Api";
import Link from "next/link";

const IPLTeams = () => {
  const router = useRouter();
  const { cid, season } = router.query;
  // const { pathname } = useLocation();
  const [activeGroupsType, setActiveGroupsType] = useState("men");
  const [iplTeam, setIplTeam] = useState();


  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    iPLMatchTeamApi(cid)
      .then((res) => {
        setIplTeam(res.data.data.rows);
      })
      .catch((e) => {
       
      });
  }, [cid]);


  const colorsArray = [
    "linear-gradient(#E2FC8E, #688800)",
    "linear-gradient(#FFA58B, #C02A00)",
    "linear-gradient(#cc0260, #730136)",
    "linear-gradient(#93FA02, #345900)",
    "linear-gradient(#c7ba02, #504A00)",
    "linear-gradient(#e9a6f5, #590069)",
    "linear-gradient(#b2ede7, #05a393)",
    "linear-gradient(#f09ea4, #e00917)",
    "linear-gradient(#8F9BEB, #0E008F)",
    "linear-gradient(#db7e04, #5D3500)",
  ];

  function randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  function handleOnClickMEN() {
    setActiveGroupsType("men");
  }
  function handleOnClickWOMEN() {
    setActiveGroupsType("women");
  }


  return (
    <>
      <div className={styles.Rtype_group}>
        <div className={styles.Rplayer_gender}>
          <h5
            className={styles.Rmen}
            style={{
              backgroundColor: activeGroupsType === "men" ? null : "unset",
              color: activeGroupsType === "men" ? null : "white",
            }}
            onClick={handleOnClickMEN}
          >
            MEN
          </h5>
          <h5
            className={styles.Rwomen}
            style={{
              backgroundColor: activeGroupsType === "women" ? null : "unset",
              color: activeGroupsType === "women" ? null : "white",
            }}
            onClick={handleOnClickWOMEN}
          >
            WOMEN
          </h5>
        </div>
      </div>
      <div className={`row ${styles.ipl_main_div} pb-5`}>
        {activeGroupsType === "women" ? (
          <div style={{ textAlign: "center", margin: "40px" }}>
            <h4>
              <b>IPL DATA OF WOMEN NOT AVAILABLE</b>
            </h4>
          </div>
        ) : iplTeam !== undefined ? (
          iplTeam.map((item, index) => {
            return (
              <div
                className={`col-md-3 col-sm-6 ${styles.center_box}`}
                key={index}
              >
                <Link
                  className={styles.link_color}
                  href={`/ipl/${season}/${cid}/teams/${activeGroupsType}/${
                    item.tid
                  }/${slugify(item.title)}/`}
                  // onClick={`/ipl/${season}/${cid}/teams/${activeGroupsType}/${
                  //   item.tid
                  // }/${slugify(item.title)}`}
                >
                  <div
                    className={`${styles.content} ${styles.box_1}`}
                    style={{ backgroundImage: colorsArray[randomNumber()] }}
                  >
                    <div className={styles.img1}>
                      <img
                        src={item.logo_url}
                        alt="cardimg"
                        className={styles.card_img}
                      />
                    </div>
                    <div className={styles.main_box}>
                      <div className={styles.card_heading}>{item.title}</div>
                      {item["teamdata.world_cup_odi"] === null ||
                      item["teamdata.world_cup_odi"] === "" ? null : (
                        <div className={styles.first_block}>
                          <img
                            src={Medal}
                            alt="medalimg"
                            className={styles.medal}
                          />

                          <p className={styles.card_num}>
                            {item["teamdata.world_cup_odi"]}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : null}
      </div>
    </>
  );
};
export default IPLTeams;
