import React, { useState, useCallback, useEffect } from "react";
import styles from "./IplPointTable.module.scss";
import logo from "../../public/Images/no-flag.png";
import { competitionStandingAPI } from "../../Constants/Api/Api";
import { useRouter } from "next/router";
// import { useNavigate, useParams } from "react-router-dom";

const IplPointable = () => {
  const router = useRouter();
  const [competitionStanding, setCompetitionStanding] = useState([]);
  const [genderType, setGenderType] = useState(1);
  const { cid } = router.query;
  const genderTab = (index) => {
    setGenderType(index);
  };
  
  useEffect(() => {
    // setIsLoading(true);xs
    competitionStandingAPI(cid)
      .then((res) => {
        setCompetitionStanding(res.data.data);
      })
      .catch((e) => {
      });
  }, [cid]);


  return (
    <>
      <div className={styles.ipl_section}>
        <div className={styles.iplMain_box}>
          <div className={styles.gender_section}>
            <div
              className={
                genderType === 1 ? styles.men_section : styles.women_section
              }
              onClick={() => genderTab(1)}
            >
              MEN
            </div>
            <div
              className={
                genderType === 2 ? styles.men_section : styles.women_section
              }
              onClick={() => genderTab(2)}
            >
              WOMEN
            </div>
          </div>
          {genderType === 2 ? (
            <h4 style={{ marginTop: 20, marginLeft: 20 }}>
              No Women Points Table Data...
            </h4>
          ) : (
            <div className={styles.active_content}>
              <div className={styles.heading_section}>
                <p className={styles.font_section_team}>TEAM</p>
                <p className={styles.font_section_pld}>PLD</p>
                <p className={styles.font_section_net}>NET RR</p>
                <p className={styles.font_section_ps}>PTS</p>
              </div>
              <div className={styles.IPL_PointView}>
                {competitionStanding.length !== 0
                  ? competitionStanding
                      .sort(function (a, b) {
                        return b.points - a.points;
                      })
                      .map((item, index) => {
                        return (
                          <div className={styles.box1_section} key={index}>
                            <div className={styles.imgAndf_section}>
                              <img
                                src={
                                  item.team.logo_url === "" ||
                                  item.team.logo_url === null
                                    ? logo
                                    : item.team.logo_url
                                }
                                alt="logoimg"
                                className={styles.logoImg_section}
                              />
                              <p className={styles.font_section_team_data}>
                                {item.team.abbr}
                              </p>
                            </div>
                            <p className={styles.font_section_pld_data}>
                              {item.played}
                            </p>
                            <p className={styles.font_section_net_data}>
                              {item.netrr}
                            </p>
                            <p
                              className={`${styles.font_section_ps_data} ${styles.margin_section}`}
                            >
                              {item.points}
                            </p>
                          </div>
                        );
                      })
                  : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default IplPointable;
