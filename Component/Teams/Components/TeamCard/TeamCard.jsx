import React, { useState } from "react";
import styles from "./TeamCard.module.scss";
import Medal from "../../../../public/Images/Medal.png";
import { useEffect } from "react";
import Link from "next/link";
// import { TeamListAPI } from "../../../../Constants/Api/Api";
import slugify from "react-slugify";
import dataList from "../../../../Common/data.json";
import { useRouter } from "next/router";
import Image from "next/image";
const TeamCard = () => {
  const [teamList, setTeamList] = useState([]);
  const router = useRouter();
  const pathname = router.asPath;
  // const navigate = useNavigate();

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
  // const Navigation = useCallback(
  //   (value1, value2) => {
  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (pathname === "/teams/men/") {
      // TeamListAPI("Men")
      //   .then((res) => {
      //     setTeamList(res.data.data.rows);
      //   })
      //   .catch((e) => {
      //     // Navigation(e.code, e.message);
      //   });

      setTeamList(dataList.data.teams);
    }
    if (pathname === "/teams/women/") {
      // TeamListAPI("Women")
      //   .then((res) => {
      //     setTeamList(res.data.data.rows);
      //   })
      //   .catch((e) => {
      //     // Navigation(e.code, e.message);
      //   });
      setTeamList(dataList.data.Women);
    }
  }, [pathname]);



  return (
    <>
      {teamList.length === 0 ? null : (
        <div className={`"row" ${styles.main_div} "pb-5"`}>
          {teamList.map((item, index) => {
            return (
              <div className="col-md-3 col-sm-6" key={index}>
                <Link
                  className={styles.link_color}
                  href={`/teams/${
                    pathname.split("/")[2] === "men" ? "men" : "women"
                  }/${item.tid}/${slugify(item.title)}-cricket-team/`}
                >
                  <div
                    className={`${styles.content} ${styles.box_1}`}
                    style={{ backgroundImage: colorsArray[randomNumber()] }}
                  >
                    <div className={styles.img1}>
                      <Image
                        src={item.logo_url}
                        alt="cardimg"
                        className={styles.card_img}
                        width={10}
                        height={10}
                      />
                    </div>
                    <div className={styles.main_box}>
                      <div className={styles.card_heading}>{item.title}</div>
                      <div className={styles.sub_heading}>CRICKET TEAM</div>
                      {item.world_cup_odi === null ||
                      item.world_cup_odi === "" ? null : (
                        <div className={styles.first_block}>
                          <Image
                            src={Medal}
                            alt="medalimg"
                            className={styles.medal}
                            width={10}
                            height={10}
                          />
                          <p className={styles.card_num}>
                            ODI:-{item.world_cup_odi}
                          </p>
                        </div>
                      )}
                      {item.world_cup_20i === null ||
                      item.world_cup_20i === "" ? null : (
                        <div className={styles.first_block}>
                          <Image
                            src={Medal}
                            alt="medalimg"
                            className={styles.medal}
                            width={10}
                            height={10}
                          />
                          <p className={styles.card_num}>
                            T20:-{item.world_cup_20i}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default TeamCard;
